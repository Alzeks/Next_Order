'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RootState } from '../../store/toolkit'
import { useAppSelector } from "../../store/hook";
import Checkout from "./Checkout";
import { useAppDispatch } from "@/store/hook";
import { cartCounter } from '@/store/cartSlice'
import { TProduct, Product1 } from "@/types"; 

const CartPage = () => {
  const user = useAppSelector((state: RootState) => state.cart.user)
  const [data, setData] = useState<TProduct[]>([]);//usefect2
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);//usefect2
  const [reload, setReload] = useState(0)
  const dispatch = useAppDispatch();

  useEffect(() => {          //usefect2
    setIsLoading(true)
    fetch(`/api/cart/${user.user_id}`, {cache: "no-store",})
     .then((res) => res.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
  }, [reload])
  
  dispatch(cartCounter(data?.length))
  const deletePizza = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/cart/${id}`,
      { method: 'DELETE', })
    setReload((prev) => prev + 1);//useeffect2
   // mutate();
    return res.json()
  };
  if(isLoading)return <div>...Loading</div>
  
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {data?.length != 0 ? data?.map((pizza: Product1) =>
          <div key={pizza.id} className="flex items-center justify-between mb-4">
            <Image src={pizza.img as string} alt="" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">{pizza.title} </h1>
              <span></span>
            </div>
            <div className="flex flex-col items-center"><div>quantity</div><div>{pizza.quantity}</div></div>
            <h2 className="font-bold ">{pizza.price}$</h2>
            <span className="cursor-pointer" onClick={() => deletePizza(pizza.id)}>X</span>
          </div>) :
          <div className="text-lg text-bold">Cart is emty</div>
        }
      </div>

      <Checkout pizzas = {data} />
    </div >
  );
};

export default CartPage;
