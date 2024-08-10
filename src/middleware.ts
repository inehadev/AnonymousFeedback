import { getToken } from "next-auth/jwt";
import {  NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export {default}  from "next-auth/middleware"
export {getToken} from "next-auth/jwt"

export async function middleware(request:NextRequest){
    const token =await getToken({req:request})
    const url = request.nextUrl

    if (token && (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/' || url.pathname.startsWith('/verify'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // if(!token && url.pathname.startsWith('/dashboard')){
    //     return NextResponse.redirect(new URL('/sign-in' , request.url));
    // }

    return NextResponse.next()
//    
 }

export const config ={
    matcher: ['/sign-in',
              '/sign-up',
              '/',
            //   '/dashboard/:paths*',
              '/verify/:paths*'
        ,]
}