import { NextResponse } from "next/server";
import { cityService } from "../service/cities.service";

export async function GET(request) {

    const cities= await cityService.findAllCity();

    return NextResponse.json({
        status: true,
        data: cities?.data
    })
}