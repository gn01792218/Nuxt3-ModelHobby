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
    已入庫,
    未入庫,
    未拆封,
    已完成,
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
export declare interface Model{
    name:ModelName,
    articleNumber?:string,
    brand?:ModelBrand,
    scale?:ModelScale,
    type?:ModelType,
    price?:ModelPrice,
    status?:ModelStatus,
    size?:ModelSize,
    imgs?:string[],
    purchaseDate?:Date, //購買日期
    PD?:Date //生產日期
}

