import {supabase} from '@/db/supabase/connect'
import { NextResponse } from "next/server";

export const POST = async (request: NextResponse) => {
  const { email,password} = await request.json();
  
  try {
    const { data, error } = await supabase.from('users').select('')
    .eq('email', email)
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {console.log('66666',error);
  
    return new NextResponse("Database Error", { status: 500 });
  }
};