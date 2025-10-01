import { useMyModelStore } from "~/store/useMyModelStore";
import useMyToast from "../useMyToast";

export default () => {
  const { apiBaseUrl } = useRuntimeConfig().public
  const { setLoadingState } = useMyModelStore()
  const { sendToast } = useMyToast()

  // 共享的錯誤處理邏輯
  function handleError(error: any, showToast: boolean = true) {
    const errorMessage = 
      error?.response?._data?.message || 
      error?.data?.message || 
      error?.message || 
      '請求發生錯誤,請稍後再嘗試';

    if (showToast) {
      sendToast({ 
        title: '請求發生錯誤,請稍後再嘗試',
        description: errorMessage,
        icon: 'i-heroicons-exclamation-circle-16-solid',
        color: 'red',
        timeout: 0
      });
    }

    setLoadingState(false);
  }

  /**
   * $fetch 版本 - 適合並發請求、文件上傳、用戶交互
   * @param url 請求路徑
   * @param method HTTP 方法
   * @param body 請求體
   */
  async function fetchApiBase(
    url: string, 
    method: 'post' | 'get' | 'delete' | 'patch' | 'put',
    body?: any
  ): Promise<any> {
    const isFormData = body instanceof FormData;
    
    try {
      const data = await $fetch(url, {
        baseURL: apiBaseUrl as string,
        method,
        body: isFormData ? body : JSON.stringify(body),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' }
      });
      
      return data as unknown as any;
    } catch (error: any) {
      handleError(error);
      return null;
    }
  }

  /**
   * useFetch 版本 - 適合 SSR、頁面初始數據、響應式狀態
   * 注意:這個方法返回 { data, pending, error, refresh } 響應式對象
   * @param url 請求路徑
   * @param method HTTP 方法
   * @param body 請求體
   * @param options useFetch 額外選項
   */
  function useFetchApi<T = any>(
    url: string,
    method: 'post' | 'get' | 'delete' | 'patch' | 'put',
    body?: any,
    options?: any
  ) {
    const isFormData = body instanceof FormData;

    return useFetch<T>(url, {
      baseURL: apiBaseUrl as string,
      method,
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      ...options,
      onResponse({ response }) {
        // 成功時的處理
        if (options?.onResponse) {
          options.onResponse({ response });
        }
      },
      onResponseError({ response }) {
        // 錯誤時的處理
        handleError(response);
        if (options?.onResponseError) {
          options.onResponseError({ response });
        }
      }
    });
  }

  // 便捷方法 - $fetch 版本
  const get = (url: string, body?: any) => fetchApiBase(url, 'get', body);
  const post = (url: string, body?: any) => fetchApiBase(url, 'post', body);
  const put = (url: string, body?: any) => fetchApiBase(url, 'put', body);
  const patch = (url: string, body?: any) => fetchApiBase(url, 'patch', body);
  const del = (url: string, body?: any) => fetchApiBase(url, 'delete', body);

  // 便捷方法 - useFetch 版本
  const useGet = <T = any>(url: string, options?: any) => useFetchApi<T>(url, 'get', undefined, options);
  const usePost = <T = any>(url: string, body?: any, options?: any) => useFetchApi<T>(url, 'post', body, options);
  const usePut = <T = any>(url: string, body?: any, options?: any) => useFetchApi<T>(url, 'put', body, options);
  const usePatch = <T = any>(url: string, body?: any, options?: any) => useFetchApi<T>(url, 'patch', body, options);
  const useDel = <T = any>(url: string, options?: any) => useFetchApi<T>(url, 'delete', undefined, options);

  return {
    // $fetch 版本 - 用於並發請求、上傳等場景
    fetchApiBase,
    get,
    post,
    put,
    patch,
    delete: del,
    // useFetch 版本 - 用於 SSR、響應式數據
    useFetchApi,
    useGet,
    usePost,
    usePut,
    usePatch,
    useDelete: useDel
  };
};