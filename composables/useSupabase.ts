interface UploadImageToSupabaseOption{
  bucketName: string
  fileNameTitle: string
  modelId: number
}
export default () => {
  const supabase = useSupabaseClient();
  const supabaseBaseUrl = useRuntimeConfig().public.supabase.url;

  function getModelImagePublicUrl(imgDbPaath: string) {
    return `${supabaseBaseUrl}/storage/v1/object/public/images/${imgDbPaath}`;
  }
  function getFinishImagePublicUrl(imgDbPaath: string) {
    return `${supabaseBaseUrl}/storage/v1/object/public/model_finish_info_images/${imgDbPaath}`;
  }
  async function uploadImageToSpabaseStorage(img:File, option:UploadImageToSupabaseOption): Promise<string> {
    const { modelId, fileNameTitle, bucketName } = option
   if (!img) return ''

   const fileName = `${fileNameTitle}_modelId_${modelId}_${crypto.randomUUID()}`
   const { data, error } = await supabase.storage.from(bucketName).upload(`public/${fileName}`, img)
   if (error) throw createError({
      ...error,
      message: '無法上傳圖片',
   })
   return data.path
}
  async function uploadMultipleImagesToSupabaseStorage(imgs: FileList, option: UploadImageToSupabaseOption): Promise<any[]> {
    const { modelId, bucketName, fileNameTitle } = option;
    if (!imgs?.length) return [];

    const paths: any[] = [];
    const promises: Promise<any>[] = [];
    for (let i = 0; i < imgs.length; i++) {
      const fileName = `${fileNameTitle}_modelId_${modelId}_${crypto.randomUUID()}`;
      const imgRes = supabase.storage
        .from(bucketName)
        .upload(`public/${fileName}`, imgs[i]);
      promises.push(imgRes);
    }
    const reses = await Promise.allSettled(promises);
    reses.forEach((res: any) => {
      paths.push(res.value.data.path);
    });

    return paths;
  }
  function removeImageFromSupabaseStorage(bucketName:string, img:string){
    return supabase.storage.from(bucketName).remove([img])
  }
  return {
    //data
    supabaseBaseUrl,
    //methods
    getModelImagePublicUrl,
    getFinishImagePublicUrl,
    uploadImageToSpabaseStorage,
    uploadMultipleImagesToSupabaseStorage,
    removeImageFromSupabaseStorage
  };
};
