export default () => {
    const supabaseBaseUrl = useRuntimeConfig().public.supabase.url

  return {
    //data
    supabaseBaseUrl
    //methods
  };
};