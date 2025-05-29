import { NextResponse } from 'next/server';
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

export async function generateInvoiceRoundTripPdf({
    ticketCount,
    price,
    toEmail,
    ticketId,
    busType,
    seatNo,
    pickup,
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
    passengers = [],
    facibilities = [],
    ticketCountReturn,
    pickupReturn,
    priceReturn,
    ticketIdReturn,
    busTypeReturn,
    seatNoReturn,
    originDateReturn,
    originTimeReturn,
    originCityReturn,
    originAddressReturn,
    durationReturn,
    kilometerReturn,
    destinationDateReturn,
    destinationTimeReturn,
    destinationCityReturn,
    dateSendReturn,
    destinationAddress,
    destinationReturnAddress,
    passengersReturn = [],
    paymentMethod,
    facibilitiesReturn = []
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
        ticketCountReturn,
        priceReturn,
        ticketIdReturn,
        busTypeReturn,
        seatNoReturn,
        originDateReturn,
        originTimeReturn,
        originCityReturn,
        originAddressReturn,
        durationReturn,
        kilometerReturn,
        destinationDateReturn,
        destinationTimeReturn,
        destinationCityReturn,
        dateSendReturn,
        passengersReturn,
        facibilitiesReturn,
        pickup,
        pickupReturn,
        paymentMethod,
        destinationAddress,
        destinationReturnAddress,
    });

    doc.end();
    const pdfBuffer = await pdfBufferPromise;

    return pdfBuffer;
}

async function generateHeader(doc, {
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
    pickup,
    destinationTime,
    destinationCity,
    dateSend,
    facibilities = [],
    passengers = [],
    // return 
    ticketCountReturn,
    priceReturn,
    ticketIdReturn,
    busTypeReturn,
    seatNoReturn,
    originDateReturn,
    originTimeReturn,
    originCityReturn,
    originAddressReturn,
    durationReturn,
    kilometerReturn,
    pickupReturn,
    destinationDateReturn,
    destinationTimeReturn,
    destinationCityReturn,
    dateSendReturn,
    destinationAddress,
    destinationReturnAddress,
    paymentMethod,
    passengersReturn = [],
    facibilitiesReturn = []
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

    let seatText = `Seat No: ${seatNo}`;
    let rightMargin = 50;
    let textWidth = 250;

    doc.fontSize(11)
        .fill("black")
        .font('poppins-bold')
        .text(`${busType}`, 50, y, { align: 'left' })
        .fill("red")
        .text(seatText, pageWidth - rightMargin - textWidth, y, {
            width: textWidth,
            align: 'right'
        }).fontSize(10);

    let textHeight = doc.heightOfString(seatText, { width: textWidth });
    y = sumY(doc, y, textHeight + 10);

    addFacibilities(doc, y, facibilities)
    doc.fontSize(11).text(`$ ${price}`, 50, y, { align: 'right' }).fontSize(10)

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
    let yLineCenter = y;
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

    if (destinationAddress) {
        const text = 'Get Direction';
        const iconPadding = 5;
        const iconWidth = 6;
        textWidth = doc.widthOfString(text);
        const totalWidth = textWidth + iconPadding + iconWidth;
        rightMargin = 50;
        const x = doc.page.width - rightMargin - totalWidth;

        // Draw the text
        doc.fill("#0057A8")
            .text(text, x, y + 15, {
                link: `${destinationAddress}`,
                underline: true,
                continued: false
            });

        doc.text("", 0, 0, {
            link: null,
            underline: null,
            continued: null
        });

        doc.image(googleMapIconBase64, x + textWidth + iconPadding, y + 17, {
            width: 6
        });
    }

    if (pickup) {
        doc.font('poppins-regular').fill("black").text(`Pick up at: ${pickup}`, 50, y + 32, {
            align: 'left',
        });

        y = sumY(doc, y, 55);

    } else {
        y = sumY(doc, y, 40);
    }

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
    y = sumY(doc, y, 20);

    // [Start] Return Trip Detail

    doc.fontSize(18)
        .fill("#0057A8")
        .font('poppins-bold')
        .text('Return Trip Detail', 50, y, { align: 'left' });
    y = sumY(doc, y, 30);

    seatText = `Seat No: ${seatNoReturn}`;
    rightMargin = 50;
    textWidth = 250;

    doc.fontSize(11)
        .fill("black")
        .font('poppins-bold')
        .text(`${busTypeReturn}`, 50, y, { align: 'left' })
        .fill("red")
        .text(seatText, pageWidth - rightMargin - textWidth, y, {
            width: textWidth,
            align: 'right'
        }).fontSize(10);

    textHeight = doc.heightOfString(seatText, { width: textWidth });
    y = sumY(doc, y, textHeight + 10);

    addFacibilities(doc, y, facibilitiesReturn)
    doc.fontSize(11).text(`$ ${priceReturn}`, 50, y, { align: 'right' }).fontSize(10)

    y = sumY(doc, y, 60);

    // Trip information
    doc.font('poppins-regular')
        .fill("black")
        .text(`${originDateReturn}`, 50, y, { align: 'left' })
        .text(`${durationReturn}`, 50, y + 10, { align: 'center' })
        .text(`${destinationDateReturn}`, 50, y, { align: 'right' });

    y = sumY(doc, y, 15);

    doc.font('poppins-regular')
        .text(`${originTimeReturn}`, 50, y, { align: 'left' })
        .text(`${kilometerReturn}`, 50, y + 10, { align: 'center' })
        .text(`${destinationTimeReturn}`, 50, y, { align: 'right' });
    yLineCenter = y;

    y = sumY(doc, y, 15);

    doc.font('poppins-regular')
        .text(`${originCityReturn}`, 50, y, { align: 'left' })
        .text(`${destinationCityReturn}`, 50, y, { align: 'right' });

    if (originAddressReturn) {
        doc.font('poppins-bold')
            .fill("#0057A8")
            .text('Get Direction', 50, y + 15, {
                align: 'left',
                link: `${originAddressReturn}`,
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

    if (destinationReturnAddress) {
        const text = 'Get Direction';
        const iconPadding = 5;
        const iconWidth = 6;
        textWidth = doc.widthOfString(text);
        const totalWidth = textWidth + iconPadding + iconWidth;
        rightMargin = 50;
        const x = doc.page.width - rightMargin - totalWidth;

        // Draw the text
        doc.fill("#0057A8")
            .text(text, x, y + 15, {
                link: `${destinationReturnAddress}`,
                underline: true,
                continued: false
            });

        doc.text("", 0, 0, {
            link: null,
            underline: null,
            continued: null
        });

        doc.image(googleMapIconBase64, x + textWidth + iconPadding, y + 17, {
            width: 6
        });
    }

    if (pickupReturn) {
        doc.font('poppins-regular').fill("black").text(`Pick up at:  ${pickupReturn}`, 50, y + 32, {
            align: 'left',
        });

        y = sumY(doc, y, 55);

    } else {
        y = sumY(doc, y, 40);
    }


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

    y = sumY(doc, y, 20);

    // [End] Return Trip Detail


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

    if (y >= 680) {
        doc.addPage();
        y = 50;
    }
    if (paymentMethod != 'khqr') {

        doc.font('poppins-bold')
            .fontSize(18)
            .fill("#0057A8")
            .text('Payment Detail', 50, y, { align: 'left' })
            .font('poppins-regular')
            .fontSize(10)
            .fill("black")
            .font('poppins-bold')
            .text('Total Ticket Departure:', 50, y + 30, { align: 'left' })
            .text('Total Ticket Return:', 50, y + 50, { align: 'left' })
            .text('Amount Departure:', 50, y + 70, { align: 'left' })
            .text('Amount Return:', 50, y + 90, { align: 'left' })
            .text('Service Charge:', 50, y + 110, { align: 'left' })
            .text('Total:', 50, y + 140, { align: 'left' })
            .font('poppins-regular')
            .text(`${ticketCount}`, 270, y + 30,)
            .text(`${ticketCountReturn}`, 270, y + 50,)
            .text(`$ ${price}`, 270, y + 70,)
            .text(`$ ${priceReturn}`, 270, y + 90)
            .text(`$ ${ticketCount + ticketCountReturn}`, 270, y + 110, { align: 'left' })
            .text(`$ ${((ticketCount * price) + (ticketCountReturn * priceReturn) + (ticketCount + ticketCountReturn))}`, 270, y + 140)
            .strokeColor("black")
            .lineWidth(1)
            .moveTo(50, y + 130)
            .lineTo(290, y + 130)
            .stroke();

        y = sumY(doc, y, 150)
    } else {
        doc.font('poppins-bold')
            .fontSize(18)
            .fill("#0057A8")
            .text('Payment Detail', 50, y, { align: 'left' })
            .font('poppins-regular')
            .fontSize(10)
            .fill("black")
            .font('poppins-bold')
            .text('Total Ticket Departure:', 50, y + 30, { align: 'left' })
            .text('Total Ticket Return:', 50, y + 50, { align: 'left' })
            .text('Amount Departure:', 50, y + 70, { align: 'left' })
            .text('Amount Return:', 50, y + 90, { align: 'left' })
            .text('Total:', 50, y + 115, { align: 'left' })
            .font('poppins-regular')
            .text(`${ticketCount}`, 270, y + 30,)
            .text(`${ticketCountReturn}`, 270, y + 50,)
            .text(`$ ${price}`, 270, y + 70,)
            .text(`$ ${priceReturn}`, 270, y + 90)
            .text(`$ ${((ticketCount * price) + (ticketCountReturn * priceReturn))}`, 270, y + 115) // price return
            .strokeColor("black")
            .lineWidth(1)
            .moveTo(50, y + 110)
            .lineTo(290, y + 110)
            .stroke();

        y = sumY(doc, y, 120)
    }

    generateFooter(doc, y);

    return y;
}

function generateFooter(doc, startFrom2 = 650) {

    let startFrom = sumY(doc, startFrom2, 20);
    console.log("startFrom", startFrom);


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
    y = y + valueSum;
    if (y >= 730) {
        doc.addPage();
        y = 50;
    }
    return y;
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