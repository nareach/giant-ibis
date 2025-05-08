import { NextResponse } from "next/server";
import { cityService } from "../service/cities.service";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('originId');

    if(origin){

        const citiesOrigin= await cityService.findDestinationAvalableForOrigin(origin);
        return NextResponse.json({
            status: true,
            data: citiesOrigin
        })
    }
    
    const cities= await cityService.findAllCity();

    return NextResponse.json({
        status: true,
        data: cities?.data
    })
}