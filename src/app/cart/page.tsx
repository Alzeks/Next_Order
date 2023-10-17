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

      {/* PAYMENT CONTAINER */}
      {/* <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal (3 items)</span>
          <span className="">$81.70</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">$81.70</span>
        </div>

        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end">
          CHECKOUT
        </button>
      </div> */}
      <Checkout pizzas = {data} />
    </div >
  );
};

export default CartPage;
