import { NextResponse } from "next/server";
import { readConfigFile } from "typescript";

export function middleware(request:Request){
    const regex = new RegExp('/api/*')
//if(request.url.includes('/api/'))
if(regex.test(request.url)){}

};
export const config = {matcher: '/api1/:path*'}//for 
