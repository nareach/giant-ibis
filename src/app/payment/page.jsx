'use client'
import { ACLEDA_BANK_API, loginId, merchantID, password, signature } from '@/constant/constant';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosError } from 'axios';

export default function PaymentForm() {
    const [formData, setFormData] = useState({
        merchantID: "QxSy5wACjfT1eLDTIaL8M6NNKGs=",
        sessionid: "", // Start with empty session ID
        paymenttokenid: "HYuGf8hv3k2B0lrbHY2uNEvgHZk=",
        description: "mobile",
        expirytime: "5",
        amount: "25",
        quantity: "1",
        item: "1",
        invoiceid: "2909202000000001",
        currencytype: "USD",
        transactionID: "2909202000000001",
        successUrlToReturn: "https://www.yourwebsite.com/success",
        errorUrl: "https://www.yourwebsite.com/failed",
        tokenizeId: "2805435817"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);


    const [sessionId, setSessionId] = useState();
    const [paymentTokenid, setPaymentTokenid] = useState();
    const [transactionID, setTransactionID] = useState();

    useEffect(() => {
        setIsClient(true);
        openSessionV2();
    }, []);

    const openSessionV2 = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const uuid = uuidv4();
            setTransactionID(uuid);
            let data = JSON.stringify({
                "loginId": loginId,
                "password": password,
                "merchantID": merchantID,
                "signature": signature,
                "xpayTransaction": {
                    "txid": uuid,
                    "purchaseAmount": 0.5,
                    "purchaseCurrency": "USD",
                    "purchaseDate": '3-31-2025',
                    "purchaseDesc": "mobile",
                    "invoiceid": uuid,
                    "item": "1",
                    "quantity": "1",
                    "expiryTime": "5",
                    "paymentCard": "0",
                }
            });

            const response = await axios.post(
                ACLEDA_BANK_API,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('response: ', response.data);
            setPaymentTokenid(response.data?.result?.xTran?.paymentTokenid)
            setSessionId(response.data?.result?.sessionid);

        } catch (err) {
            console.log('error detail: ', err);

            if (err instanceof AxiosError) {
                console.log(err.response);
            }
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    if (!isClient) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading payment form...</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Initializing payment session...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <p>Error: {error}</p>
                <button onClick={openSessionV2}>Retry</button>
            </div>
        );
    }

    return (
        <>
            <form id="_xpayTestForm" name="_xpayTestForm"
                action="https://epaymentuat.acledabank.com.kh/GIANTIBIS/paymentPage.jsp"
                method="post">

                <input type="hidden" id="merchantID" name="merchantID" value={merchantID} />
                <input type="hidden" id="paymenttokenid" name="paymenttokenid" value={paymentTokenid} />
                <input type="hidden" id="sessionid" name="sessionid" value={sessionId} />
                <input type="hidden" id="transactionID" name="transactionID" value={transactionID} />
                <input type="hidden" id="expirytime" name="expirytime" value="5" />
                <input type="hidden" id="amount" name="amount" value="0.5" />
                <input type="hidden" id="quantity" name="quantity" value="1" />
                <input type="hidden" id="currencytype" name="currencytype" value="USD" />
                <input type="hidden" id="description" name="description" value="mobile" />
                <input type="hidden" id="item" name="item" value="1" />
                <input type="hidden" id="errorUrl" name="errorUrl"
                    value="http://localhost:3000/error" />
                <input type="hidden" id="paymentCard" name="paymentCard" value="0" />
                <input type="hidden" id="invoiceid" name="invoiceid" value={transactionID} />

                <input type="hidden" id="successUrlToReturn" name="successUrlToReturn"
                    value={`http://localhost:3000/success/`} />
                <input type="hidden" id="errorUrl" name="errorUrl"
                    value={`http://localhost:3000/error/`} />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#cccccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {sessionId ? 'Payment' : 'Processing...'}
                </button>
            </form>
        </>
    );
}