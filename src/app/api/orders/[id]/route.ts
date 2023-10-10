import { NextResponse } from "next/server";
import { supabase } from "@/db/supabase/connect";

export const DELETE = async (request: NextResponse, { params }: any) => {
    const id = params.id 
      try {
        const { data, error } = await supabase.from('orders').delete()
        .eq('id', id)
    
        return new NextResponse(JSON.stringify(data), { status: 200 });
      } catch (err) {
      
        return new NextResponse("Database Error", { status: 500 });
      }
    };