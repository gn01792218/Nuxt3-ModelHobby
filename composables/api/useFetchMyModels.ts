import { type Model } from "~/types/model"
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
        deleteMyModels
    }
}