'use client'

import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { ACLEDA_BANK_API, loginId, merchantID, merchantName, password, signature } from '@/constant/constant';
import QRCode from 'react-qr-code';
import moment from 'moment';
import axios from 'axios';

export default function PopupPayment({ selectedSeat, routeSelected }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState("md");
    const [loading, setLoading] = React.useState(false);
    const [timeLeft, setTimeLeft] = useState();
    const [resultQorCode, setResultQorCode] = useState();

    const [qorCode, setQorCode] = useState("");

    const handleOpen = async (size) => {

        setLoading(true);
        setTimeLeft(300);
        let data = JSON.stringify({
            "loginId": loginId,
            "password": password,
            "merchantID": merchantID,
            "signature": signature,
            "xpayTransaction": {
                "txid": "2018110100000001",
                "purchaseAmount": 0.03,
                "purchaseCurrency": "USD",
                "purchaseDate": moment(new Date()).format('DD-MM-YYYY'),
                "purchaseDesc": "mobile",
                "invoiceid": "2018110100000001",
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
        }
        );
        console.log("result: ",response?.data);
        
        setQorCode(response?.data?.result?.qrValue);
        setSize(size);
        onOpen();
        setLoading(true);
    };


    const callAPI = async () => {
        try {
          const response = await fetch('https://api.example.com/endpoint', {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log('API Response:', data);
        } catch (error) {
          console.error('API Error:', error);
        }
      };

    useEffect(() => {
        if (timeLeft === 0) return;
    
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, [timeLeft]);
    
    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button key={'2xl'} onPress={() => handleOpen(size)}>
                    {loading ? 'Payment ...' : 'Pay'}
                </Button>
            </div>
            <Modal isOpen={isOpen} size={size} onClose={onClose} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Payment</ModalHeader>
                            <ModalBody>
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
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
