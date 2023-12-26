import { 
    type Model,
    ModelBrand, 
    ModelScale,
    ModelType,
    ModelStatus,
    Currency,
    SizeUnit,
    Ecommerce
} from "~/types/model";

export const model: Model[] = [
  {
    name: {
      zh: '德國280毫米列車砲 K5 (E) "列奧波德"',
      en: "German 280mm K5(E) Railway Gun Leopold",
    },
    article_number:'82903',
    brand:ModelBrand.小號手_HOBBYBOSS,
    scale:ModelScale.S72,
    type:ModelType.戰車,
    size:{
        unit:SizeUnit.MM,
        width:46.8,
        length:445,
    },
    status:ModelStatus.未組裝,
    PD:new Date('2018'),
    purchaseData:{
        e_commerce_name:Ecommerce.淘寶,
        price:{
            currency:Currency.RMB,
            amount:124.14
        },
        purchase_date:new Date('2023')
    }
  },
    {
    name: {
      zh: '德國"卡爾"砲早期型',
      en: "Morser KARL-Gerat 040/041 Initial Version",
    },
    article_number:'82904',
    brand:ModelBrand.小號手_HOBBYBOSS,
    scale:ModelScale.S72,
    type:ModelType.戰車,
    size:{
        unit:SizeUnit.MM,
        width:56.6,
        length:159,
    },
    status:ModelStatus.未組裝,
    PD:new Date('2020'),
    purchaseData:{
        e_commerce_name:Ecommerce.淘寶,
        price:{
            currency:Currency.RMB,
            amount:97
        },
        purchase_date:new Date('2023')
    }
  },
];
