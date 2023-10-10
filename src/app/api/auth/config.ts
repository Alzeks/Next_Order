
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//import bcrypt from 'bcrypt'
import { signWithAccessToken } from "@/app/(auth)/jwt";
//import { cookies } from 'next/headers'
//import { NextRequest } from "next/server";
import GoggleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { GithubEmail } from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/db/supabase/connect";

declare module 'next-auth' {
  interface Session {
    //user: typeof User & {user_id: number,}
    user: User & { role: string, accessToken: string, id: number }
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    role: string, accessToken: string,
  }
}

export const authConfig: AuthOptions
  = {
    //adapter:Supabase,//?
    //session:{strategy:'jwt'},
  providers: [
    Credentials({
      credentials: { email: { label: "Username", type: "text", placeholder: "jsmith" }, password: { label: "Password", type: "password" } },

      async authorize(credentials, req) {
        
        const res = await fetch("http://localhost:3000/api/auth/login", {
          //cache: "no-store",
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email, password: credentials?.password
          })
        });
        if (!res.ok) { throw new Error("Failed to fetch data"); }

        const [user] = await res.json()
        //const user = {email: 'email', name: 'Alex', role: 'admin'}//await getData()
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const token = await signWithAccessToken({ username: user.username }); user.accessToken = token

          //res.setHeader('Set-Cookie', cookies.serialize('token', 'op', {maxAge: 60 * 60, sameSite: 'strict',path: '/',//http: 'only' }) )
          // cookies().set('name', 'lee',)// or cookies().set('name', 'lee2', { secure: true }) or cookies().set({name: 'name',value: 'lee', httpOnly: true,path: '/',})
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    GoggleProvider({
      clientId: '476839298790-v7gjcnh49hkhhfts0lg8bsno0q3skk6d.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    GitHubProvider({
      // clientId: HITHUB_ID,
      // clientSecret: HITHUB_SECRET
      clientId: '58237318493855b230dc',
      clientSecret: '3114602b3d50d7c9af8d5a3a4450304f8849e7f3'
    }),
  ],
  pages: { signIn: '/login' },//castom loginpage
  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log('token', token, 'user', user, 'ac', account, profile);
      //if(user)return {...token, token: user?.accessToken, role: user?.role, id: user.id }
      //   if(user){token.user_id = user.id,//}//,
      //   token.accessToken = user?.accessToken, token.role= user?.role}
      if (user) return { ...token, ...user }
      return token
    },
    async session({ session, token, user }) {
      console.log('session', session, '2token', token, 'user', user);
      // session.user.role = token.role,
      // session.user.accessToken = token.accessToken,
      //if(token){
      session.user = token as any     //}
      console.log('5', session);
      return session
      //return {...session, user: {...session.user, token: token.accessToken, role: token.role}}
    },
  },
  //session: {strategy: 'jwt'},
}
