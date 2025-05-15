import { NextResponse } from 'next/server';
import fs from 'fs';
import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const html = fs.readFileSync('template.html', 'utf8');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    // Close the browser to free up resources
    await browser.close();

    // Return the PDF buffer as a binary response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
      },
    });

  } catch (error) {
    console.error("Error generating PDF:", error);

    return NextResponse.json(
      { message: "PDF generation failed: " + error.message },
      { status: 500 }
    );
  }
}