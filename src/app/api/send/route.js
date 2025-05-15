import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';

export async function GET() {
  try {
    // Create a new PDF document
    let doc = new PDFDocument({ margin: 50 });

    // Collect PDF data into a buffer
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    const pdfBufferPromise = new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    // Generate PDF content
    generateHeader(doc);
    generateFooter(doc);
    generateInvoiceTable(doc, {
      items: [
        {
          item: 'Item 1',
          description: 'Description of item 1',
          amount: 100,
          quantity: 2,
        },
        {
          item: 'Item 2',
          description: 'Description of item 2',
          amount: 200,
          quantity: 1,
        },
      ],
    });

    // Finalize the PDF
    doc.end();

    // Wait for the PDF buffer to be ready
    const pdfBuffer = await pdfBufferPromise;

    // Return the PDF as a binary response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
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
    .text('ACME Inc.', 50, 57, { align: 'left' })
    .font('Helvetica-Bold')
    .fillColor('#444444')
    .fontSize(20)
    .text('ACME Inc.', 110, 57)
    .fontSize(10)
    .text('123 Main Street', 200, 65, { align: 'right' })
    .text('New York, NY, 10025', 200, 80, { align: 'right' })
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