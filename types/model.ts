export enum Currency{
    RMB,
    TW
}
export enum SizeUnit{
    MM,
    CM
}
export enum ModelBrand{
    小號手,
    小號手_HOBBYBOSS,
    愛德美,
    田宮,
    長谷川,
    六分儀,
    翔鷹,
    萬代
}
export enum ModelScale{
    S144,
    S72,
    S48,
    S35,
}
export enum ModelType{
    戰車,
    飛機,
    火炮,
    兵人,
    科幻,
    工具,
    顏料
}
export enum ModelStatus{
    未入庫,
    已入庫,
    未組裝,
    已組裝,
}
export enum Ecommerce{
    淘寶,
    蝦皮
}
export declare interface ModelSize{
    unit:SizeUnit,
    width:number,
    length:number,
    height?:number,
}
export declare interface ModelName{
    en?:string,
    zh?:string
}
export declare interface ModelPrice{
    currency:Currency,
    amount:number,
}
export declare interface PurchaseData{
    e_commerce_name:Ecommerce,
    price:ModelPrice,
    shop_name?:string,
    purchase_date?:Date,
}
export declare interface Model{
    id:string,
    name:ModelName,
    status:ModelStatus,
    article_number?:string,
    brand?:ModelBrand,
    scale?:ModelScale,
    type?:ModelType,
    size?:ModelSize,
    imgs?:string[],
    PD?:Date, //生產日期
    purchaseData?:PurchaseData
}

