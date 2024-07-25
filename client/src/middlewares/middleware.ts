// src/middleware.ts

import { NextResponse, type NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { parse } from 'cookie';
import {GetDetailUser} from '@/apis/user'
interface DecodedToken {
  id: string;
  exp: number;
  isAdmin: boolean;
}

export async function middleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const accessToken = cookies.access_Token || null;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      const refreshToken = cookies.refresh_Token || null;

      if (!refreshToken) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      const response = await fetch(`${process.env.API_BASE_URL}/api/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const { accessToken: refreshedToken } = await response.json();

      if (refreshedToken) {
        // Update the cookies or perform other actions as needed
        const userResponse = await GetDetailUser(decodedToken.id, refreshedToken)

        const user = await userResponse.json();

        if (user.isAdmin) {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/', req.url));
        }
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else {
      const userResponse = await GetDetailUser(decodedToken.id, accessToken)
      const user = await userResponse.json();

      if (user.isAdmin) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], // Adjust this to match your admin routes
};
