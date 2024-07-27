// middleware/authMiddleware.ts

import { NextResponse, type NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';
import { parse } from 'cookie';
import { GetDetailUser } from '@/apis/user';

interface DecodedToken {
  id: string;
  exp: number;
  isAdmin: boolean;
}

export async function authMiddleware(req: NextRequest) {
  const cookies = parse(req.headers.get('cookie') || '');
  const accessToken = cookies.access_Token || null;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      const refreshToken = cookies.refresh_Token || null;

      if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
      }

      const response = await fetch(`${process.env.API_BASE_URL}/api/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const { accessToken: refreshedToken } = await response.json();

      if (refreshedToken) {
        // Lấy thông tin chi tiết của người dùng với mã thông báo mới
        const userResponse = await GetDetailUser(decodedToken.id, refreshedToken);
        const user = await userResponse.json();

        if (user.isAdmin) {
          // Lưu thông tin người dùng vào cookie
          const response = NextResponse.next();
          response.cookies.set('user', JSON.stringify({ id: user.id, isAdmin: user.isAdmin, token: refreshedToken }));
          return response;
        } else {
          // Lưu thông tin người dùng vào cookie
          const response = NextResponse.next();
          response.cookies.set('user', JSON.stringify({ id: user.id, isAdmin: user.isAdmin, token: refreshedToken }));
          return response;
        }
      } else {
        return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
      }
    } else {
      // Lấy thông tin chi tiết của người dùng với mã thông báo hợp lệ
      const userResponse = await GetDetailUser(decodedToken.id, accessToken);
      const user = await userResponse.json();

      if (user.isAdmin) {
        // Lưu thông tin người dùng vào cookie
        const response = NextResponse.next();
        response.cookies.set('user', JSON.stringify({ id: user.id, isAdmin: user.isAdmin, token: accessToken }));
        return response;
      } else {
        // Lưu thông tin người dùng vào cookie
        const response = NextResponse.next();
        response.cookies.set('user', JSON.stringify({ id: user.id, isAdmin: user.isAdmin, token: accessToken }));
        return response;
      }
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
  }
}
