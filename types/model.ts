export enum Currency{
    RMB = 'rmb',
    TW = 'tw'
}
export enum SizeUnit{
    MM = "mm",
    CM = "cm"
}
export enum ModelBrand{
    TRUMPETER = '小號手',
    TRUMPETER_HOBBYBOSS = '小號手_HOBBYBOSS',
    ACADEMY = '愛德美',
    TAMIYA = '田宮',
    HASEGAWA = '長谷川',
    S_MODEL = '六分儀',
    FLVHAWK = '鷹翔',
    BANDAI = '萬代'
}
export enum ModelScale{
    S144="1:144",
    S72="1:72",
    S48="1:48",
    S35="1:35",
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
export declare interface Price{
    currency:Currency,
    amount:number,
}
export declare interface PurchaseInfo{
    e_commerce_name:Ecommerce,
    price:Price,
    shop_name?:string,
    purchase_date?:Date,
}
export declare interface Model{
    id:string | number,
    name:ModelName,
    status:ModelStatus,
    article_number?:string,
    brand?:ModelBrand,
    scale?:ModelScale,
    type?:ModelType,
    size?:ModelSize,
    imgs?:string[],
    PD?:Date, //生產日期
    purchaseInfo?:PurchaseInfo
}

