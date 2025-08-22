import type { CreateFinishInfoRequest } from '~/types/finishInfo';

export default () => {
  const { handleUploadMutipleImgs } = useUploadImage()
  const {
    getModelImagePublicUrl: getS3ModelMainImagePublicUrl,
    getFinishImagePublicUrl: getS3ModelFinishImagePublicUrl } = useS3()
  const {
    getModelImagePublicUrl: getSupabaseModelMainImagePublicUrl,
    getFinishImagePublicUrl: getSupabaseModelFinishImagePublicUrl } = useSupabase()

  const finishInfo = ref<CreateFinishInfoRequest>({
    process_imgs: [],
    gallery: []
  })

  const process_imgs_file_list = ref<File[]>([])
  const gallery_imgs_file_list = ref<File[]>([])

  const deleteProcessImgs = ref<string[]>([])
  const deleteGalleryImgs = ref<string[]>([])

  const previewProcessImgs = ref<string[]>([])
  const previewGalleryImgs = ref<string[]>([])

  //圖片處理
  async function handleLoadProcessImgsFileList(e: Event, previewImgs: string[]) {
    const imgFiles = await handleUploadMutipleImgs(e, ref(previewImgs))
    const newUploadFiles = Array.from(imgFiles!)
    newUploadFiles.forEach(file => process_imgs_file_list.value.push(file))
  }
  async function handleLoadGallaryImgsFileList(e: Event, previewImgs: string[]) {
    const imgFiles = await handleUploadMutipleImgs(e, ref(previewImgs))
    const newUploadFiles = Array.from(imgFiles!)
    newUploadFiles.forEach(file => gallery_imgs_file_list.value.push(file))
  }

  //圖片的刪除
  function deleteProcessUploadImg(index: number) {
    process_imgs_file_list.value.splice(index, 1) //splice會直接改變原本數組
    previewProcessImgs.value.splice(index, 1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if (!finishInfo.value?.process_imgs?.length) return //原本沒圖片直接離開
    if (!finishInfo.value.process_imgs[index]) return  //原本的沒有這張圖片，也離開
    deleteProcessImgs.value?.push(finishInfo.value.process_imgs[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    finishInfo.value.process_imgs.splice(index, 1) //將圖片剃除於原本的陣列
  }
  function deleteGalleryUploadImg(index: number) {
    gallery_imgs_file_list.value.splice(index, 1) //splice會直接改變原本數組
    previewGalleryImgs.value.splice(index, 1)
    //假設要刪除的存在於原本的圖檔內，也要記得要刪除
    if (!finishInfo.value?.gallery?.length) return //原本沒圖片直接離開
    if (!finishInfo.value.gallery[index]) return  //原本的沒有這張圖片，也離開
    deleteGalleryImgs.value?.push(finishInfo.value.gallery[index]) //把要刪除的圖片儲存起來，按下確定後，再刪除
    finishInfo.value.gallery.splice(index, 1) //將圖片剃除於原本的陣列
  }
  //獲取圖片公開網址
  function getModelMainImagePublicUrl(imgDbPaath: string) {
    if (imgDbPaath.includes('cloudflare')) return getS3ModelMainImagePublicUrl(imgDbPaath)
    return getSupabaseModelMainImagePublicUrl(imgDbPaath)
  }
  function getModelFinishImagePublicUrl(imgDbPaath: string) {
    if (imgDbPaath.includes('cloudflare')) return getS3ModelFinishImagePublicUrl(imgDbPaath)
    return getSupabaseModelFinishImagePublicUrl(imgDbPaath)
  }
  return {
    //data
    finishInfo,
    process_imgs_file_list,
    gallery_imgs_file_list,
    previewGalleryImgs,
    previewProcessImgs,
    deleteProcessImgs,
    deleteGalleryImgs,
    //methods
    handleLoadProcessImgsFileList,
    handleLoadGallaryImgsFileList,
    deleteProcessUploadImg,
    deleteGalleryUploadImg,
    getModelMainImagePublicUrl,
    getModelFinishImagePublicUrl
  };
};