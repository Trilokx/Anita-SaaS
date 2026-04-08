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

    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: "You are Elevate AI, a helpful assistant for Elevate, a digital growth agency for SMEs. You help answer questions about web design, SEO, social media, and AI chatbots. Be concise, professional, and friendly. Encourage users to book a free consultation or contact via WhatsApp."
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}
