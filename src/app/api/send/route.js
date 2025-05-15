import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isPreview = searchParams.get('preview') === 'true';
    let doc = new PDFDocument({ margin: 50 });

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    const pdfBufferPromise = new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    generateHeader(doc);
    generateFooter(doc);


    // Finalize the PDF
    doc.end();

    const pdfBuffer = await pdfBufferPromise;

    // Return the PDF as a binary response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': isPreview ? 'inline' : 'attachment; filename=invoice.pdf',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { message: 'PDF generation failed: ' + error.message },
      { status: 500 }
    );
  }
}

function generateHeader(doc) {
  doc
    .fontSize(9)
    .text('From: Giantibis.com', 50, 57, { align: 'left' })
    .text('Subject: E-Ticket ID #API682236378bfc13.16118443', 50, 75, { align: 'left' })
    .text('Date: 9 January 2025 3:12 AM', 200, 57, { align: 'right' })
    .text('To: sunjessica05@gmail.com', 200, 75, { align: 'right' })
    .moveTo(0, 100)
    .lineTo(1000, 100, { align: 'center' })
    .stroke()
    .fontSize(20)
    .fill("#0057A8")
    .font('Helvetica-Bold')
    .text('Trip Detail', 50, 120, { align: 'left' })
    .fontSize(10)
    .fill("black")
    .font('Helvetica')
    .text('Universe Noble-37 (Mini Van 15 Seats)', 50, 150, { align: 'left' })
    .fill("red")
    .text('Seat No: 2-A,3-A', 50, 150, { align: 'right' })
    .fill("black")
    .text('Nov, 16', 50, 190, { align: 'left' })
    .text('08:45 AM', 50, 205, { align: 'left' })
    .text('Phnom Penh', 50, 220, { align: 'left' })
    .moveTo(0, 220)
    .lineTo(220, 220, { align: 'center' })
    .text('Nov, 16', 50, 190, { align: 'right' })
    .text('08:45 AM', 50, 205, { align: 'right' })
    .text('Phnom Penh', 50, 220, { align: 'right' })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Payment is due within 15 days. Thank you for your business.',
      50,
      780,
      { align: 'center', width: 500 }
    );
}

function generateInvoiceTable(doc, invoice) {
  let i,
    invoiceTableTop = 330;

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      item.amount / item.quantity,
      item.quantity,
      item.amount
    );
  }
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 150, y)
    .text(c3, 280, y, { width: 90, align: 'right' })
    .text(c4, 370, y, { width: 90, align: 'right' })
    .text(c5, 0, y, { align: 'right' });
}