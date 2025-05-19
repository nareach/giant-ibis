import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CLIENT_URL } from './constant/constant';


export function middleware(request: NextRequest) {
    
    return NextResponse.next();
}