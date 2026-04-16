// RAG System for Portfolio Chatbot
// Retrieves relevant context and builds prompts for Gemma 4

import { getRelevantKnowledge, getSystemPrompt, knowledgeBase, KnowledgeItem } from './knowledge';

export interface RetrievalResult {
  items: KnowledgeItem[];
  context: string;
}

// Retrieve relevant knowledge based on query
export function retrieveContext(query: string, maxItems: number = 5): RetrievalResult {
  const relevantItems = getRelevantKnowledge(query, maxItems);
  
  const context = relevantItems.map(item => 
    `[${item.category.toUpperCase()}] ${item.title}: ${item.content}`
  ).join('\n\n');
  
  return {
    items: relevantItems,
    context,
  };
}

// Build prompt for LLM
export function buildPrompt(userMessage: string, context: string, history: any[] = []): any[] {
  const systemPrompt = getSystemPrompt();
  
  const messages: any[] = [
    {
      role: 'system',
      content: `${systemPrompt}

IMPORTANT: When responding about experience, projects, skills, or ventures, include visual card data in your response. Format the data as JSON that the frontend can render as rich cards.

Respond naturally as Dhrumil, then include a JSON block with relevant data cards.`
    },
    ...history.slice(-6).map((h: any) => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: h.content
    })),
    {
      role: 'user',
      content: `Context from my portfolio:\n${context}\n\nQuestion: ${userMessage}\n\nRespond as Dhrumil in first person. Include relevant data cards in your response as JSON.`
    }
  ];
  
  return messages;
}

// Extract JSON cards from LLM response
export function extractCardsFromResponse(response: string): any[] {
  try {
    // Try to find JSON block
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/) || 
                     response.match(/\{[\s\S]*"cards"[\s\S]*\}/) ||
                     response.match(/\{[\s\S]*"data"[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      return parsed.cards || parsed.data || [parsed];
    }
  } catch (e) {
    // No JSON found, return empty
  }
  return [];
}

// Generate structured response with cards based on query
export function generateStructuredResponse(query: string, context: RetrievalResult): any {
  const q = query.toLowerCase();
  const cards: any[] = [];
  let text = '';
  
  // Determine what type of content they're asking about
  const categories = new Set(context.items.map(i => i.category));
  
  // Build cards based on retrieved items
  for (const item of context.items) {
    if (item.category === 'experience' && (q.includes('experience') || q.includes('work') || q.includes('job'))) {
      cards.push({
        type: 'experience',
        title: item.title,
        role: item.metadata.role,
        period: item.metadata.period,
        location: item.metadata.location,
        company: item.metadata.company,
        highlights: item.metadata.highlights || []
      });
    } else if (item.category === 'projects' && (q.includes('project') || q.includes('work') || q.includes('portfolio'))) {
      cards.push({
        type: 'project',
        title: item.title,
        description: item.content,
        tags: item.metadata.tags || [],
        category: item.metadata.category
      });
    } else if (item.category === 'skills' && (q.includes('skill') || q.includes('know') || q.includes('tools'))) {
      cards.push({
        type: 'skills',
        title: item.title,
        items: item.metadata.items || []
      });
    } else if (item.category === 'ventures' && (q.includes('venture') || q.includes('business') || q.includes('company'))) {
      cards.push({
        type: 'venture',
        title: item.title,
        status: item.metadata.status,
        description: item.metadata.description,
        type2: item.metadata.type
      });
    } else if (item.category === 'education' && (q.includes('education') || q.includes('college') || q.includes('degree'))) {
      cards.push({
        type: 'education',
        institutions: item.metadata.institutions || []
      });
    } else if (item.category === 'contact' && (q.includes('contact') || q.includes('email') || q.includes('reach'))) {
      cards.push({
        type: 'contact',
        ...item.metadata
      });
    }
  }
  
  // Generate conversational text based on what they're asking
  if (categories.has('experience')) {
    text = "Here's my work experience - I've been building products since I was 19!";
  } else if (categories.has('projects')) {
    text = "Here are some of the projects I've worked on!";
  } else if (categories.has('skills')) {
    text = "These are my key skills and tools I work with!";
  } else if (categories.has('ventures')) {
    text = "I run several ventures under Golden Circle!";
  } else if (categories.has('contact')) {
    text = "Here's how you can reach me!";
  } else {
    text = context.items[0]?.content || "Hey! Ask me about my experience, projects, skills, or ventures!";
  }
  
  return {
    text,
    cards: cards.filter(c => Object.keys(c).length > 1)
  };
}
