import {
  type Model,
  ModelBrand,
  ModelScale,
  ModelType,
  ModelStatus,
  Currency,
  SizeUnit,
  Ecommerce,
} from "~/types/model";

export const model: Model[] = [
  {
    id: 1,
    name_zh:'德國280毫米列車砲 K5 (E) "列奧波德"',
    name_en: "German 280mm K5(E) Railway Gun Leopold",
    article_number: "82903",
    brand: ModelBrand.TRUMPETER_HOBBYBOSS,
    scale: ModelScale.S72,
    type: ModelType.戰車,
    size: {
      unit: SizeUnit.MM,
      width: 46.8,
      length: 445,
    },
    status: ModelStatus.未組裝,
    PD: new Date("2018"),
    purchaseInfos: {
      e_commerce_name: Ecommerce.淘寶,
      price: {
        currency: Currency.RMB,
        amount: 124.14,
      },
      purchase_date: new Date("2023"),
    },
  },
  {
    id: 2,
    name_zh:'德國"卡爾"砲早期型',
    name_en: "Morser KARL-Gerat 040/041 Initial Version",
    article_number: "82904",
    brand: ModelBrand.TRUMPETER_HOBBYBOSS,
    scale: ModelScale.S72,
    type: ModelType.戰車,
    size: {
      unit: SizeUnit.MM,
      width: 56.6,
      length: 159,
    },
    status: ModelStatus.未組裝,
    PD: new Date("2020"),
    purchaseInfos: {
      e_commerce_name: Ecommerce.淘寶,
      price: {
        currency: Currency.RMB,
        amount: 97,
      },
      purchase_date: new Date("2023"),
    },
  },
  {
    id: 3,
    name_zh:'P-40B/C "戰鷹" 戰鬥機',
    name_en: "P-40B/C WARHAWK",
    article_number: "01632",
    brand: ModelBrand.TRUMPETER,
    scale: ModelScale.S72,
    type: ModelType.飛機,
    size: {
      unit: SizeUnit.MM,
      width: 158,
      length: 134,
    },
    status: ModelStatus.已組裝,
    PD: new Date("2011"),
    purchaseInfos: {
      e_commerce_name: Ecommerce.淘寶,
      price: {
        currency: Currency.RMB,
        amount: 52.8,
      },
      purchase_date: new Date("2023"),
    },
  },
];
export default model;
