import { useMyModelStore } from "~/store/useMyModelStore";
import useMyToast from "../useMyToast";

export default () => {
  const { apiBaseUrl } = useRuntimeConfig().public
  const { setLoadingState } = useMyModelStore()
  const { sendToast } = useMyToast()

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const isFormData = body instanceof FormData;
    try{
      const data = await $fetch(url, {
        baseURL:apiBaseUrl as string,
        method,
        body:isFormData ? body : JSON.stringify(body)
      })
      return data as unknown as any;
    }catch(error:any){
      sendToast({ 
        title:'請求發生錯誤,請稍後再嘗試',
        // description:`${error.value.response?._data.message}`,
        icon:'i-heroicons-exclamation-circle-16-solid',
        color:'red',
        timeout:0
       })
       setLoadingState(false)
    }
  }
 
  return {
    //data
    //methods
    fetchApiBase
  };
};
