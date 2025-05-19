import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import path from 'path';
import fs from 'fs/promises';
import { bufferImageLogo } from '@/constant/buffer-img-logo';
import { wifiBase64 } from '@/constant/facibilities/wifi';
import { airConBase64 } from '@/constant/facibilities/air-con';
import { snakeIconBase64 } from '@/constant/facibilities/snack';
import { waterBottleBase64 } from '@/constant/facibilities/water-bottle';
import { wetTowerBase64 } from '@/constant/facibilities/wet-tower';
import { powerOutlet } from '@/constant/facibilities/power-outlet';
import { gpsBase64 } from '@/constant/facibilities/gps';
import { legRoomBase64 } from '@/constant/facibilities/legroom';
import { seatBeltBase64 } from '@/constant/facibilities/seat-bekt';
import { toiletIconBase64 } from '@/constant/facibilities/toilet';
import { tvBase64 } from '@/constant/facibilities/tv';
import { usbChargerBase64 } from '@/constant/facibilities/usa-charger';
import { sleepBedIconBase64 } from '@/constant/facibilities/sleep-bed-icon';
import { googleMapIconBase64 } from '@/constant/facibilities/google-map';

export async function generateInvoicePdf({
    ticketCount,
    price,
    toEmail,
    ticketId,
    busType,
    seatNo,
    originDate,
    originTime,
    originCity,
    originAddress,
    duration,
    kilometer,
    destinationDate,
    destinationTime,
    destinationCity,
    dateSend,
    pickup,
    passengers = [],
    facibilities = []
}) {

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

    generateHeader(doc, {
        ticketCount,
        price,
        toEmail,
        ticketId,
        busType,
        seatNo,
        originDate,
        originTime,
        originCity,
        originAddress,
        duration,
        kilometer,
        destinationDate,
        destinationTime,
        destinationCity,
        dateSend,
        passengers,
        facibilities,
        pickup
    });

    doc.end();
    const pdfBuffer = await pdfBufferPromise;

    return pdfBuffer;
}

function generateHeader(doc, {
    ticketCount,
    price,
    toEmail,
    ticketId,
    busType,
    seatNo,
    originDate,
    originTime,
    originCity,
    originAddress,
    duration,
    kilometer,
    destinationDate,
    destinationTime,
    destinationCity,
    dateSend,
    facibilities,
    pickup,
    passengers = []
}) {
    // Initialize dynamic Y position
    let y = 50; // Start from top margin

    const pageWidth = 595.28;
    const lineLength = 250;
    const startX = (pageWidth - lineLength) / 2;

    // [START] HEADER
    doc.fontSize(9)
        .text('From: Giantibis.com', 50, y, { align: 'left' })
        .text(`Date: ${dateSend}`, 200, y, { align: 'right' });

    y = sumY(doc, y, 25);

    doc.text(`Subject: E-Ticket ID ${ticketId}`, 50, y, { align: 'left' })
        .text(`To: ${toEmail}`, 200, y, { align: 'right' });

    y = sumY(doc, y, 25);

    // Horizontal line
    doc.strokeColor('#A6A6A6')
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(555, y)
        .stroke();

    y = sumY(doc, y, 10);

    // Logo and ticket info
    doc.image(bufferImageLogo, 50, y, { width: 180 })
        .fill("#0057A8")
        .font('poppins-bold')
        .fontSize(10)
        .text('Your E-Ticket', 50, y + 15, { align: 'right' })
        .text(`ID: ${ticketId}`, 50, y + 35, { align: 'right' });

    y = sumY(doc, y, 70);

    // Horizontal line
    doc.moveTo(50, y)
        .lineTo(555, y)
        .stroke();

    y = sumY(doc, y, 20);

    // Departure Trip Detail
    doc.fontSize(18)
        .fill("#0057A8")
        .font('poppins-bold')
        .text('Departure Trip Detail', 50, y, { align: 'left' });

    y = sumY(doc, y, 30);

    const seatText = `Seat No: ${seatNo}`;
    const rightMargin = 50;
    const textWidth = 250;

    doc.fontSize(11)
        .fill("black")
        .font('poppins-bold')
        .text(`${busType}`, 50, y, { align: 'left' })
        .fill("red")
        .text(seatText, pageWidth - rightMargin - textWidth, y, {
            width: textWidth,
            align: 'right'
        }).fontSize(10);

    const textHeight = doc.heightOfString(seatText, { width: textWidth });
    y = sumY(doc, y, textHeight + 10);

    doc.fontSize(11).text(`$ ${price}`, 50, y, { align: 'right' }).fontSize(10)
    addFacibilities(doc, y, facibilities)

    y = sumY(doc, y, 60);


    // Trip information
    doc.font('poppins-regular')
        .fill("black")
        .text(`${originDate}`, 50, y, { align: 'left' })
        .text(`${duration}`, 50, y + 10, { align: 'center' })
        .text(`${destinationDate}`, 50, y, { align: 'right' });

    y = sumY(doc, y, 15);

    doc.font('poppins-regular')
        .text(`${originTime}`, 50, y, { align: 'left' })
        .text(`${kilometer} KM`, 50, y + 10, { align: 'center' })
        .text(`${destinationTime}`, 50, y, { align: 'right' });
    const yLineCenter = y;

    y = sumY(doc, y, 15);

    doc.font('poppins-regular')
        .text(`${originCity}`, 50, y, { align: 'left' })
        .text(`${destinationCity}`, 50, y, { align: 'right' });

    if (originAddress) {
        doc.font('poppins-bold')
            .fill("#0057A8")
            .text('Get Direction', 50, y + 15, {
                align: 'left',
                link: `${originAddress}`,
                continued: true,
                underline: true
            })
            .text("", 0, 0, {
                align: 'left',
                link: null,
                continued: null,
                underline: null
            }).image(googleMapIconBase64, 120, y + 17, { width: 6 });
    }

    if (pickup) {
        doc.font('poppins-regular').fill("black").text(`Pick up at: ${pickup}`, 50, y + 14, {
            align: 'left',
        });

        y = sumY(doc, y, 55);

    } else {
        y = sumY(doc, y, 40);
    }




    const pageWidth2 = 595.28;
    const lineLength2 = 250;
    const startX2 = (pageWidth2 - lineLength2) / 2;
    const yPosition = yLineCenter + 10;

    const centerX = startX + lineLength;
    const centerY = yPosition;
    const radius = 2;

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

    y = sumY(doc, y, 20);

    // Passenger Details
    doc.fontSize(18)
        .fill("#0057A8")
        .font('poppins-bold')
        .text('Passenger Details', 50, y, { align: 'left' });

    y = sumY(doc, y, 40);

    // Table headers
    doc.font('poppins-bold')
        .fontSize(10)
        .text('Name', 50, y)
        .text('Phone', 200, y)
        .text('Email', 320, y)

    y = sumY(doc, y, 20);

    // Table rows
    passengers.forEach(passenger => {
        doc.font('poppins-regular')
            .fontSize(9)
            .fill("black")
            .text(passenger?.username, 50, y)
            .text(passenger?.mobile, 200, y)
            .text(passenger?.email, 320, y)
            .moveTo(50, y + 15)
            .lineTo(550, y + 15)
            .strokeColor('#E0E0E0')
            .lineWidth(0.5)
            .stroke();

        y = sumY(doc, y, 30);
    });

    y = sumY(doc, y, 20);

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
        .text(`${ticketCount}`, 270, y + 30,) // departure 
        .text(`$ ${price}`, 270, y + 50,) // price departure
        .text(`$ ${price * ticketCount}`, 270, y + 80) // price return
        .strokeColor("black")
        .lineWidth(1)
        .moveTo(50, y + 70)
        .lineTo(300, y + 70)
        .stroke();

    y = sumY(doc, y, 120)


    generateFooter(doc, y);
    return y;
}


function generateFooter(doc, startFrom2 = 650) {

    let startFrom = sumY(doc, startFrom2, 20);

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


const sumY = (doc, y, valueSum) => {
    console.log({ y, valueSum });

    if (y >= 730) {
        doc.addPage();
        y = 50;
    }
    return y + valueSum;
}

function addFacibilities(doc, y, facilities) {

    const icons = {};
    let x = 50;
    const space = 25;
    const widthIcon = 18;

    if (facilities?.wifi) {
        doc.image(wifiBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.airConditioning) {
        doc.image(airConBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.snack) {
        doc.image(snakeIconBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.waterBottle) {
        doc.image(waterBottleBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.wetTowel) {
        doc.image(wetTowerBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.powerOutlet) {
        doc.image(powerOutlet, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.gps) {
        doc.image(gpsBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.legRoom) {
        doc.image(legRoomBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.seatBelt) {
        doc.image(seatBeltBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.toilet) {
        doc.image(toiletIconBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.tv) {
        doc.image(tvBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.usbCharger) {
        doc.image(usbChargerBase64, x, y, { width: widthIcon });
        x += space;
    }

    if (facilities?.sleepingBed) {
        doc.image(sleepBedIconBase64, x, y, { width: widthIcon });
        x += space;
    }


    return icons;

}