import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";
//import { TProduct } from "@/types";

export const GET = async (request: Request, { params: {id} }:{params: {id: string}}) => {
 
  try {
    const { data , error } = await supabase.from('pizzas').select('*').eq('id', id)

    return new NextResponse(JSON.stringify(data), { status: 200 });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
