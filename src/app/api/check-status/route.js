import { NextResponse } from "next/server";
import { paymentService } from "../service/payment.service";

/**
 * 1. Check payment status with Acelida API
 * 2. If payment success please confirm the seat
 * 3. 
 */
export async function GET(request) {

    const confirmBooked = await paymentService.confirmTheBooking("E2OiLAtQ3jzquTOdVoHKsrDzxFsz");

    if (confirmBooked == false) {
        return NextResponse.json({
            status: false,
            message: "Your payment was not successful. Please try again."
        })
    }

    return NextResponse.json({
        status: true,
    })
}