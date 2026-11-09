import { NextRequest, NextResponse } from 'next/server';

function splitTextIntoChunks(text: string, maxLen = 170): string[] {
  if (text.length <= maxLen) return [text];

  // Split on Bengali dori (।), periods, question marks, commas, or spaces
  const parts = text.split(/(?<=[।.,?!;])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const part of parts) {
    if ((current + ' ' + part).trim().length <= maxLen) {
      current = (current + ' ' + part).trim();
    } else {
      if (current) chunks.push(current);
      if (part.length <= maxLen) {
        current = part;
      } else {
        // Word level split if single part is unusually long
        const words = part.split(' ');
        current = '';
        for (const w of words) {
          if ((current + ' ' + w).trim().length <= maxLen) {
            current = (current + ' ' + w).trim();
          } else {
            if (current) chunks.push(current);
            current = w;
          }
        }
      }
    }
  }

  if (current) chunks.push(current);
  return chunks.filter((c) => c.trim().length > 0);
}

export async function GET(req: NextRequest) {
  try {
    const text = req.nextUrl.searchParams.get('text');
    const lang = req.nextUrl.searchParams.get('lang') || 'bn';

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const chunks = splitTextIntoChunks(text.trim(), 170);
    const audioBuffers: Buffer[] = [];

    for (const chunk of chunks) {
      const targetLang = lang === 'en' ? 'en' : 'bn';
      const encoded = encodeURIComponent(chunk);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${targetLang}&client=tw-ob`;

      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/'
        }
      });

      if (!res.ok) {
        throw new Error(`TTS upstream error: ${res.status}`);
      }

      const arrayBuf = await res.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuf));
    }

    const mergedBuffer = Buffer.concat(audioBuffers);

    return new NextResponse(mergedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': mergedBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
      }
    });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      (error as { digest?: string }).digest === 'NEXT_PRERENDER_INTERRUPTED'
    ) {
      throw error;
    }
    console.error('Error generating TTS:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech audio' },
      { status: 500 }
    );
  }
}
