export default () => {
  const supabaseBaseUrl = useRuntimeConfig().public.supabase.url;
  function getModelImagePublicUrl(imgDbPaath: string) {

    return `${supabaseBaseUrl}/storage/v1/object/public/images/${imgDbPaath}`;
  }
  function getFinishImagePublicUrl(imgDbPaath: string) {
    return `${supabaseBaseUrl}/storage/v1/object/public/model_finish_info_images/${imgDbPaath}`;
  }

  console.log(
    
  );

  return {
    //data
    supabaseBaseUrl,
    //methods
    getModelImagePublicUrl,
    getFinishImagePublicUrl,
  };
};
