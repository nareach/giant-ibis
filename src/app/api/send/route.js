import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  const invoiceHtml = `<h1>hello</h1>`;

  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--enable-gpu'],
  });
  const page = await browser.newPage();

  await page.setContent(invoiceHtml, { waitUntil: 'load' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
    },
  });
}
