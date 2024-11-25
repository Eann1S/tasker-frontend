import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken');

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
};