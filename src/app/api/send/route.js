import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { htmlToPdf } from './htmlToPdf';
import { pdf } from "html-pdf"
import pdfkit  from 'pdfkit';

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

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      header: {
        height: '20mm',
      },
      footer: {
        height: '20mm',
        contents: {
          default: 'This is the footer text.',
        },
      },
    };



    pdf.create(htmlToPdf, options)
      .then((res) => {
        console.log('PDF created:', res);
      })
      .catch((error) => {
        console.error('Error creating PDF:', error);
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