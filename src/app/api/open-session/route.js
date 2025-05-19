import { ACLEDA_BANK_API, loginId, merchantID, password, signature } from "@/constant/constant";
import axios from "axios";

export async function POST(request) {
    try {

        const { uuid, amount, purchaseDate, paymentMethod } = await request.json();

        let data = JSON.stringify({
            "loginId": loginId,
            "password": password,
            "merchantID": merchantID,
            "signature": signature,
            "xpayTransaction": {
                "txid": uuid,
                "purchaseAmount": amount,
                "purchaseCurrency": "USD",
                "purchaseDate": purchaseDate,
                "purchaseDesc": 'booking',
                "invoiceid": uuid,
                "item": 'booking',
                "quantity": "1",
                "expiryTime": "5",
                "paymentCard": paymentMethod,
            }
        });

        const response = await axios.post(
            ACLEDA_BANK_API,
            data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("response: ", response.data);
        

        if (response.data?.result?.errorDetails !== "SUCCESS") {

            return Response.json(
                {
                    status: false,
                    type: "payment",
                    message: "The payment gateway is currently experiencing an issue. Please try again later or contact support for assistance. Your seat will be reserved for 20 minutes—after that, it will become available again.",
                },
                {
                    status: 500,
                    statusText: "Payment Gateway Error"
                }
            );
        }

        if (response.data) {
            return Response.json({
                status: true,
                data: response?.data,
            })
        }


    } catch (error) {

    }

}