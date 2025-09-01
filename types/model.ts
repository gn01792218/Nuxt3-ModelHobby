import { type PurchaseInfo } from "./purchaseInfo"
import { type ModelFinishInfo } from "./finishInfo"

export enum Currency{
    RMB = 'rmb',
    TW = 'tw'
}
export enum SizeUnit{
    MM = "mm",
    CM = "cm"
}
export enum ModelBrand{
    TRUMPETER = '小號手_Tumpeter',
    TRUMPETER_HOBBYBOSS = '小號手_HobbyBoss',
    ACADEMY = '愛德美_Academy',
    ITALERI = '義大利_Italeri',
    TAMIYA = '田宮_Tamiya',
    HASEGAWA = '長谷川_Hasegawa',
    S_MODEL = '六分儀_S-Model',
    MODEL_4D = '4D模型_4D-Model',
    MODELCOLLECT = '搜模閣_Modelcollect',
    FLVHAWK = '鷹翔_Flvhawk',
    ZVEZDA = '紅星_Zvezda',
    DRAGON = '威龍_Dragon',
    SPECIALHOBBY = 'SpecialHobby',
    LS = "株式會社LS_Sun Light",
    BANDAI = '萬代_Bandai',
    OTHER = '其他_未知品牌'
}
export enum ModelScale{
    S144="1:144",
    S100="1:100",
    S72="1:72",
    S48="1:48",
    S35="1:35",
}
export enum ModelType{
    戰車與車輛 = "戰車與車輛",
    飛機 = "飛機",
    船艦 = "船艦",
    火炮 = "火炮",
    兵人 = "兵人",
    科幻 = "科幻",
    工具 = "工具",
    顏料 = "顏料",
    場景 = "場景與配件",
    成品模型 = "成品模型",
    公仔手辦 = "公仔手辦"
}
export enum ModelStatus{
    未入庫,
    未組裝,
    已組裝,
    完成品
}
export enum Ecommerce{
    淘寶 = "淘寶",
    蝦皮 = "蝦皮",
    露天 = "露天",
    拚多多 = "拚多多",
    實體店面 = "實體店面"
}
export enum SearchModelType{
    Gallery,
    MyModel
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

export declare interface Model{
    id:number,
    userId:string,
    name_zh:string,
    name_en:string,
    status:ModelStatus,
    article_number?:string,
    brand?:ModelBrand,
    scale?:ModelScale,
    type?:ModelType,
    size?:ModelSize,
    main_img?:string,
    panting_guid?:string[]
    imgs?:string[],
    PD?:Date, //生產日期
    purchase_infos?:PurchaseInfo[]
    finish_infos:ModelFinishInfo[]
}

