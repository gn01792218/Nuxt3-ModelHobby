import { useMyModelStore } from "~/store/useMyModelStore";
import useMyToast from "../useMyToast";

export default () => {
  const { apiBaseUrl } = useRuntimeConfig().public
  const { setLoadingState } = useMyModelStore()
  const { sendToast } = useMyToast()

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const isFormData = body instanceof FormData;
    const { data, error } = await useFetch(url, {
      baseURL:apiBaseUrl,
      method,
      body:isFormData ? body : JSON.stringify(body)
    });
    if (error.value) {
      sendToast({ 
        title:'請求發生錯誤,請稍後再嘗試',
        description:`${error.value.response?._data.message}`,
        icon:'i-heroicons-exclamation-circle-16-solid',
        color:'red',
        timeout:0
       })
       setLoadingState(false)
      throw createError({ ...error.value, message:error.value.message });
    }
    return data.value as unknown as any;
  }
 
  return {
    //data
    //methods
    fetchApiBase
  };
};
