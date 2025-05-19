import { NextResponse } from 'next/server';
import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import path from 'path';
import fs from 'fs/promises';
import { bufferImageLogo } from '@/constant/buffer-img-logo';
import { googleMapIconBase64 } from '@/constant/facibilities/google-map';

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

    let finalY = await generateHeader(doc);
    if (finalY > 790) {
      doc.addPage();
      finalY = 50; // Reset Y position for new page
    }

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

async function generateHeader(doc) {
  // Initialize dynamic Y position
  let y = 50; // Start from top margin

  const pageWidth = 595.28;
  const lineLength = 250;
  const startX = (pageWidth - lineLength) / 2;

  // [START] HEADER
  doc.fontSize(9)
    .text('From: Giantibis.com', 50, y, { align: 'left' })
    .text('Date: 9 January 2025 3:12 AM', 200, y, { align: 'right' });
  y += 25;

  doc.text('Subject: E-Ticket ID #API682236378bfc13.16118443', 50, y, { align: 'left' })
    .text('To: sunjessica05@gmail.com', 200, y, { align: 'right' });
  y += 25;

  // Horizontal line
  doc.strokeColor('#A6A6A6')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(555, y)
    .stroke();
  y += 10;

  // Logo and ticket info
  doc.image(bufferImageLogo, 50, y, { width: 180 })
    .fill("#0057A8")
    .font('poppins-bold')
    .fontSize(10)
    .text('Your E-Ticket', 50, y + 15, { align: 'right' })
    .text('ID ##API682236378bfc13.16118443', 50, y + 35, { align: 'right' });
  y += 70;

  // Horizontal line
  doc.moveTo(50, y)
    .lineTo(555, y)
    .stroke();
  y += 20;

  // Departure Trip Detail
  doc.fontSize(18)
    .fill("#0057A8")
    .font('poppins-bold')
    .text('Departure Trip Detail', 50, y, { align: 'left' });
  y += 30;

  let seatText = 'Seat No: 2-A,3-A';
  let rightMargin = 50;
  let textWidth = 250;

  doc.fontSize(11)
    .fill("black")
    .font('poppins-bold')
    .text('Universe Noble-37 (Mini Van 15 Seats)', 50, y, { align: 'left' })
    .fill("red")
    .text(seatText, pageWidth - rightMargin - textWidth, y, {
      width: textWidth,
      align: 'right'
    }).fontSize(10);

  y = y + 20;
  // add facibility here 

  await addFacibilities(doc, y, {
    airConditioning: true,
    wifi: true,
    snack: true,
    waterBottle: true,
    wetTowel: true,
    powerOutlet: true,
    gps: true,
    legRoom: true,
    seatBelt: true,
    toilet: true,
    tv: true,
    usbCharger: true,
    sleepingBed: true
  })


  let textHeight = doc.heightOfString(seatText, { width: textWidth });
  y += textHeight + 40;
  // Trip information
  doc.font('poppins-regular')
    .fill("black")
    .text('Nov, 16', 50, y, { align: 'left' })
    .text('5 House', 50, y + 10, { align: 'center' })
    .text('Nov, 16', 50, y, { align: 'right' });
  y += 15;

  doc.font('poppins-regular')
    .text('08:45 AM', 50, y, { align: 'left' })
    .text('5 KM', 50, y + 10, { align: 'center' })
    .text('08:45 AM', 50, y, { align: 'right' });

  let yLineCenter = y;
  y += 15;

  doc.font('poppins-regular')
    .text('Phnom Penh', 50, y, { align: 'left' })
    .text('Phnom Penh', 50, y, { align: 'right' });

  doc.font('poppins-bold')
    .fill("#0057A8")
    .text('Get Direction', 50, y + 15, {
      align: 'left',
      link: "https://www.youtube.com/watch?v=fZ0reQOkHO4&list=RDfZ0reQOkHO4&start_radio=1",
      continued: true,
      underline: true
    })
    .text("", 0, 0, {
      align: 'left',
      link: null,
      continued: null,
      underline: null
    }).image(googleMapIconBase64, 120, y + 17, { width: 6 });

    doc.font('poppins-regular').fill("black").text("Pick Up At: Preah Monivong Boulevard (93)", 50, y + 32, {
      align: 'left',
    })


  y += 55;


  let pageWidth2 = 595.28;
  let lineLength2 = 250;
  let startX2 = (pageWidth2 - lineLength2) / 2;
  let yPosition = yLineCenter + 10;

  let centerX = startX + lineLength;
  let centerY = yPosition;
  let radius = 2;

  doc.fill('red').moveTo(startX2, yPosition)
    .lineTo(startX + lineLength, yPosition)
    .stroke()
    .lineWidth(4)
    .lineCap('round')
    .circle(centerX, centerY, radius)
    .stroke()
    .lineWidth(4)
    .lineCap('round')
    .circle(startX, centerY, radius)
    .stroke()


  doc
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(555, y)
    .stroke();
  y += 20;


  // Return Trip Detail
  doc.fontSize(18)
    .fill("#0057A8")
    .font('poppins-bold')
    .text('Return Trip Detail', 50, y, { align: 'left' });
  y += 30;

  seatText = 'Seat No: 2-A,3-A';
  rightMargin = 50;
  textWidth = 250;

  doc.fontSize(11)
    .fill("black")
    .font('poppins-bold')
    .text('Universe Noble-37 (Mini Van 15 Seats)', 50, y, { align: 'left' })
    .fill("red")
    .text(seatText, pageWidth - rightMargin - textWidth, y, {
      width: textWidth,
      align: 'right'
    }).fontSize(10);

  textHeight = doc.heightOfString(seatText, { width: textWidth });
  y += textHeight + 40;
  // Trip information
  doc.font('poppins-regular')
    .fill("black")
    .text('Nov, 16', 50, y, { align: 'left' })
    .text('5 House', 50, y + 10, { align: 'center' })
    .text('Nov, 16', 50, y, { align: 'right' });
  y += 15;

  doc.font('poppins-regular')
    .text('08:45 AM', 50, y, { align: 'left' })
    .text('5 KM', 50, y + 10, { align: 'center' })
    .text('08:45 AM', 50, y, { align: 'right' });
  yLineCenter = y;
  y += 15;

  doc.font('poppins-regular')
    .text('Phnom Penh', 50, y, { align: 'left' })
    .text('Phnom Penh', 50, y, { align: 'right' });
  y += 30;


  pageWidth2 = 595.28;
  lineLength2 = 250;
  startX2 = (pageWidth2 - lineLength2) / 2;
  yPosition = yLineCenter + 10;

  centerX = startX + lineLength;
  centerY = yPosition;
  radius = 2;

  doc.fill('red').moveTo(startX2, yPosition)
    .lineTo(startX + lineLength, yPosition)
    .stroke()
    .lineWidth(4)
    .lineCap('round')
    .circle(centerX, centerY, radius)
    .stroke()
    .lineWidth(4)
    .lineCap('round')
    .circle(startX, centerY, radius)
    .stroke()


  doc
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(555, y)
    .stroke();
  y += 20;

  // [END] Return Trip Detail

  // Passenger Details
  doc.fontSize(18)
    .fill("#0057A8")
    .font('poppins-bold')
    .text('Passenger Details', 50, y, { align: 'left' });
  y += 40;



  // Dynamic table implementation
  const passengers = [
    { name: 'Jessica Sun', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'John Smith', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'Jessica Sun', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'John Smith', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'Jessica Sun', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'John Smith', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'Jessica Sun', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'John Smith', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
    { name: 'Jessica Sun', email: 'chentochea@gmail.com', phone: '+855 92 655 182' },
  ];

  // Table headers
  doc.font('poppins-bold')
    .fontSize(10)
    .text('Name', 50, y)
    .text('Phone', 200, y)
    .text('Email', 350, y);
  y += 20;

  // Table rows
  passengers.forEach(passenger => {
    doc.font('poppins-regular')
      .fontSize(9)
      .fill("black")
      .text(passenger.name, 50, y)
      .text(passenger.phone, 200, y)
      .text(passenger.email, 350, y)
      .moveTo(50, y + 15)
      .lineTo(550, y + 15)
      .strokeColor('#E0E0E0')
      .lineWidth(0.5)
      .stroke();

    y += 30;
    if (y > 740) {
      doc.addPage();
      y = 50;
    }
  });

  if (y > 740) {
    doc.addPage();
    y = 50;
  }

  doc.font('poppins-bold')
    .fontSize(18)
    .fill("#0057A8")
    .text('Payment Detail', 50, y, { align: 'left' })
    .font('poppins-regular')
    .fontSize(10)
    .fill("black")
    .font('poppins-bold')
    .text('Total Ticket Departure:', 50, y + 30, { align: 'left' })
    .text('Amount Departure:', 50, y + 50, { align: 'left' })
    .text('Total:', 50, y + 80, { align: 'left' })
    .font('poppins-regular')
    .text('120', 270, y + 30,) // departure 
    .text('130$', 270, y + 50,) // price departure
    .text('1100$', 270, y + 80) // price return
    .strokeColor("black")
    .lineWidth(1)
    .moveTo(50, y + 70)
    .lineTo(300, y + 70)
    .stroke();

  y += 120;

  if (y > 740) {
    doc.addPage();
    y = 50;
  }

  generateFooter(doc, y);

  return y;
}

async function addFacibilities(doc, y, facilities) {

  const FACILITY_ICONS = {
    airConditioning: 'aircon.png',
    wifi: 'Wifi.png',
    snack: 'snack-icon.png',
    waterBottle: 'water-bottle-icon.png',
    wetTowel: 'wet-tower.png',
    powerOutlet: 'power-outlet-icon.png',
    gps: 'gps.png',
    legRoom: 'legroom.png',
    seatBelt: 'seat-belt.png',
    toilet: 'toilet.png',
    tv: 'tv.png',
    usbCharger: 'usb-charger-icon.png',
    sleepingBed: 'sleeping-bed-icon-orange.png'
  };

  const icons = {};
  let x = 50;

  for (const [facility, isAvailable] of Object.entries(facilities)) {
    if (!isAvailable) continue;

    const iconFilename = FACILITY_ICONS[facility];
    if (!iconFilename) continue;
    try {
      const iconPath = path.join(process.cwd(), 'public/assets/icons/');
      const fullPath = path.join(iconPath, iconFilename);

      const imageBuffer = await fs.readFile(fullPath);
      const extension = path.extname(iconFilename).slice(1);
      const base64 = imageBuffer.toString('base64');


      const icon = `data:image/${extension};base64,${base64}`
      doc.image(icon, x, y + 10, { width: 17 })
      x = x + 22;
    } catch (error) {
      console.error(`Error loading icon for ${facility}:`, error);
      icons[facility] = {
        available: true,
        icon: null // or a default icon
      };
    }
  }

  return icons;

}

function generateFooter(doc, startFrom = 650) {

  startFrom += 20;
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

  let y = startFrom + 80;
  const options = { width: 500, continued: false };
  const pageHeight = doc.page.height - 50; // Leave 100px margin at bottom

  items.forEach(item => {
    // Check if we ne5d a new page before adding content
    const itemHeight = doc.heightOfString(item, options) + 5;

    if (y + itemHeight > pageHeight) {
      doc.addPage();
      y = 50;
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



export async function getBase64Image(relativePath) {
  // Construct absolute path
  const publicDir = path.join(process.cwd(), 'public/assets/icons/');
  const imagePath = path.join(publicDir, relativePath);

  try {
    // Read image file
    const imageBuffer = await fs.readFile(imagePath);

    // Get file extension for MIME type
    const extension = path.extname(relativePath).slice(1);
    const mimeType = `image/${extension}`;

    // Convert to base64
    const base64 = imageBuffer.toString('base64');
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
}

