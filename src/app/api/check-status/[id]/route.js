import { NextResponse } from "next/server";
import { paymentService } from "../../service/payment.service";
import { confirmBooking, getAllBookDetail } from "@/services/giantIbisServiceCall";

/**
 * 1. Check payment status with Acelida API
 * 2. If payment success please confirm the seat
 * 3. 
 * 
 */
export async function GET(request, { params }) {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const refCode = searchParams.get('refCode');

    const paymentStatus = await paymentService.checkPaymentStatus(id);
    if (paymentStatus?.result.errorDetails != 'SUCCESS') {
        return NextResponse.json({
            status: false,
            message: "Your payment was not successful. Please try again."
        }, { status: 400 });
    }

    const confirmRef = await confirmBooking(refCode);

    let booklist = await getAllBookDetail();

    const bookOneWay = booklist?.data?.filter((item, index) => item.ref_code === refCode);

    if (bookOneWay?.length <= 0) {
        return NextResponse.json({
            status: false,
            message: "Ref code not found."
        }, { status: 400 });
    }

    const confirmBookedOneWay = await paymentService.confirmOneWay(bookOneWay);

    return NextResponse.json({
        status: true,
        message: "Retrive route detail successfull.",
        data: confirmBookedOneWay,
        confirmRef: confirmRef?.data,
    })
}