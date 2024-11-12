interface UploadImageToSupabaseOption {
  bucketName: string;
  fileNameTitle: string;
  modelId: number;
}
export default () => {
  const supabase = useSupabaseClient();
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
  function removeImageFromSupabaseStorage(bucketName: string, img: string) {
    return supabase.storage.from(bucketName).remove([img]);
  }
  return {
    //data
    supabaseBaseUrl,
    //methods
    getModelImagePublicUrl,
    getFinishImagePublicUrl,
    uploadMultipleImagesToSupabaseStorage,
    removeImageFromSupabaseStorage,
  };
};
