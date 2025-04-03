'use client'
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { ACLEDA_BANK_API, ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from '@/constant/constant';
import QRCode from 'react-qr-code';
import moment from 'moment';
import axios from 'axios';
import { PaymentStatusEnum } from '@/enum/PaymentStatusEnum';
import { fetchFromApi } from '@/utils/api';


export default function PopupPayment({ isOpen, onClose, selectedSeat, routeSelected, phoneNumber, departureDate, fullname }) {
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatusEnum.PENDING);
    const [loading, setLoading] = React.useState(false);
    const [timeLeft, setTimeLeft] = useState();
    const [resultQorCode, setResultQorCode] = useState();
    const [resultOpenSession, setResultOpenSession] = useState();
    const [qorCode, setQorCode] = useState("");
    const [size, setSize] = React.useState("md");

    const handleOpen = async () => {
        setLoading(true);
        setTimeLeft(300);
        let data = JSON.stringify({
            "loginId": loginId,
            "password": password,
            "merchantID": merchantID,
            "signature": signature,
            "xpayTransaction": {
                "txid": uuidv4(),
                "purchaseAmount": selectedSeat?.length * (Number(routeSelected?.price)),
                "purchaseCurrency": "USD",
                "purchaseDate": moment(new Date()).format('DD-MM-YYYY'),
                "purchaseDesc": "mobile",
                "invoiceid": uuidv4(),
                "item": "1",
                "quantity": "1",
                "expiryTime": "5",
                "operationType": "5",
                "counterId": "Counter 1"
            }
        });

        const response = await axios.post(
            ACLEDA_BANK_API,
            data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        setQorCode(response?.data?.result?.qrValue);
        setResultOpenSession(response?.data);
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }
    }, [isOpen]);

    const checkPaymentStatus = async () => {
        try {
            if (paymentStatus === PaymentStatusEnum.SUCCESS) return;

            let body = JSON.stringify({
                "loginId": loginId,
                "password": password,
                "merchantId": merchantID,
                "signature": signature,
                "merchantName": merchantName,
                "paymentTokenid": resultOpenSession?.result?.xTran?.paymentTokenid,
            });

            const response = await axios.post(
                ACLEDA_BANK_API_CHECK_STATUS,
                body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const paymentStatusResponse = response.data?.result?.errorDetails;

            if (paymentStatusResponse === PaymentStatusEnum.SUCCESS) {
                setPaymentStatus(PaymentStatusEnum.SUCCESS);

                const books = {          
                    route_id: routeSelected?.id,
                    email: "nareachkr@gmail.com",
                    password: 123456,
                    mobile: phoneNumber,
                    travel_date: departureDate,
                    travel_time: routeSelected?.timings?.meta_value,
                    price: selectedSeat?.length * (Number(routeSelected?.price)),
                    bus_id: routeSelected?.bus_type?.id,
                    bus_type: routeSelected?.bus_type?.bus_type,
                    seat_no: selectedSeat?.map(seat => seat.seat_id).join(", "),
                    pass_email: "nareachkr@gmail.com",
                    firstname: fullname,
                    surname: fullname,
                    remarks: 'I love giantibis'
                };

                const book = await fetchFromApi('add_booking', books);
                if (book) {

                    const bookConfirmed = {
                        ref_code: book?.Booking_id,
                    };
                    const confirmed = await fetchFromApi('confirm_Booking', bookConfirmed);
                }

            } else if (paymentStatusResponse === PaymentStatusEnum.PENDING) {
                setPaymentStatus(PaymentStatusEnum.PENDING);
            } else if (paymentStatusResponse === PaymentStatusEnum.EXPIRED) {
                setPaymentStatus(PaymentStatusEnum.EXPIRED);
            } else if (paymentStatusResponse === PaymentStatusEnum.PAY_BY_OTHER) {
                setPaymentStatus(PaymentStatusEnum.PAY_BY_OTHER);
            } else {
                setPaymentStatus(PaymentStatusEnum.ERROR);
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    useEffect(() => {
        if (!isOpen || paymentStatus === PaymentStatusEnum.SUCCESS) return;

        const handle = setInterval(async () => {
            await checkPaymentStatus();
        }, 10000);

        return () => clearInterval(handle);
    }, [isOpen, paymentStatus]);

    return (
        <div>
            {
                paymentStatus !== PaymentStatusEnum.SUCCESS ? <>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">Payment</ModalHeader>
                            <ModalBody>
                                {
                                    qorCode ? <>
                                        <div className='h-[500px] px-[50px] py-[10px] flex flex-col overflow-y-auto'>
                                            <div className='h-[12%] bg-[#E1232E] flex justify-center items-center'>
                                                <h1 className='text-white font-medium text-[25px]'>KHQOR</h1>
                                            </div>
                                            <div className='border-b-3 border-dashed'>
                                                <div className='flex flex-col py-[15px] px-[25px]'>
                                                    <div className='text-[15px]'>
                                                        {merchantName}
                                                    </div>
                                                    <div className='font-semibold'>
                                                        {selectedSeat?.length * (Number(routeSelected?.price))} USD
                                                    </div>
                                                </div>
                                            </div>
                                            <QRCode
                                                size={256}
                                                style={{ height: "70%", maxWidth: "100%", width: "100%" }}
                                                value={qorCode}
                                                viewBox={`0 0 256 256`}
                                            />
                                            <div className='text-sm font-semibold text-center px-[10px] text-gray-400 py-[5px]'>
                                                Scan with mobile banking that support KHQR
                                            </div>
                                            <div className='text-sm font-semibold text-center text-gray-400 '>
                                                It will expire in <span className='font-bold text-black'>{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</span>
                                            </div>
                                        </div>
                                    </> : <>
                                        <h1>Loading ...</h1>
                                    </>
                                }
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </> : <>
                    <Modal isOpen={isOpen} size={size} onClose={onClose} >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">PAY SUCCESS</ModalHeader>
                                    <ModalBody>
                                        <div className='h-[400px] px-[50px] py-[10px] flex flex-col overflow-y-auto justify-center items-center gap-[40px]'>
                                            <img src="/assets/images/payment-success.webp" className='h-[200px] object-center w-[200px]' alt="" />
                                            <h1 className='text-[20px] font-bold'>Payment success !!</h1>
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            }
        </div>
    );
}