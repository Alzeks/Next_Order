import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";

type Product = {
    id: number;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };

export const GET = async (request: NextResponse) => {
  try {
    const { data, error } = await supabase.from('cart').select('*')//.eq('post_id', '6')

    return new NextResponse(JSON.stringify(data), { status: 200 });
    //return new NextResponse(data , { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
 
export const POST = async (request: NextResponse) => {
  const { desc, img, title, options, price, quantity, user_id} = await request.json();
  try {
    const { data, error } = await supabase.from('cart').insert([
      {
       img: img,
       title: title,
       options: options ,
       price: price,
       quantity: quantity,
       user_id: user_id
      }
    ]).select()

    return new NextResponse(JSON.stringify('CartItem created'), { status: 200 });
  } catch (error) {console.log('66666',error);

    return new NextResponse("Database Error", { status: 500 });
  }
};


 