// app/api/send/route.js
import { renderToString, render } from '@react-pdf/renderer';
import MyDocument from './MyDocument';
import { Readable } from 'stream';
import { renderToHTML } from 'next/dist/server/render';

export async function GET() {
  try {
    // Render to string first
    const pdfString = await renderToHTML(`<h1>Hi</h1>`);
    
    // Convert to buffer
    const pdfBuffer = Buffer.from(pdfString);
    
    // Create response
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"'
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate PDF',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}