import { type } from "os";

export type orderType = {
  id:number,title: string,created_at:string,price:number,desc:string
  };
export type TOption = {title: string; additionalPrice: number }
export type TProduct = {
    id: number; 
    title: string; 
    desc?: string;
    img?: string; 
    user_id: number,
    options: TOption[],
    price: number, quantity: number
  };

 export type Product1 = TProduct & 
 {pizzas_id?: number,
};
export type TUser = {
   name?: string, user_id?: number, 
}
