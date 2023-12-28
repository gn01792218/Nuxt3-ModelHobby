import { type Model } from "~/types/model"
export default ()=>{
    async function getMyModels():Promise<Model[]>{
        const { data, error } =await useFetch('/api/myModels')
        if(error.value) throw createError({...error.value, message:"資料異常"})
        return data.value as unknown as Model[]
    }
    return {
        //data
        //methods
        getMyModels
    }
}