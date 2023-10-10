'use client'
import Image from "next/image"



export default function DeleteButton({id,getData}: {id: number,getData: ()=>any}){ 
  const deleteOrder = async()=>{
    const res = await fetch(`http://localhost:3000/api/orders/${id}`,
    {method: 'DELETE'})
    getData();
    return res.json()
     }
return (
<div className="absolute right-2 top-2 w-4 h-4 md:w-4 md:h-4 top-2 
cursor-pointer hover:bg-red-200 hover:w-5 hover:h-5" 
>
  <Image src="/close.png" alt="" fill 
  onClick={deleteOrder}/>
</div>
)
}