'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { RootState } from '../store/toolkit'
import { useAppDispatch, useAppSelector } from "../store/hook";
import { cartCounter } from "@/store/cartSlice";

const CartIcon = () => {
  const { quantity } = useAppSelector((state: RootState) => state.cart)
  const [cartItems, setCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/cart/${session?.user.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data?.length)
      }).finally(() => setIsLoading(false))
  }, [quantity])
  dispatch(cartCounter(cartItems))

  return (<div className="flex gap-2">
    {session?.user?.role === 'admin' && (<Link href={'/orders'}>Orders</Link>)}

    <div>{session && session.user.name}</div>
    {session?.user ? (<button onClick={() => signOut()}>SignOut</button>) : (<Link href="/login">Login</Link>)}

    <Link href="/cart" className="flex items-center gap-1">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      <div className="relative">Cart
        {!isLoading ? <div className="absolute bottom-3 left-7 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
          {quantity ? quantity : 0}
        </div> :
          <div className="absolute bottom-3 left-7  rounded-full bg-yellow-500 flex items-center justify-center text-xs"
          >..Load</div>}
      </div>
    </Link>
  </div>
  );
};

export default CartIcon;
