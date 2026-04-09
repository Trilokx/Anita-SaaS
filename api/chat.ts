import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Gemini requires conversation to start with 'user' role.
    // Filter out any leading AI/model messages (the initial greeting lives in the UI only).
    const formatted = messages
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

    // Drop leading model messages so the first entry is always 'user'
    const firstUserIdx = formatted.findIndex((m: { role: string }) => m.role === 'user');
    const contents = firstUserIdx >= 0 ? formatted.slice(firstUserIdx) : formatted;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: "You are Elevate AI, a helpful assistant for Elevate, a digital growth agency for SMEs. You help answer questions about web design, SEO, social media, and AI chatbots. Be concise, professional, and friendly. Encourage users to book a free consultation or contact via WhatsApp."
      }
    });

    const reply = response.candidates?.[0]?.content?.parts?.[0]?.text ?? response.text ?? '';
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
