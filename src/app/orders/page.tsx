'use client'

import { useEffect, useState } from "react";
import { orderType } from "@/types";
import { ImageError } from "next/dist/server/image-optimizer";
import React from "react";
import Image from "next/image"
import DeleteButton from "./DeleteButton";
import PizzaCreate from "./PizzaCreate";
import { useSession } from "next-auth/react";

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/orders', {cache: "no-store",})
  if (!res.ok) {throw new Error("Failed to fetch orders");}
  return res.json();
}
//const OrdersPage = async() => {
  const OrdersPage = () => {
  const {data: session} =useSession();
  const [data, setData] = useState<orderType[]>([])
  const [changer, setChanger] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  //const data: orderType[] = await getData() 
  useEffect(() => {setIsLoading(true)
    fetch('/api/orders',{
headers: {authorization: `bearer ${session?.user.accessToken}`},//?
    } 
    ).then((res) => res.json()).then((data) => {
        setData(data);setIsLoading(false)
      })
  }, [changer])

   const deleteOrder = async(id: number)=>{
    setIsLoading(true)
  const res = await fetch(`/api/orders/${id}`,
  {method: 'DELETE'})
setChanger((prev: number)=>prev + 1)
setIsLoading(false)
  //return res.json()
   }
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <PizzaCreate/>
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <div >...Processing</div> : 
          data?.map((order: orderType) =>
            <tr className="text-sm md:text-base bg-red-50">
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">{order.created_at}</td>
              <td className="py-6 px-1">{order.price}</td>
              <td className="hidden md:block py-6 px-1">{order.desc}</td>
              <td className="relative py-6 px-1">On the way (approx. 10min)...
                <div className="absolute right-2 top-2 w-4 h-4  md:w-4 md:h-4 top-2"
                onClick={()=>deleteOrder(order.id)}>
                  <Image src="/close.png" alt="" fill /> 
                 </div>
              </td>
            </tr>
          )}
         
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
