"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { cartCountAdd, cartCounter } from "@/store/cartSlice";
import { RootState } from '../store/toolkit'
import { useAppSelector } from "../store/hook";
import { TProduct, TOption } from "@/types";

const Price = ({ product }: { product: TProduct }) => {
  const user = useAppSelector((state) => state.cart.user)
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (product.options ? product.price +
        product.options[selected].additionalPrice : product.price)
    );
  }, [quantity, selected,]); //product.options, product.price,]);

  const addCard = async () => {
    const options = product.title + ', ' + `${quantity}` + ', ' + product.options[selected].title
    try {
      const res = await fetch('http://localhost:3000/api/cart', {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: product.img, title: product.title, options: options,
          price: total, quantity: quantity, user_id: user.user_id
        }),
      })
      dispatch(cartCountAdd(1))
      //const data = await res.json()    
    } catch (err) { console.log('666666', err) }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)
      }</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.map((option: TOption, index: any) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500"
          onClick={addCard}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
