import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request) {

  const browser = await puppeteer.launch({
    headless: "new", // important for newer versions
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent( '<h1>Hello from Puppeteer</h1>');

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="output.pdf"',
    },
  });
}
