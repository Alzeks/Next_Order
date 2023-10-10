import Price from "@/components/Price";
import { singleProduct } from "@/data";
import { TProduct } from "@/types";
import Image from "next/image";
import React from "react";

async function getData(id: number) {
  const res = await fetch(`http://localhost:3000/api/pizzas/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch datas");
  }
  return res.json();
}

const SingleProductPage = async ({ params: {id} }:{params: {id: number}} ) => {
 
  const [data] = await (getData(id)) as TProduct[];
  // const productData: Promise<product> = getProduct(id); const usertData: Promise<user> = getUser()
  // const [product, user] = await Promise.all([productData, usertData])

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {data.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={data.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{data.title}</h1>
        <p>{data.desc}</p>
        {/* <Price price={singleProduct.price} id={singleProduct.id} options={singleProduct.options}/> */}
        <Price product={data} />
      </div>
    </div>
  );
};

export default SingleProductPage;
