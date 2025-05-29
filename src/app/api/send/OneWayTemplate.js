import { CLIENT_URL, fromMail } from "@/constant/constant"
import { getImageUrl } from "../service/utils/api-util";


export const OneWayTemplate = ({
    toEmail,
    ticketCount,
    price,
    dateSend,
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
    facibilities,
    destinationAddress,
    pickup,
    passengers = [],
    paymentMethod
}) => {
    console.log("facibilities email", facibilities);

    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300..700&display=swap"
        rel="stylesheet">
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300..700&display=swap');
        body{
            font-family: 'Poppins';
        }

        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }

            .header,
            .trip-info,
            .passenger-table {
                width: 100% !important;
            }

            .header td,
            .trip-info td {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
            }

            .logo-section img {
                height: 60px !important;
            }

            .title {
                font-size: 20px !important;
            }

            .trip-info td {
                padding: 10px 0 !important;
            }

            .passenger-table th,
            .passenger-table td {
                font-size: 12px !important;
                padding: 8px !important;
            }

            .inform-detail ul li {
                font-size: 12px !important;
            }
        }
    </style>
</head>

<body style="font-family: Poppins, sans-serif; padding: 0; margin: 0; background-color: #f4f4f4;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;"
        class="container">
        <tr>
            <td style="padding: 20px;">
                <!-- Header Section -->
                <table style="width: 100%; border-collapse: collapse;" class="header">
                    <tr>
                        <td style="width: 50%; text-align: left; font-family: Poppins, sans-serif;">
                            <div style="font-size: 12px;">FROM: ${fromMail}</div>
                            <div style="font-size: 12px;">Subject: E-Ticket ID #${ticketId}</div>
                        </td>
                        <td style="width: 50%; text-align: right; font-family: Poppins, sans-serif;">
                            <div style="font-size: 12px;">Date: ${dateSend}</div>
                            <div style="font-size: 12px;">To: ${toEmail}</div>
                        </td>
                    </tr>
                </table>

                <!-- Logo Section -->
                <table
                    style="width: 100%; border-top: 1px solid #A6A6A6; border-bottom: 1px solid #A6A6A6; margin: 10px 0; padding: 10px; border-collapse: collapse;"
                    class="logo-section">
                    <tr>
                        <td style="width: 50%; text-align: left;">
                            <img src="https://giantibis.com/img/logo.png" alt="Giant Ibis Logo"
                                style="height: 60px; max-width: 100%; display: block; margin: 14px 0;">
                        </td>
                        <td
                            style="width: 50%; text-align: right; font-weight: bold; color: #0057A8; font-size: 12px; font-family: Poppins, sans-serif;">
                            <div>Your E-TICKET</div>
                            <div>ID: #${ticketId}</div>
                        </td>
                    </tr>
                </table>

                <!-- Trip Detail Section -->
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td>
                            <div style="font-weight: 700; font-size: 18px; color: #0057A8; font-family: Poppins, sans-serif;"
                                class="title">Trip Detail</div>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="font-weight: 600; font-size: 10px; font-family: Poppins, sans-serif;">
                                        ${busType}</td>
                                    <td
                                        style="text-align: right; color: red; font-weight: 600; font-size: 10px; font-family: Poppins, sans-serif;">
                                        Seat number: ${seatNo}</td>
                                </tr>
                            </table>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="font-weight: 600; font-size: 10px; font-family: Poppins, sans-serif;">
                                        ${facibilities?.airConditioning ? `<img style="width: 25px;" src=${getImageUrl("aircon.png")} alt=""> ` : ""}
                                        ${facibilities?.wifi ? `<img style="width: 25px;" src=${getImageUrl("Wifi.png")} alt=""> ` : ""}
                                        ${facibilities?.snack ? `<img style="width: 25px;" src=${getImageUrl("snack-icon.png")} alt=""> ` : ""}
                                        ${facibilities?.waterBottle ? `<img style="width: 25px;" src=${getImageUrl("water-bottle-icon.png")} alt=""> ` : ""}
                                        ${facibilities?.wetTowel ? `<img style="width: 25px;" src=${getImageUrl("wet-tower.png")} alt=""> ` : ""}
                                        ${facibilities?.powerOutlet ? `<img style="width: 25px;" src=${getImageUrl("power-outlet-icon.png")} alt=""> ` : ""}
                                        ${facibilities?.gps ? `<img style="width: 25px;" src=${getImageUrl("gps.png")} alt=""> ` : ""}
                                        ${facibilities?.legRoom ? `<img style="width: 25px;" src=${getImageUrl("legroom.png")} alt=""> ` : ""}
                                        ${facibilities?.seatBelt ? `<img style="width: 25px;" src=${getImageUrl("seat-belt.png")} alt=""> ` : ""}
                                        ${facibilities?.toilet ? `<img style="width: 25px;" src=${getImageUrl("toilet.png")} alt=""> ` : ""}
                                        ${facibilities?.tv ? `<img style="width: 25px;" src=${getImageUrl("tv.png")} alt=""> ` : ""}
                                        ${facibilities?.usbCharger ? `<img style="width: 25px;" src=${getImageUrl("usb-charger-icon.png")} alt=""> ` : ""}
                                        ${facibilities?.sleepingBed ? `<img style="width: 25px;" src=${getImageUrl("sleeping-bed-icon-orange.png")} alt=""> ` : ""}
                                    </td>

                                </tr>
                            </table>
                            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;" class="trip-info">
                                <tr>
                                    <td
                                        style="width: 30%; font-weight: 600; font-size: 10px; font-family: Poppins, sans-serif; text-align: left;">
                                        ${originDate}<br>${originTime}<br>${originCity}  ${originAddress ? `<br><a href="${originAddress}" target="_blank" rel="noopener noreferrer">Get Direction</a>` : ""} ${pickup ? `<br>Pick up at: ${pickup}` : ""}
                                    </td>
                                    <td style=" text-align: center;justify-content:center; font-family: Poppins, sans-serif;">
                                        <span style="font-size: 10px; font-weight: 500;">${duration}</span><br>
                                        <div style="height: 1px; background-color: black; width: 100%;"></div>
                                        <span style="font-size: 10px;font-weight: 500;">${kilometer}</span><br>
                                    </td>
                                    <td
                                        style="width: 30%; font-weight: 600; font-size: 10px; font-family: Poppins, sans-serif; text-align: right;">
                                        ${destinationDate}<br>${destinationTime}<br>${destinationCity} ${destinationAddress ? `<br><a href="${destinationAddress}" target="_blank" rel="noopener noreferrer">Get Direction</a>` : ""}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Divider -->
        <tr>
            <td style="padding: 0;">
                <div style="margin-top: 0px; width: 100%; background-color: #A6A6A6; height: 1px;"></div>
            </td>
        </tr>

        <!-- Passenger Detail Section -->
        <tr >
            <td style="padding: 20px;">
                <div style="font-weight: 700; font-size: 18px; color: #0057A8; font-family: Poppins, sans-serif;"
                    class="title">Passenger Detail</div>
                <table style="width: 100%; margin-top: 15px; border-collapse: collapse; border: 1px solid black;"
                    class="passenger-table">
                    <tr>
                        <th
                            style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: #D0E8FF; color: black; font-family: Poppins, sans-serif;">
                            Name</th>
                        <th
                            style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: #D0E8FF; color: black; font-family: Poppins, sans-serif;">
                            Phone Number</th>
                        <th
                            style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: #D0E8FF; color: black; font-family: Poppins, sans-serif;">
                            Email</th>
                    </tr>
                    ${passengers?.map((item, index) =>
        `
                            <tr>
                                <td
                                    style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: white; color: black; font-family: Poppins, sans-serif;">
                                    ${item?.username}</td>
                                <td
                                    style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: white; color: black; font-family: Poppins, sans-serif;">
                                    ${item?.mobile}</td>
                                <td
                                    style="padding: 12px 15px; text-align: left; font-weight: 500; font-size: 10px; border: 1px solid black; background-color: white; color: black; font-family: Poppins, sans-serif;">
                                    ${item.email}</td>
                            </tr>
                            `).join("")}
                </table>
            </td>
        </tr>

        <tr>
            <td style="padding: 0;">
                <div style="margin-top: 0px; width: 100%; background-color: #A6A6A6; height: 1px;"></div>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px;">
                <div style="font-weight: 700; font-size: 18px; color: #0057A8; font-family: Poppins, sans-serif;"
                    class="title">Payment Detail</div>
                <table style="width: 50%; margin-top: 15px; font-size: 12px;" class="passenger-table">
                    <tr>
                        <td>Total Ticket Departure: </td>
                        <td>${ticketCount}</td>
                    </tr>
                    <tr>
                        <td>Amount Departure: </td>
                        <td>$ ${price}</td>
                    </tr>
                     ${paymentMethod != "khqr" ? `<tr>
                        <td>Service Charge: </td>
                        <td>$ ${ticketCount}</td>
                        </tr>`: ""
                    }
                    <tr>
                        <td>
                            <div style="margin-top: 0px; width: 120%; background-color: #A6A6A6; height: 1px;"></div>
                        </td>
                    </tr>
                    ${paymentMethod != "khqr" ? `
                        <tr>
                            <td>Total: </td>
                            <td>$ ${(ticketCount * price) + ticketCount}</td>
                        </tr>`: `
                        <tr>
                            <td>Total: </td>
                            <td>$ ${(ticketCount * price)}</td>
                        </tr>`
                    }
                </table>
            </td>
        </tr>


        <!-- Divider -->
        <tr>
            <td style="padding: 0;">
                <div style="margin-top: 0px; width: 100%; background-color: #A6A6A6; height: 1px;"></div>
            </td>
        </tr>

        <!-- Please be Informed Section -->
        <tr >
            <td style="padding: 20px;">
                <div style="font-weight: 700; font-size: 18px; color: #0057A8; font-family: Poppins, sans-serif;"
                    class="title">Please be Informed</div>
                <div style="font-family: Poppins, sans-serif; font-size: 12px;">
                    <div style="margin-bottom: 10px;">The following rules apply to all Giant Ibis Transport passengers
                        and is subject to change at any time without prior notice:</div>
                    <ul style="list-style-type: disc; margin-left: 20px; padding-left: 20px;">
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Tickets are
                            non-refundable but exchangeable for 1 time only up to one year from the date of purchase.
                            Note: Please inform us 24 hours before departure time via email: info@giantibis.com or
                            Hotline: +855 96 999 3333.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Online tickets may
                            be purchased at any time before departure as long as seats are still available.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Complimentary pick
                            up may be arranged when tickets are purchased one day in advance of departure.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Complimentary pick
                            up is only available for customer who stays in the listed partner hotels and guesthouses.
                        </li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Passengers must be
                            ready and wait for pickup service bus at the lobby in their hotel or guesthouse 1 hour
                            before departure time. Our pickup guys would talk to the hotel's receptionist, please always
                            inform the receptionist when using our service.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Giant Ibis
                            Transport is not liable for no-show and/or late passengers who miss their pick up or
                            scheduled departure.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Complimentary pick
                            up is NOT available for night bus departures.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Passengers should
                            arrive at the bus terminal 35 minutes before their scheduled departure time.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Passengers must
                            present their ticket or valid identification in order to board the bus.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Parents may hold
                            infants without purchasing an additional ticket for local routes and are charged 15$/pax for
                            international routes. Children aged 3+ must have a ticket.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Giant Ibis
                            Transport will not make any refund related to our complimentary services such as Pick up,
                            Wi-Fi, Snack, and outlet.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">The duration of the
                            trip will depend largely on road conditions at the time of your journey, Giant Ibis
                            Transport will not responsible for any early/late arrival.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Please keep in mind
                            that our company does not accept liability for any damage to personal belongings and luggage
                            that may occur during our services. Thank you for your understanding.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Tickets need not be
                            printed, but may be presented electronically.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">A car seat may be
                            provided free of charge given advanced notice of the requirement; however a ticket must be
                            purchased for infants that will use a car seat.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Each passenger is
                            permitted 1 carry on and a maximum of 2 pieces of stored luggage not exceeding 25kg. Stored
                            luggage exceeding 25kg may be subject to additional charges.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Livestock, pet,
                            weapons, illegal products and hazardous material are prohibited aboard the bus.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Passengers may not
                            bring strong smelling food items onto the bus (ie. durian, prohok, etc.).</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">All passengers
                            should mind their manners and language in the presence of fellow passengers and company
                            staff.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Smoking aboard the
                            bus is prohibited.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">The passenger
                            hereby acknowledges and agrees that personal data has been given to Giant Ibis Transport for
                            the purposes of purchasing online tickets, providing and developing ancillary services and
                            facilities, accounting, billing and auditing, security, administrative and legal purposes,
                            systems testing, maintenance and development, statistical analysis, and helping us in any
                            future dealings with you. For these purposes, by entering into purchasing online ticket with
                            us you authorize us to retain and use your data.</li>
                        <li style="padding: 5px 0; font-family: Poppins, sans-serif; font-size: 12px;">Note for Phnom Penh
                            - Ho Chi Minh: Passenger should have Vietnam Visa before boarding the bus due to Vietnam
                            Visa cannot apply at the border. In case passenger did not have Vietnam Visa on the date of
                            traveling, they cannot claim to refund or delay travel schedule.</li>
                    </ul>
                </div>
            </td>
        </tr>
        </td>
        </tr>
    </table>
</body>

</html>`
}
