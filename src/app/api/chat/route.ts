import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a random hex color
function generateRandomColor(): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#10AC84', '#EE5A24', '#0ABDE3', '#C44569', '#F8B500',
    '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to check if message is requesting background color change
function isBackgroundColorRequest(message: string): boolean {
  const colorKeywords = [
    'change the background',
    'change background color',
    'change the color',
    'background color',
    'change color',
    'new background',
    'different color',
    'random color',
    'new color'
  ];
  
  const lowerMessage = message.toLowerCase();
  return colorKeywords.some(keyword => lowerMessage.includes(keyword));
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if this is a background color change request
    if (isBackgroundColorRequest(message)) {
      const newColor = generateRandomColor();
      const response = `I changed the color to: ${newColor}`;
      
      // Return the response with the color change info
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            content: response,
            colorChange: newColor 
          })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Keep your responses concise and engaging.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      stream: true,
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Create a readable stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
