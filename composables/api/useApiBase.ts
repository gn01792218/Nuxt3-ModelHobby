import { useMyModelStore } from "~/store/useMyModelStore";

export default () => {
  const toast = useToast()
  const { apiBaseUrl } = useRuntimeConfig().public
  const { setLoadingState } = useMyModelStore()

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const { data, error } = await useFetch(url, {
      baseURL:apiBaseUrl,
      method,
      body
    });
    if (error.value) {
      toast.add({ 
        title:'請求發生錯誤,請稍後再嘗試',
        description:`${error.value.message}`,
        icon:'i-heroicons-exclamation-circle-16-solid',
        timeout:0
       })
       setLoadingState(false)
      throw createError({ ...error.value, message: "資料異常" });
    }
    return data.value as unknown as any;
  }
 
  return {
    //data
    //methods
    fetchApiBase
  };
};
