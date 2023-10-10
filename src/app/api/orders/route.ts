import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";

type Product = {
    id: number; title: string; desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };

export const GET = async (request: NextResponse) => {
  try {
    const { data, error } = await supabase.from('orders').select('*')

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
 
  export const POST = async (request: NextResponse,) => {
    const { price, desc } = await request.json(); 
    try {
      const { data, error } = await supabase.from('orders').insert([
        {
        desc,
        price
        }
      ]) 
      return new NextResponse(JSON.stringify("Order has been created"), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  