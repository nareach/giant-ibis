import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import { JSDOM } from 'jsdom';

pdfMake.vfs = vfsFonts.pdfMake.vfs;

console.log('API route /api/send loaded'); // Debug log

export async function POST(request) {
  console.log('POST /api/send called'); // Debug log
  const { name, email, message } = await request.json();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return NextResponse.json(
      { message: 'Email configuration missing' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const { window } = new JSDOM('');
    const html = `
      <div>
        <h1>Sample Document</h1>
        <p>This is a <strong>simple</strong> example with <em>formatted</em> text.</p>
      </div>
    `;

    console.log('Converting HTML to pdfMake format');
    const converted = htmlToPdfmake(html, { window });
    console.log('HTML converted successfully');
    const docDefinition = { content: converted };

    console.log('Generating PDF buffer');
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdfMake.createPdf(docDefinition).getBuffer((buffer) => {
        resolve(buffer);
      });
    });
    console.log('PDF buffer generated');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your PDF Document',
      text: message || 'Please find attached the PDF document.',
      attachments: [
        {
          filename: 'document.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    console.log('Sending email');
    await transporter.sendMail(mailOptions);
    console.log('Email sent');

    return NextResponse.json({ message: 'Email with PDF sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error processing request', error: error.message },
      { status: 500 }
    );
  }
}