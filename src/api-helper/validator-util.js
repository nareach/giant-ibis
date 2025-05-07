import { NextResponse } from "next/server";

export const validateRoute = async ({ origin, destination, travelDate }) => {

    if (!origin || !destination || !travelDate) {
        return NextResponse.json(
            { error: 'Missing required parameters' },
            { status: 400 }
        );
    }

    return true;
}