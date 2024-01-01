
import { type Model, type ModelSize, type PurchaseInfo } from "~/types/model"

export default ()=>{
    async function getMyModels():Promise<Model[]>{
        const { data, error } =await useFetch('/api/myModels')
        if(error.value) throw createError({...error.value, message:"資料異常"})
        return data.value as unknown as Model[]
    }
    async function addMyModels(payload:Model):Promise<Model>{
        const { data, error } =await useFetch('/api/myModels',{
            method:'post',
            body:payload
        })
        if(error.value) throw createError({...error.value, message:"資料異常"})
        return data.value as unknown as Model
    }
     async function addMyModelsSize(modelId:number,payload:ModelSize):Promise<ModelSize>{
        const r =await fetch(`/api/myModels/ModelSize/${modelId}`,{
            method:'post',
            body:JSON.stringify(payload)
        })
        return r as unknown as ModelSize
    }
    async function addMyModelPurchaseInfo(modelId:number,payload:PurchaseInfo):Promise<PurchaseInfo>{
        const r =await fetch(`/api/myModels/PurchaseInfo/${modelId}`,{
            method:'post',
            body:JSON.stringify(payload)
        })
        return r as unknown as PurchaseInfo
    }
    async function deleteMyModels(modelId:number):Promise<boolean>{
        const r = await fetch(`/api/myModels/${modelId}}`,{
            method:'delete'
        })
        if(r.ok) return true
        return false
    }
    return {
        //data
        //methods
        getMyModels,
        addMyModels,
        addMyModelsSize,
        addMyModelPurchaseInfo,
        deleteMyModels
    }
}