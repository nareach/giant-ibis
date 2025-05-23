import { NextResponse } from "next/server";
import { hotelService } from "../../service/hotel.service";

export async function GET(request, { params }) {

    const { id } = await params;

    const data = await hotelService.findHotelBycityId(id);

    return NextResponse.json({
        status: true,
        data: Array.isArray(data?.data) ? data?.data : [],
    })
}