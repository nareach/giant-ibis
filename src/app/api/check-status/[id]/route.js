import { NextResponse } from "next/server";
import { paymentService } from "../../service/payment.service";
import { confirmBooking, getAllBookDetail } from "@/services/giantIbisServiceCall";

/**
 * 1. Check payment status with Acelida API
 * 2. If payment success please confirm the seat
 * 3. 
 * 
 */
export const dynamic = 'force-dynamic'; // If you need dynamic routing

export async function GET(request, { params }) {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const refCode = searchParams.get('refCode');
    const refCodeRoundTrip = searchParams.get('refCodeRoundTrip');
    const tripType = searchParams.get('tripType');

    const paymentStatus = await paymentService.checkPaymentStatus(id);
    console.log("paymentStatus: ", paymentStatus?.result?.paymentMethod);

    if (paymentStatus?.result.errorDetails != 'SUCCESS') {
        return NextResponse.json({
            status: false,
            message: "Your payment was not successful. Please try again."
        }, { status: 400 });
    }

    let paymentMethod = paymentStatus?.result?.paymentMethod; //khqr

    if (tripType != "round-trip") {

        let booklist = await getAllBookDetail();
        let bookOneWay = booklist?.data?.filter((item, index) => item.ref_code === refCode);

        if (bookOneWay?.length <= 0) {
            return NextResponse.json({
                status: false,
                message: "Ref code not found."
            }, { status: 400 });
        }

        const confirmRefOneWay = await confirmBooking(refCode);
        booklist = await getAllBookDetail();
        bookOneWay = booklist?.data?.filter((item, index) => item.ref_code === refCode);

        const confirmBookedOneWay = await paymentService.confirmOneWay(bookOneWay, refCode, confirmRefOneWay?.status, paymentMethod);

        return NextResponse.json({
            status: true,
            message: "Retrive route detail successfull.",
            data: confirmBookedOneWay,
        })
    }

    // round trip

    let booklist = await getAllBookDetail();

    let bookOneWay = booklist?.data?.filter((item, index) => item.ref_code === refCode);
    let bookRoundTrip = booklist?.data?.filter((item, index) => item.ref_code === refCodeRoundTrip);

    if (bookOneWay?.length <= 0 || bookRoundTrip?.length <= 0) {
        return NextResponse.json({
            status: false,
            message: "Ref code not found."
        }, { status: 400 });
    }

    const confirmRef = await confirmBooking(refCode);
    const confirmRefRoundTrip = await confirmBooking(refCodeRoundTrip);

    booklist = await getAllBookDetail();
    bookOneWay = booklist?.data?.filter((item, index) => item.ref_code === refCode);
    bookRoundTrip = booklist?.data?.filter((item, index) => item.ref_code === refCodeRoundTrip);
    
    let isConfirm = confirmRef?.status && confirmRefRoundTrip?.status

    console.log("is confirm: ", isConfirm);


    const confirmRoundTrip = await paymentService.confirmRoundTrip(bookOneWay, bookRoundTrip, refCode, refCodeRoundTrip, isConfirm, paymentMethod);

    return NextResponse.json({
        status: true,
        message: "Retrive route detail successfull.",
        data: { ...confirmRoundTrip },
    })

}