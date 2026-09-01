import { Ecommerce, Currency } from "./model"
export declare interface PurchaseInfo{
    id:number,
    e_commerce_name:Ecommerce,
    currency:Currency,
    price:number,
    exchangeRate?:number|null,
    sellingPrice:number,
    sellingCurrency:Currency,
    sellingExchangeRate?:number|null,
    amount:number,
    shop_name?:string,
    purchase_date?:Date,
    sellingDate?:Date,
}
export declare interface CreatePurchaseInfoRequest{
    e_commerce_name:Ecommerce,
    currency:Currency,
    price:number,
    exchangeRate?:number|null,
    sellingPrice:number,
    sellingCurrency:Currency,
    sellingExchangeRate?:number|null,
    amount:number,
    shop_name?:string,
    purchase_date?:Date,
    sellingDate?:Date,
}
export declare interface UpdatePurchaseInfoRequest{
    e_commerce_name?:Ecommerce,
    currency?:Currency,
    price?:number,
    exchangeRate?:number|null,
    sellingPrice:number,
    sellingCurrency?:Currency,
    sellingExchangeRate?:number|null,
    amount?:number,
    shop_name?:string,
    purchase_date?:Date,
    sellingDate?:Date,
}

