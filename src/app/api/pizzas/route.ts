import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";

export const GET = async (request:  Request) => {
  try {
    const { data, error } = await supabase.from('pizzas').select('*')//.eq('post_id', '6')

    return new NextResponse(JSON.stringify(data), { status: 200 });
    
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const { title,desc,img,price } = await request.json();
  try {
    const { data, error } = await supabase.from('pizzas').insert([
      {
        title: title,
              desc: desc,
              img: img,
              price: price,
              options: [{"title": "Small", "additionalPrice": 0},
                {"title": "Medium", "additionalPrice": 4},
                {"title": "Large", "additionalPrice": 6}]
      }
    ])//.select()
  console.log(data);
    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (err) {console.log(err);
    return new NextResponse("Database Error", { status: 500 });
  }
};


