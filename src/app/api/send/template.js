export const TemplateMailFa = () => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-Ticket</title>
    <style type="text/css">
        body {
            font-family: "Poppins", sans-serif;
            padding: 0 25px;
        }

        .head-mail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
        }

        .head-mail .to {
            display: flex;
            justify-content: end;
            align-items: end;
            flex-direction: column;
        }

        .logo-sectioon {
            border-bottom: 1px solid #A6A6A6;
            border-top: 1px solid #A6A6A6;
            padding: 10px;
            padding-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
        }

        .logo-sectioon .e-ticket {
            display: flex;
            justify-content: space-between;
            align-items: end;
            font-weight: bold;
            flex-direction: column;
            gap: 10px;
            color: #0057A8;
            font-size: 18px;
        }

        .logo-sectioon img {
            height: 100px;
        }

        .detail-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

        }

        .detail-box .trip-detail .head {
            font-weight: 700;
            font-size: 25px;
            color: #0057A8;
        }

        .detail-box .trip-detail {
            width: 100%;
        }

        .detail-box .trip-detail .bus-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .detail-box .trip-detail .bus-title .bus-type {
            font-weight: 600;
        }

        .detail-box .trip-detail .bus-title .seat-no {
            color: red;
            font-weight: 600;
        }


        .detail-box .trip-detail .trip-info {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .detail-box .trip-detail .trip-info .middle {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .detail-box .trip-detail .trip-info .middle .line {
            height: 2px;
            background-color: black;
            width: 100%;
        }

        /* [START] for origin style */
        .detail-box .trip-detail .trip-info .origin {
            display: flex;
            flex-direction: column;

        }

        .detail-box .trip-detail .trip-info .origin .travel-time {
            font-weight: 600;
            font-size: 18px;
        }

        .detail-box .trip-detail .trip-info .origin .travel-date {
            font-weight: 600;
            font-size: 18px;
        }

        .detail-box .trip-detail .trip-info .origin .city {
            font-size: 17px;
            font-weight: 500;
            font-size: 18px;
        }

        /* [END] for origin style */

        /* [START] style destination */
        .detail-box .trip-detail .trip-info .destination {
            display: flex;
            flex-direction: column;

        }

        .detail-box .trip-detail .trip-info .destination .travel-time {
            font-weight: 600;
            font-size: 18px;
        }

        .detail-box .trip-detail .trip-info .destination .travel-date {
            font-weight: 600;
            font-size: 18px;
        }

        .detail-box .trip-detail .trip-info .destination .city {
            font-size: 17px;
            font-weight: 500;
            font-size: 18px;
        }

        /* [END] style destination */


        .full-line {
            margin-top: 40px;
            width: 100%;
            background-color: #A6A6A6;
            height: 1px;
        }

        .passenger-detail {
            margin: 30px 0;
            width: 100%;
        }

        .passenger-detail .title {
            font-weight: 700;
            font-size: 25px;
            color: #0057A8;
        }

        /* passenger table */
        .passenger-detail .table-passenger {
            width: 100%;
        }

        .table-passenger {
            width: 100%;
            border-collapse: separate;
            /* Changed from collapse */
            border-spacing: 0;
            /* Removes space between cells */
            margin-top: 15px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid black;
        }

        .table-passenger th,
        .table-passenger td {
            padding: 12px 15px;
            text-align: left;
            font-weight: 500;
            border: 1px solid black;
        }

        .table-passenger th {
            background-color: #D0E8FF;
            color: black;
            border-bottom: 1px solid black;
            /* Ensures bottom border */
        }

        .table-passenger td {
            background-color: white;
            color: black;
        }

        /* Special border handling for first/last cells */
        .table-passenger tr:first-child th:first-child {
            border-top-left-radius: 10px;
        }

        .table-passenger tr:first-child th:last-child {
            border-top-right-radius: 10px;
        }

        .table-passenger tr:last-child td:first-child {
            border-bottom-left-radius: 10px;
        }

        .table-passenger tr:last-child td:last-child {
            border-bottom-right-radius: 10px;
        }

        /* end passenger table */
        .inform-detail .title {
            font-weight: 700;
            font-size: 25px;
            color: #0057A8;
        }

        .inform-detail ul {
            list-style-type: disc;
        }

        .inform-detail ul li {
            padding: 5px 0;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #000000;">

    <!-- HEADER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 10px 0;">
                <table align="left" width="50%">
                    <tr>
                        <td style="font-family: Arial, sans-serif;">
                            <div>FROM: cheachento@gmail.com</div>
                            <div>Subject: E-Ticket ID #12121</div>
                        </td>
                    </tr>
                </table>
                <table align="right" width="50%">
                    <tr>
                        <td style="font-family: Arial, sans-serif; text-align: right;">
                            <div>Date: 9 January 2025 3:12 AM</div>
                            <div>To: cheachento@gmail.com</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- LOGO SECTION -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="logo-section">
        <tr>
            <td>
                <table align="left" width="50%">
                    <tr>
                        <td>
                            <img src="https://giantibis.com/img/logo.png" alt="Giant Ibis Logo" style="height: 100px;">
                        </td>
                    </tr>
                </table>
                <table align="right" width="50%">
                    <tr>
                        <td style="text-align: right;">
                            <div style="font-weight: bold; color: #0057A8; font-size: 18px;">Your E-TICKET</div>
                            <div style="font-weight: bold; color: #0057A8; font-size: 18px;">ID : #121</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- TRIP DETAILS -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <div style="font-weight: 700; font-size: 25px; color: #0057A8; margin-bottom: 15px;">Play detail</div>
                <table width="100%" style="margin-bottom: 20px;">
                    <tr>
                        <td style="font-weight: 600;">Universe Node 37 (Mini van 35 seats)</td>
                        <td style="text-align: right; color: red; font-weight: 600;">Seat number: </td>
                    </tr>
                </table>
                
                <table width="100%">
                    <tr>
                        <td width="30%">
                            <div style="font-weight: 600; font-size: 18px;">Nov 16 2025</div>
                            <div style="font-weight: 600; font-size: 18px;">08:35 AM</div>
                            <div style="font-weight: 500; font-size: 18px;">Phnom Penh</div>
                        </td>
                        <td width="40%" style="text-align: center;">
                            <div>5 hours</div>
                            <div style="height: 1px; background-color: black; width: 100%; margin: 5px 0;"></div>
                            <div>5 KM</div>
                        </td>
                        <td width="30%" style="text-align: right;">
                            <div style="font-weight: 600; font-size: 18px;">Nov 16 2025</div>
                            <div style="font-weight: 600; font-size: 18px;">08:35 AM</div>
                            <div style="font-weight: 500; font-size: 18px;">Phnom Penh</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- DIVIDER LINE -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 40px 0;">
                <div style="width: 100%; background-color: #A6A6A6; height: 1px;"></div>
            </td>
        </tr>
    </table>

    <!-- PASSENGER DETAILS -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <div style="font-weight: 700; font-size: 25px; color: #0057A8; margin-bottom: 15px;">Passenger Detail</div>
                <table width="100%" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-top: 15px;">
                    <tr>
                        <th style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black; background-color: #D0E8FF;">Name</th>
                        <th style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black; background-color: #D0E8FF;">Phone Number</th>
                        <th style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black; background-color: #D0E8FF;">Email</th>
                        <th style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black; background-color: #D0E8FF;">Pickup</th>
                    </tr>
                    <tr>
                        <td style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black;">Chea Chento</td>
                        <td style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black;">092 655 182</td>
                        <td style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black;">chento@gmail.com</td>
                        <td style="padding: 12px 15px; text-align: left; font-weight: 500; border: 1px solid black;">Siem Reap Hotel</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- DIVIDER LINE -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 40px 0;">
                <div style="width: 100%; background-color: #A6A6A6; height: 1px;"></div>
            </td>
        </tr>
    </table>

    <!-- INFORM DETAILS -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <div style="font-weight: 700; font-size: 25px; color: #0057A8; margin-bottom: 15px;">Please be Informed</div>
                <div style="margin-bottom: 15px;">The following rules apply to all Giant Ibis Transport passengers and is subject to change at any time without prior notice:</div>
                <ul style="padding-left: 20px; margin: 15px 0;">
                    <li style="padding: 5px 0;">Tickets are non-refundable but exchangeable for 1 time only up to one year from the date of purchase. Note: Please inform us 24 hours before departure time via email: info@giantibis.com or Hotline: +855 96 999 3333.</li>
                    <li style="padding: 5px 0;">Online tickets may be purchased at any time before departure as long as seats are still available.</li>
                    <li style="padding: 5px 0;">Complimentary pick up may be arranged when tickets are purchased one day in advance of departure</li>
                    <li style="padding: 5px 0;">Complimentary pick up is only available for customer who stays in the listed partner hotels and guesthouses.</li>
                    <li style="padding: 5px 0;">Passengers must be ready and wait for pickup service bus at the lobby in their hotel or guesthouse 1 hour before departure time. Our pickup guys would talk to the hotel's receptionist, please always inform the receptionist when using our service.</li>
                    <li style="padding: 5px 0;">Giant Ibis Transport is not liable for no-show and/or late passengers who miss their pick up or scheduled departure.</li>
                    <li style="padding: 5px 0;">Complimentary pick up is NOT available for night bus departures.</li>
                    <li style="padding: 5px 0;">Passengers should arrive at the bus terminal 35 minutes before their scheduled departure time.</li>
                    <li style="padding: 5px 0;">Passengers must present their ticket or valid identification in order to board the bus.</li>
                    <li style="padding: 5px 0;">Parents may hold infants without purchasing an additional ticket for local routes and are charged 15$/pax for international routes. Children aged 3+ must have a ticket</li>
                    <li style="padding: 5px 0;">Giant Ibis Transport will not make any refund related to our complimentary services such as Pick up, Wi-Fi, Snack, and outlet.</li>
                    <li style="padding: 5px 0;">The duration of the trip will depend largely on road conditions at the time of your journey, Giant Ibis Transport will not responsible for any early/late arrival.</li>
                    <li style="padding: 5px 0;">Please keep in mind that our company does not accept liability for any damage to personal belongings and luggage that may occur during our services. Thank you for your understanding.</li>
                    <li style="padding: 5px 0;">tickets need not be printed, but may be presented electronically.</li>
                    <li style="padding: 5px 0;">A car seat may be provided free of charge given advanced notice of the requirement; however a ticket must be purchased for infants that will use a car seat.</li>
                    <li style="padding: 5px 0;">Each passenger is permitted 1 carry on and a maximum of 2 pieces of stored luggage not exceeding 25kg. Stored luggage exceeding 25kg may be subject to additional charges.</li>
                    <li style="padding: 5px 0;">Livestock, pet, weapons, illegal products and hazardous material are prohibited aboard the bus.</li>
                    <li style="padding: 5px 0;">Passengers may not bring strong smelling food items onto the bus (ie. durian, prohok, etc.).</li>
                    <li style="padding: 5px 0;">All passengers should mind their manners and language in the presence of fellow passengers and company staff.</li>
                    <li style="padding: 5px 0;">Smoking aboard the bus is prohibited.</li>
                    <li style="padding: 5px 0;">The passenger hereby acknowledges and agrees that personal data has been given to Giant Ibis Transport for the purposes of purchasing online tickets, providing and developing ancillary services and facilities, accounting, billing and auditing, security, administrative and legal purposes, systems testing, maintenance and development, statistical analysis, and helping us in any future dealings with you. For these purposes, by entering into purchasing online ticket with us you authorize us to retain and use your data.</li>
                    <li style="padding: 5px 0;">Note for Phnom Penh - Ho Chi Minh: Passenger should have Vietnam Visa before boarding the bus due to Vietnam Visa cannot apply at the border. In case passenger did not have Vietnam Visa on the date of traveling, they cannot claim to refund or delay travel schedule.</li>
                </ul>
            </td>
        </tr>
    </table>

</body>
</html>
  `;
};