interface UploadImageToSupabaseOption {
  bucketName: string;
  fileNameTitle: string;
  modelId: number;
}
export default () => {
  const supabase = useSupabaseClient();
  const { handleCompress } = useUploadImage()
  const supabaseBaseUrl = useRuntimeConfig().public.supabase.url;
  const RequestCacheControlTime = 1; //請求圖片時要求的快取時間，1表示一年，以此類推
  const uploadImageOption = {
    cacheControl: "31536000", //上傳圖片時，指定快取時間1年
  };

  function getModelImagePublicUrl(imgDbPaath: string) {
    return `${supabaseBaseUrl}/storage/v1/object/public/images/${imgDbPaath}?version=${RequestCacheControlTime}`;
  }
  function getFinishImagePublicUrl(imgDbPaath: string) {
    return `${supabaseBaseUrl}/storage/v1/object/public/model_finish_info_images/${imgDbPaath}?version=${RequestCacheControlTime}`;
  }
  async function uploadMultipleImagesToSupabaseStorage( //傳一張的也用這個就好了
    imgs: File[],
    option: UploadImageToSupabaseOption
  ): Promise<any[]> {
    const { modelId, bucketName, fileNameTitle } = option;
    if (!imgs?.length) return [];

    const paths: any[] = [];
    const promises: Promise<any>[] = [];
    for (let i = 0; i < imgs.length; i++) {
      const fileName = `${fileNameTitle}_modelId_${modelId}_${crypto.randomUUID()}`;
      const imgRes = supabase.storage
        .from(bucketName)
        .upload(`public/${fileName}`, imgs[i], uploadImageOption);
      promises.push(imgRes);
    }
    const reses = await Promise.allSettled(promises);
    reses.forEach((res: any) => {
      paths.push(res.value.data.path);
    });

    return paths;
  }
  async function overrideSupabaseStorageImg(DBpath: string, url:string) {
    // //1.先找到bockName
    const bocketName = extractString(url)
    if(!bocketName) return 

    // 1. 下載圖片並將其轉換為 Blob
    // if(!res) return alert('沒有圖片')
    const res = await fetch(url)
    const imgBlob = await res.blob();
    // 2. 將 Blob 轉換為 File
    const file = new File([imgBlob], "converted_image.webp", {
      type: "image/webp",
    });
    const result = await handleCompress(file);
    if(!result) return alert('圖片壓縮轉換失敗')
    //3.直接覆蓋storage裡面的圖片
    
    const { data, error } = await supabase.storage
      .from(bocketName)  // 替换为你的 bucket 名
      .upload(DBpath, result, {
        upsert: true,         // 这里使用 upsert 来确保如果文件存在则覆盖
      })
  }
  function removeImageFromSupabaseStorage(bucketName: string, img: string) {
    return supabase.storage.from(bucketName).remove([img]);
  }
  function extractString(url: string): string | null {
  // 定义正则表达式，用于提取 'images' 或 'model_finish_info_images' 部分
  const regex = /storage\/v1\/object\/public\/(images|model_finish_info_images)/;
  
  const match = url.match(regex);
  
  if (match && match[1]) {
    return match[1]; // 返回提取的部分
  }
  
  return null; // 没有匹配到
}
  return {
    //data
    supabaseBaseUrl,
    //methods
    getModelImagePublicUrl,
    getFinishImagePublicUrl,
    uploadMultipleImagesToSupabaseStorage,
    removeImageFromSupabaseStorage,
    overrideSupabaseStorageImg
  };
};
