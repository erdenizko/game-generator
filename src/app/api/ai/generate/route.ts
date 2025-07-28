import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';
import { cacheService } from '@/lib/redis';
import { z } from 'zod';

const RequestSchema = z.object({
  theme: z.string().min(3),
  assetType: z.enum(['cover', 'background', 'frame']),
});

async function getPromptFromGroq(theme: string, assetType: string) {
  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'user',
          content: `create a prompt for image generation. image should be in ${theme} and it is a ${assetType} image. when you returning your answer follow this structure! your answer. !!PROMPT!! include the prompt you prepared here !!PROMPT!!`,
        },
      ],
      temperature: 0.8,
      max_tokens: 512,
    }),
  });

  if (!groqRes.ok) {
    throw new Error('Failed to generate prompt from Groq');
  }

  const groqData = await groqRes.json();
  const content: string = groqData.choices?.[0]?.message?.content || '';
  const match = content.match(/!!PROMPT!!([\s\S]*?)!!PROMPT!!/);
  const prompt = match ? match[1].trim() : content.trim();
  return prompt;
}

async function getImageFromGemini(prompt: string): Promise<string | null> {
  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateImage?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, aspectRatio: '1:1', n: 1 }),
      });

    if (!geminiRes.ok) {
      console.error('Gemini response', await geminiRes.text());
      return null;
    }

    const geminiData = await geminiRes.json();
    // Adjust depending on actual response structure.
    const url = geminiData.data?.[0]?.url || null;
    return url;
  } catch (err) {
    console.error('Gemini error', err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 });
    }
    const token = authHeader.substring(7);
    const user = await verifyJWT(token);
    if (!user) {
      return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 });
    }

    const body = await request.json();
    const { theme, assetType } = RequestSchema.parse(body);

    // Daily usage limiting – 5 per day
    const dateKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const usageKey = `ai_usage:${user.id}:${dateKey}`;
    const currentUsage = await cacheService.incr(usageKey);
    if (currentUsage === 1) {
      // expire after 24 hours
      await cacheService.expire(usageKey, 24 * 60 * 60);
    }
    if (currentUsage > 5) {
      return NextResponse.json({ error: { message: 'Daily AI generation limit reached' } }, { status: 429 });
    }

    // Step 1: get prompt from Groq
    const prompt = await getPromptFromGroq(theme, assetType);

    // Step 2: generate image from Gemini
    let imageUrl = await getImageFromGemini(prompt);

    // Fallback placeholder if generation failed
    if (!imageUrl) {
      imageUrl = `https://placehold.co/1024x1024?text=${encodeURIComponent(theme)}`;
    }

    return NextResponse.json({ success: true, data: { imageUrl } });
  } catch (err) {
    console.error('AI generation error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: { message: 'Invalid parameters', details: err.issues } }, { status: 400 });
    }
    return NextResponse.json({ error: { message: 'Internal server error' } }, { status: 500 });
  }
}