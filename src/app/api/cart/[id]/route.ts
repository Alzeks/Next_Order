import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";
import { StripeIssuingCardNumberDisplayElement } from "@stripe/stripe-js";

export const DELETE = async (request: NextResponse, { params }: any) => {
    const id = params.id 
      try {
        const { data, error } = await supabase.from('cart').delete()
        .eq('id', id)
        return new NextResponse(JSON.stringify(data), { status: 200 });
      } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
      }
    };
  
export const GET = async (request: Request, { params: {id} }:{params: {id: number}}) => {
  try {
    const { data, error } = await supabase.from('cart').select().eq('user_id', id)

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};