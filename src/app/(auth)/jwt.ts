import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export function signWithAccessToken(payload: any){
    const token = jwt.sign(payload, 'secret' , {expiresIn: '1h'})
    return token
}


export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, 'secret');
        return decoded;
    } catch (err) {
        console.log(err);
        return new NextResponse('jwtVerify failed');
    }
}
