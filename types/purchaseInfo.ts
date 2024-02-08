import { Ecommerce, Currency } from "./model"
export declare interface PurchaseInfo{
    id:number,
    e_commerce_name:Ecommerce,
    currency:Currency,
    price:number,
    amount:number,
    shop_name?:string,
    purchase_date?:Date,
}
export declare interface CreatePurchaseInfoRequest{
    e_commerce_name:Ecommerce,
    currency:Currency,
    price:number,
    amount:number,
    shop_name?:string,
    purchase_date?:Date,
}
export declare interface UpdatePurchaseInfoRequest{
    e_commerce_name?:Ecommerce,
    currency?:Currency,
    price?:number,
    amount?:number,
    shop_name?:string,
    purchase_date?:Date,
}

