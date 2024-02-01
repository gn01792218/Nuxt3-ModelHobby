import { type Model, type ModelSize, type PurchaseInfo, type ModelFinishInfo } from "~/types/model";
import { type CreatePurchaseInfoRequest, type UpdatePurchaseInfoRequest } from "@/types/purchaseInfo"

export default () => {
  //MyModel API
  async function getMyModels() {
    const { data, error } = await useFetch("/api/myModels");
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as Model[];
  }
  async function getMyModel(id:number) {
    const { data, error } = await useFetch(`/api/myModels/${id}`);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as Model;
  }
  async function addMyModel(payload: Model) {
    const { data, error } = await useFetch("/api/myModels", {
      method: "post",
      body: payload,
    });
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as Model;
  }
  async function updateMyModel(modelId:number ,payload: Model) {
    const r = await fetch(`/api/myModels/${modelId}`, {
      method: "put",
      body: JSON.stringify(payload),
    });
    return r as unknown as Model;
  }
  async function deleteMyModel(modelId: number) {
    const r = await fetch(`/api/myModels/${modelId}}`, {
      method: "delete",
    });
    if (r.ok) return true;
    return false;
  }
  //Model Size API
  async function getModelSize(modelId: number) {
    const { data, error } = await useFetch(`/api/myModels/ModelSize/${modelId}`);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as ModelSize;
  }

  async function addMyModelsSize(modelId: number, payload: ModelSize) {
    const r = await fetch(`/api/myModels/ModelSize/${modelId}`, {
      method: "post",
      body: JSON.stringify(payload),
    });
    return r as unknown as ModelSize;
  }
  async function updateMyModelsSize(modelId: number, payload: ModelSize) {
    const r = await fetch(`/api/myModels/ModelSize/${modelId}`, {
      method: "put",
      body: JSON.stringify(payload),
    });
    return r as unknown as ModelSize;
  }
  //PurchaseInfo API
  async function getModelPurchaseInfos(modelId: number) {
    const { data, error } = await useFetch(`/api/myModels/PurchaseInfo/${modelId}`);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as PurchaseInfo[];
  }
  async function addMyModelPurchaseInfo(modelId: number, payload: CreatePurchaseInfoRequest) {
    const { data, error } = await useFetch(`/api/myModels/PurchaseInfo/${modelId}`, {
      method: "post",
      body: JSON.stringify(payload),
    });
    if(error.value) throw createError({ ...error.value, message: "資料異常" })
    return data.value as unknown as PurchaseInfo;
  }
  async function updateMyModelPurchaseInfo(purchaseInfoId: number, payload: UpdatePurchaseInfoRequest) {
    const { data, error } = await useFetch(`/api/myModels/PurchaseInfo/${purchaseInfoId}`, {
      method: "put",
      body: JSON.stringify(payload),
    });
    if(error.value) throw createError({...error.value, message:'資料異常'})
    return data.value as unknown as PurchaseInfo;
  }
   async function deleteMyModelPurchaseInfo(purchaseInfoId: number) {
    const { data, error } = await useFetch(`/api/myModels/PurchaseInfo/${purchaseInfoId}`, {
      method: "delete",
    });
    if(error.value) throw createError({...error.value, message:'資料異常'})
    return data.value as unknown as PurchaseInfo;
  }
   //ModelFinishInfo API
  async function getModelFinishInfo(modelId: number) {
    const { data, error } = await useFetch(`/api/myModels/ModelFinishInfo/${modelId}`);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as ModelFinishInfo;
  }
  async function addMyModelFinishInfo(modelId: number, payload: ModelFinishInfo) {
    const r = await fetch(`/api/myModels/ModelFinishInfo/${modelId}`, {
      method: "post",
      body: JSON.stringify(payload),
    });
    return r as unknown as ModelFinishInfo;
  }
  async function updateMyModelFinishInfo(modelId: number, payload: ModelFinishInfo) {
    const r = await fetch(`/api/myModels/ModelFinishInfo/${modelId}`, {
      method: "put",
      body: JSON.stringify(payload),
    });
    return r as unknown as ModelFinishInfo;
  }
  return {
    //data
    //methods
    getMyModels,
    getMyModel,
    addMyModel,
    updateMyModel,
    deleteMyModel,
    getModelSize,
    addMyModelsSize,
    updateMyModelsSize,
    getModelPurchaseInfos,
    addMyModelPurchaseInfo,
    updateMyModelPurchaseInfo,
    deleteMyModelPurchaseInfo,
    getModelFinishInfo,
    addMyModelFinishInfo,
    updateMyModelFinishInfo
  };
};
