import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// Notion configuration
const NOTION_API_KEY = process.env.NOTION_TOKEN;
const CONTACT_FORM_DB_ID = '345fafac-5563-81cc-bb20-f4a2c084788c';

const notion = new Client({ auth: NOTION_API_KEY });

// POST /api/contact
// Body: { name: string, email: string, phone?: string, projectType: string, message: string, source?: string }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message, source = 'Portfolio Chatbot' } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Build properties object
    const properties: any = {
      Name: {
        title: [
          {
            text: { content: name },
          },
        ],
      },
      Email: {
        email: email,
      },
      'Project Type': {
        select: {
          name: projectType || 'Other',
        },
      },
      Message: {
        rich_text: [
          {
            text: { content: message },
          },
        ],
      },
      Source: {
        select: {
          name: source,
        },
      },
      Status: {
        select: {
          name: 'New',
        },
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    };

    // Add phone if provided
    if (phone) {
      properties.Phone = {
        phone_number: phone,
      };
    }

    // Create page in Notion database
    const response = await notion.pages.create({
      parent: { database_id: CONTACT_FORM_DB_ID },
      properties,
    });

    return NextResponse.json({
      success: true,
      id: response.id,
      message: 'Form submitted successfully!',
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

// GET /api/contact
// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact form API',
  });
}