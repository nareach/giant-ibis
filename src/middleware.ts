import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { CLIENT_URL } from './constant/constant'

const WHITELISTED_ORIGINS = ["https://giant-ibis-14jkx6yzg-chento007s-projects.vercel.app/"]
const PUBLIC_API_PATHS = ['/api/assets']

export function middleware(request: NextRequest) {
    const origin = request.headers.get('referer')
    const pathname = request.nextUrl.pathname

    console.log({
        origin,
        pathname
    });


    if (PUBLIC_API_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next()
    }

    if (pathname.startsWith('/api')) {

        if (!origin) {
            return new NextResponse(null, {
                status: 403,
                statusText: 'Forbidden',
                headers: {
                    'Content-Type': 'text/plain',
                }
            })
        }

        const isWhitelisted = WHITELISTED_ORIGINS.some(whitelistedOrigin => {
            return origin === whitelistedOrigin
        })

        if (!isWhitelisted) {
            return new NextResponse(null, {
                status: 403,
                statusText: 'Forbidden',
                headers: {
                    'Content-Type': 'text/plain',
                }
            })
        }
    }

    return NextResponse.next()
}