export default () => {
  const toast = useToast()
  const { apiBaseUrl } = useRuntimeConfig().public

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const { data, error } = await useFetch(url, {
      baseURL:apiBaseUrl,
      method,
      body
    });
    if (error.value) {
      toast.add({ 
        title:'請求發生錯誤',
        description:`${error.value}`,
        icon:'i-heroicons-exclamation-circle-16-solid',
       })
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
