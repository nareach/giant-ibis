import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { emailTemplate, TemplateMail } from './template2';

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || "chentochea2002@gmail.com",
      pass: process.env.EMAIL_PASS || "gplrmjmqewdrgodu"
    },
  });

  try {
    const htmlContent = TemplateMail({
      
    });

    // Generate PDF using puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    });
    await browser.close();

    transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: email,
      subject: 'E-Ticket',
      text: message,
      html: htmlContent,
      attachments: [
        {
          filename: 'e-ticket.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Error sending email', error: error.message },
      { status: 500 }
    );
  }
}