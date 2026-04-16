import { NextRequest, NextResponse } from 'next/server';
import { retrieveContext, buildPrompt, generateStructuredResponse } from '@/lib/rag';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'gemma4:e2b';

// POST /api/chat
// Body: { message: string, history?: { role: string, content: string }[] }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Retrieve relevant context from knowledge base
    const retrievalResult = retrieveContext(message);
    const { context } = retrievalResult;
    
    // Try to call Gemma 4 via Ollama
    try {
      const messages = buildPrompt(message, context, history);
      
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 512,
            top_p: 0.9,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ollama error:', response.status, errorText);
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.message?.content || data.response;

      // Generate structured response with cards
      const structured = generateStructuredResponse(message, retrievalResult);
      
      return NextResponse.json({
        response: aiResponse,
        structured,
        sources: retrievalResult.items.length,
      });
      
    } catch (ollamaError) {
      console.error('Ollama call failed:', ollamaError);
      
      // Fallback: Generate structured response without LLM
      const fallbackResponse = generateStructuredResponse(message, retrievalResult);
      
      return NextResponse.json({
        response: fallbackResponse.text,
        structured: fallbackResponse,
        cards: fallbackResponse.cards,
        fallback: true,
        sources: retrievalResult.items.length,
      });
    }
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// GET /api/chat
// Health check
export async function GET() {
  let ollamaStatus = 'unavailable';
  let modelStatus = 'not loaded';
  
  try {
    const tagsResponse = await fetch(`${OLLAMA_URL}/api/tags`, { 
      method: 'GET',
      signal: AbortSignal.timeout(3000)
    });
    if (tagsResponse.ok) {
      ollamaStatus = 'available';
      const models = await tagsResponse.json();
      const gemma = models.models?.find((m: any) => m.name.includes('gemma'));
      modelStatus = gemma ? 'loaded' : 'not found';
    }
  } catch (e) {
    ollamaStatus = 'unavailable';
  }
  
  return NextResponse.json({
    status: 'ok',
    message: 'Portfolio Chatbot API',
    ollama: ollamaStatus,
    model: MODEL_NAME,
    modelStatus,
    knowledgeItems: knowledgeBase.length,
  });
}

// Import knowledge base for GET
import { knowledgeBase } from '@/lib/knowledge';
