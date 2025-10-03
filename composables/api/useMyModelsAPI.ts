import { type Model, type ModelSize, type PurchaseInfo, type ModelFinishInfo } from "~/types/model";
import { type CreatePurchaseInfoRequest, type UpdatePurchaseInfoRequest } from "@/types/purchaseInfo"
import useApiBase from "./useApiBase";

export default () => {
  const { fetchApiBase, useFetchApi } = useApiBase()
  const { user } = useUser()
  //MyModel API
  async function getAllModels() {
    return await useFetchApi(`/api/myModels`,"get");
    // return models as Model[];
  }
  async function getMyModels() {
    const models = await fetchApiBase(`/api/myModels/${user.value?.id}`,"get");
    return models as Model[];
  }
  async function getMyModel(id:number) {
    const model = await fetchApiBase(`/api/myModels/MyModel/${id}`,"get");
    return model as Model;
  }
  async function addMyModel(payload: Model) {
    const model = await fetchApiBase("/api/myModels","post",payload);
    return model as Model;
  }
  async function updateMyModel(modelId:number ,payload: Model) {
    const model = await fetchApiBase(`/api/myModels/MyModel/${modelId}`,"put",payload);
    return model as Model;
  }
  async function updateMyModelUserId(modelId:number ,payload: {userId:string}) {
    const model = await fetchApiBase(`/api/myModels/${modelId}`,"put",payload);
    return model as Model;
  }
  async function deleteMyModel(modelId: number) {
    const model = await fetchApiBase(`/api/myModels/MyModel/${modelId}}`, "delete");
    return model as Model;
  }
  //Model Size API
  async function getModelSize(modelId: number) {
    const modelSize = await fetchApiBase(`/api/myModels/ModelSize/${modelId}`,"get");
    return modelSize as ModelSize;
  }

  async function addMyModelsSize(modelId: number, payload: ModelSize) {
    const modelSize = await fetchApiBase(`/api/myModels/ModelSize/${modelId}`, "post",payload);
    return modelSize as ModelSize;
  }
  async function updateMyModelsSize(modelId: number, payload: ModelSize) {
    const modelSize = await fetchApiBase(`/api/myModels/ModelSize/${modelId}`,"put",payload);
    return modelSize as ModelSize;
  }
  //PurchaseInfo API
   async function getPurchaseInfos() {
    const purchaseInfos = await fetchApiBase(`/api/myModels/PurchaseInfo`, "get");
    return purchaseInfos as PurchaseInfo[];
  }
  async function getModelPurchaseInfos(modelId: number) {
    const purchaseInfos = await fetchApiBase(`/api/myModels/PurchaseInfo/${modelId}`, "get");
    return purchaseInfos as PurchaseInfo[];
  }
  async function addMyModelPurchaseInfo(modelId: number, payload: CreatePurchaseInfoRequest) {
    const purchaseInfo = await fetchApiBase(`/api/myModels/PurchaseInfo/${modelId}`, "post",payload);
    return purchaseInfo as PurchaseInfo;
  }
  async function updateMyModelPurchaseInfo(purchaseInfoId: number, payload: UpdatePurchaseInfoRequest) {
    const purchaseInfo = await fetchApiBase(`/api/myModels/PurchaseInfo/${purchaseInfoId}`, "put",payload);
    return purchaseInfo as PurchaseInfo;
  }
   async function deleteMyModelPurchaseInfo(purchaseInfoId: number) {
    const purchaseInfo = await fetchApiBase(`/api/myModels/PurchaseInfo/${purchaseInfoId}`, "delete");
    return purchaseInfo as PurchaseInfo;
  }
   //ModelFinishInfo API
  async function getModelFinishInfo(modelId: number) {
    const finishInfo = await fetchApiBase(`/api/myModels/ModelFinishInfo/${modelId}`,"get");
    return finishInfo as ModelFinishInfo;
  }
  async function addMyModelFinishInfo(modelId: number, payload: ModelFinishInfo) {
    const finishInfo = await fetchApiBase(`/api/myModels/ModelFinishInfo/${modelId}`, "post",payload)  
    return finishInfo as ModelFinishInfo;
  }
  async function updateMyModelFinishInfo(modelId: number, payload: ModelFinishInfo) {
    const finishInfo = await fetchApiBase(`/api/myModels/ModelFinishInfo/${modelId}`, "put",payload);
    return finishInfo as ModelFinishInfo;
  }
  async function deleteMyModelFinishInfo(finishInfoId: number) {
    const finishInfo = await fetchApiBase(`/api/myModels/ModelFinishInfo/${finishInfoId}`, "delete");
    return finishInfo as ModelFinishInfo;
  }
  return {
    //data
    //methods
    getAllModels,
    getMyModels,
    getMyModel,
    addMyModel,
    updateMyModel,
    deleteMyModel,
    getModelSize,
    addMyModelsSize,
    updateMyModelsSize,
    getPurchaseInfos,
    getModelPurchaseInfos,
    addMyModelPurchaseInfo,
    updateMyModelPurchaseInfo,
    updateMyModelUserId,
    deleteMyModelPurchaseInfo,
    getModelFinishInfo,
    addMyModelFinishInfo,
    updateMyModelFinishInfo,
    deleteMyModelFinishInfo
  };
};
