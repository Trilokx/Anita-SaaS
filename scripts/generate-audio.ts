/**
 * generate-audio.ts
 *
 * Pre-generates WAV audio files for all presentation slides using Gemini TTS.
 * Run once: GEMINI_API_KEY=xxx npm run generate-audio
 *
 * Output: public/audio/slide-{1..11}.wav
 * Format: Mono, 16-bit PCM, 24kHz (native Gemini output) with RIFF/WAV header
 */

import { GoogleGenAI, Modality } from '@google/genai';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  console.error('Run: GEMINI_API_KEY=your_key npm run generate-audio');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SLIDES = [
  {
    id: 1,
    title: "Why Your Business Is Invisible on Google",
    content: [
      "Customers are searching but not finding you",
      "Your competitors are getting your customers",
      "Your business looks inactive or doesn't exist online"
    ]
  },
  {
    id: 2,
    title: "Invisible equals Lost Revenue Every Day",
    content: [
      "80% of customers search online before buying",
      "If you don't appear, you don't exist",
      "Slow replies mean lost customers",
      "No system means missed opportunities"
    ]
  },
  {
    id: 3,
    title: "The 3 Biggest Problems",
    content: [
      "No Google presence — no SEO or Maps visibility",
      "Weak or no social media",
      "No follow-up system — lost leads"
    ]
  },
  {
    id: 4,
    title: "Why Your Marketing Isn't Working",
    content: [
      "Posting randomly is not a strategy",
      "No website means no trust",
      "No automation means missed sales"
    ]
  },
  {
    id: 5,
    title: "We Turn Visibility Into Customers",
    content: [
      "SEO and Google optimization",
      "Social media strategy",
      "Website creation",
      "AI automation systems"
    ]
  },
  {
    id: 6,
    title: "Step 1: Get Found on Google",
    content: [
      "Google Business Profile optimization",
      "SEO — rank on search",
      "Reviews strategy"
    ]
  },
  {
    id: 7,
    title: "Step 2: Turn Visitors Into Customers",
    content: [
      "A modern website",
      "Fast and mobile-friendly",
      "Clear call-to-action"
    ]
  },
  {
    id: 8,
    title: "Step 3: Build Trust and Demand",
    content: [
      "Content strategy",
      "Consistent posting",
      "Brand positioning"
    ]
  },
  {
    id: 9,
    title: "Step 4: Never Lose a Customer Again",
    content: [
      "Instant replies 24/7",
      "Capture leads automatically",
      "Book appointments automatically"
    ]
  },
  {
    id: 10,
    title: "The Difference with Elevate",
    content: [
      "From invisible to industry leader",
      "From manual work to automated growth",
      "From lost leads to loyal customers"
    ]
  },
  {
    id: 11,
    title: "Ready to Elevate Your Business?",
    content: [
      "Book your free strategy call today",
      "Let's build your custom growth roadmap",
      "Start turning visibility into revenue"
    ]
  }
];

/**
 * Writes a WAV file from raw 16-bit PCM data at 24kHz mono.
 * Gemini TTS returns raw PCM — this adds the RIFF/WAV header so browsers can play it.
 */
function buildWavBuffer(pcmData: Buffer): Buffer {
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const headerSize = 44;

  const header = Buffer.alloc(headerSize);

  // RIFF chunk
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8, 'ascii');

  // fmt sub-chunk
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);          // Sub-chunk size
  header.writeUInt16LE(1, 20);           // Audio format: PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

async function generateAudio() {
  const outputDir = join(process.cwd(), 'public', 'audio');
  mkdirSync(outputDir, { recursive: true });

  console.log(`Generating audio for ${SLIDES.length} slides...`);
  console.log(`Output: ${outputDir}\n`);

  for (const slide of SLIDES) {
    const script = `${slide.title}. ${slide.content.join('. ')}.`;
    const outputPath = join(outputDir, `slide-${slide.id}.wav`);

    process.stdout.write(`Slide ${slide.id}: "${slide.title.slice(0, 40)}..." `);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text: `Read this in a professional, warm, and confident voice: ${script}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        console.log('⚠ No audio data returned, skipping');
        continue;
      }

      const pcmData = Buffer.from(base64Audio, 'base64');
      const wavData = buildWavBuffer(pcmData);
      writeFileSync(outputPath, wavData);

      const sizeKB = Math.round(wavData.length / 1024);
      console.log(`✓ ${sizeKB} KB`);
    } catch (error: any) {
      console.log(`✗ Error: ${error.message}`);
    }

    // Rate-limit: 500ms between requests
    if (slide.id < SLIDES.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\nDone! Add public/audio/*.wav to your git repo and deploy.');
}

generateAudio();
