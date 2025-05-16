import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import path from 'path';
import fs from 'fs/promises';
import { bufferImageLogo } from '@/constant/buffer-img-logo';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isPreview = searchParams.get('preview') === 'true';

    let doc = new PDFDocument({ margin: 50, size: 'A4' });
    const fontsPath = path.join(process.cwd(), 'public', 'fonts');
    const poppinRegular = await fs.readFile(fontsPath + '/Poppins-Regular.ttf');
    const poppinBold = await fs.readFile(fontsPath + '/Poppins-Bold.ttf');
    doc.registerFont('poppins-regular', poppinRegular);
    doc.registerFont('poppins-bold', poppinBold);

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    const pdfBufferPromise = new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });

    generateHeader(doc);
    generateFooter(doc, 650);

    doc.end();

    const pdfBuffer = await pdfBufferPromise;

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

  const pageWidth = 595.28;
  const lineLength = 250;
  const startX = (pageWidth - lineLength) / 2;
  const yPosition = 308;

  doc
    .fontSize(9)
    // [START] HEADER
    .text('From: Giantibis.com', 50, 57, { align: 'left' })
    .text('Subject: E-Ticket ID #API682236378bfc13.16118443', 50, 75, { align: 'left' })
    .text('Date: 9 January 2025 3:12 AM', 200, 57, { align: 'right' })
    .text('To: sunjessica05@gmail.com', 200, 75, { align: 'right' })
    // [END] HEADER
    .strokeColor('#A6A6A6')
    .lineWidth(1)
    .moveTo(50, 100)
    .lineTo(555, 100)
    .stroke()
    .image(bufferImageLogo, 50, 120, { width: 180 }).fontSize(20)
    .fill("#0057A8")
    .font('poppins-bold')
    .fontSize(10)
    .text('Your E-Ticket', 50, 135, { align: 'right' })
    .text('ID ##API682236378bfc13.16118443', 50, 155, { align: 'right' })
    .lineWidth(1)
    .moveTo(50, 200)
    .lineTo(555, 200)
    .stroke()
    // [START] Departure Trip Detail
    .fontSize(18)
    .fill("#0057A8")
    .font('poppins-bold')
    .text('Departure Trip Detail', 50, 220, { align: 'left' })
    .fontSize(10)
    .fill("black")
    .font('poppins-bold')
    .text('Universe Noble-37 (Mini Van 15 Seats)', 50, 250, { align: 'left' })
    .fill("red")
    .text('Seat No: 2-A,3-A,2-A,3-A,2-A,3-A,2-A,3-A2-A,3-A', 50, 250, { align: 'right' })
    .fill("black")
    .font('poppins-regular')
    .text('Nov, 16', 50, 290, { align: 'left' })
    .font('poppins-bold')
    .text('08:45 AM', 50, 305, { align: 'left' })
    .font('poppins-regular')
    .text('Phnom Penh', 50, 320, { align: 'left' })
    .text('5 House', 50, 290, { align: 'center' })
    .text('5 KM', 50, 312, { align: 'center' })
    .moveTo(startX, yPosition)
    .lineTo(startX + lineLength, yPosition)
    .stroke()
    .text('Nov, 16', 50, 290, { align: 'right' })
    .font('poppins-bold')
    .text('08:45 AM', 50, 305, { align: 'right' })
    .font('poppins-regular')
    .text('Phnom Penh', 50, 320, { align: 'right' })
    .lineWidth(1)
    .moveTo(50, 350)
    .lineTo(555, 350)
    .stroke()
    // payment detail
    .fontSize(18)
    .fill("#0057A8")
    .font('poppins-bold')
    .text('Passenger Details', 50, 365, { align: 'left' })
    .font('poppins-regular')
    .fontSize(10)
    .fill("black")
    .font('poppins-bold')
    .text('Name:', 50, 400, { align: 'left' })
    .text('Phone:', 50, 420, { align: 'left' })
    .text('Email:', 50, 440, { align: 'left' })
    .text('Pick Up:', 50, 460, { align: 'left' })
    .font('poppins-regular')
    .text('Sun Jessica', 150, 400,)
    .text('+855 96 999 3333', 150, 420,)
    .text('cheachento007@gmail.com', 150, 440,)
    .text('Kompong Cham', 150, 460,)
    .fontSize(18)
    .fill("black")
    .fill("#0057A8")
    .font('poppins-bold')
    .lineWidth(1)
    .moveTo(50, 490)
    .lineTo(555, 490)
    .stroke()
    .text('Payment Detail', 50, 510, { align: 'left' })
    .font('poppins-regular')
    .fontSize(10)
    .fill("black")
    .font('poppins-bold')
    .text('Total Ticket:', 50, 550, { align: 'left' })
    .text('Amount:', 50, 565, { align: 'left' })
    .text('Amount:', 50, 595, { align: 'left' })
    .font('poppins-regular')
    .text('10', 220, 550,)
    .text('10$', 220, 565,)
    .lineWidth(1)
    .moveTo(50, 588)
    .lineTo(250, 588)
    .text('10$', 220, 595)
    .lineWidth(1)
    .moveTo(50, 630)
    .lineTo(555, 630)
    .stroke()
    .fill("black")
}

function generateFooter(doc, startFrom = 650) {

  const items = [
    "Tickets are non-refundable but exchangeable for 1 time only up to one year from the date of purchase. Note: Please inform us 24 hours before departure time via email: info@giantibis.com or Hotline: +855 96 999 3333.",
    "Online tickets may be purchased at any time before departure as long as seats are still available.",
    "Complimentary pick up may be arranged when tickets are purchased one day in advance of departure",
    "Complimentary pick up is only available for customer who stays in the listed partner hotels and guesthouses.",
    "Passengers must be ready and wait for pickup service bus at the lobby in their hotel or guesthouse 1 hour before departure time. Our pickup guys would talk to the hotel's receptionist, please always inform the receptionist when using our service.",
    "Giant Ibis Transport is not liable for no-show and/or late passengers who miss their pick up or scheduled departure.",
    "Complimentary pick up is NOT available for night bus departures.",
    "Passengers should arrive at the bus terminal 35 minutes before their scheduled departure time.",
    "Passengers must present their ticket or valid identification in order to board the bus.",
    "Parents may hold infants without purchasing an additional ticket for local routes and are charged 15$/pax for international routes. Children aged 3+ must have a ticket",
    "Giant Ibis Transport will not make any refund related to our complimentary services such as Pick up, Wi-Fi, Snack, and outlet.",
    "The duration of the trip will depend largely on road conditions at the time of your journey, Giant Ibis Transport will not responsible for any early/late arrival.",
    "Please keep in mind that our company does not accept liability for any damage to personal belongings and luggage that may occur during our services. Thank you for your understanding.",
    "tickets need not be printed, but may be presented electronically.",
    "A car seat may be provided free of charge given advanced notice of the requirement; however a ticket must be purchased for infants that will use a car seat.",
    "Each passenger is permitted 1 carry on and a maximum of 2 pieces of stored luggage not exceeding 25kg. Stored luggage exceeding 25kg may be subject to additional charges.",
    "Livestock, pet, weapons, illegal products and hazardous material are prohibited aboard the bus.",
    "Passengers may not bring strong smelling food items onto the bus (ie. durian, prohok, etc.).",
    "All passengers should mind their manners and language in the presence of fellow passengers and company staff.",
    "Smoking aboard the bus is prohibited.",
    "The passenger hereby acknowledges and agrees that personal data has been given to Giant Ibis Transport for the purposes of purchasing online tickets, providing and developing ancillary services and facilities, accounting, billing and auditing, security, administrative and legal purposes, systems testing, maintenance and development, statistical analysis, and helping us in any future dealings with you. For these purposes, by entering into purchasing online ticket with us you authorize us to retain and use your data.",
    "Note for Phnom Penh - Ho Chi Minh: Passenger should have Vietnam Visa before boarding the bus due to Vietnam Visa cannot apply at the border. In case passenger did not have Vietnam Visa on the date of traveling, they cannot claim to refund or delay travel schedule.",
  ];

  doc
    .fill("#0057A8")
    .font('poppins-bold')
    .fontSize(18)
    .stroke()
    .text('Please be Informed', 50, startFrom, { align: 'left' })
    .fill("black")
    .font('poppins-regular')
    .fontSize(10)
    .text('The following rules apply to all Giant Ibis Transport passengers and is subject to change at any time without prior notice:', 50, startFrom + 40, { align: 'left' })

  let y = startFrom + 50;
  const options = { width: 500, continued: false };
  const pageHeight = doc.page.height - 100; // Leave 100px margin at bottom

  items.forEach(item => {
    // Check if we ne5d a new page before adding content
    const itemHeight = doc.heightOfString(item, options) + 5;

    if (y + itemHeight > pageHeight) {
      doc.addPage();
      y = 70; // Reset Y position for new page
    }

    // Draw bullet point
    doc.fontSize(8)
      .text('•', 60, y + 3);

    // Draw item text
    doc.fontSize(10)
      .text(item, 75, y, options);

    // Update Y position
    y += itemHeight;
  });

}
