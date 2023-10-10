'use client'

import { RootState } from '../../store/toolkit'
import { useAppSelector } from "../../store/hook";
import { Product } from '@/types';

export default function  Checkout ({pizzas}: {pizzas: Product[]}){
  const total = pizzas?.reduce((acc: number, pizza: Product)=> acc + pizza.price, 0)
  const desc = pizzas?.reduce((acc, pizza)=>{
    return acc + pizza.options + '//'
   }, '')
   
const checkout = async()=>{
  // const desc = pizzas.reduce((acc, pizza)=>{
  //   return acc + pizza.options + '//'
  //  }, '')
  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          desc: desc, price: total
      }),
    });
    const data = await res.json();
  } catch (err) { console.log('666666', err) }
}

    return(
        <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
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
          <span className="font-bold">{total}</span>
        </div>
       
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
        onClick={checkout}>
          CHECKOUT
        </button>
      </div>
    )
}