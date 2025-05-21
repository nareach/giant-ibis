import { getPickUpList } from "@/services/giantIbisServiceCall";
import { NextResponse } from "next/server";
export const revalidate = false; 
export async function GET(request, { params }) {
    const { id } = await params;

    const getPickUpListData = await getPickUpList({ city_id: id });

    return NextResponse.json({
        status: true,
        data: getPickUpListData?.data
    })
}