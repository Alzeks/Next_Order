import { supabase } from '@/db/supabase/connect'
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
//import { signWithAccessToken } from "@/lib/jwt";


export const POST = async (request) => {//const username = url.searchParams.get('username')
  const { name, email, password } = await request.json();
  //try {
    const { data, error } = await supabase.from('users').select('')
      .eq('email', email)
    if (data.length) { return new NextResponse("user exist", { status: 401, }); }
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    async function userCreate() {
      //try {
        const { data, error } = await supabase.from('users').insert([
          {
            name: name,
            email: email,
            password: hashedPassword,
          }
        ]).select()
        console.log(data);
        return new NextResponse("User has been created", { status: 201, });

      // } catch (error) {
      //   return new NextResponse(err.message, { status: 500, });
      // }
    }; return userCreate();

  // } catch (error) {
  //   return new NextResponse(err.message, { status: 500, });
  // }
};
