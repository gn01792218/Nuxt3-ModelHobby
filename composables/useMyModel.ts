import { useMyModelStore } from "~/store/useMyModelStore"
export default () => {
  const { setCurrentModelId, setOpenSearchPanel } = useMyModelStore()
  const { handleUploadMutipleImgs } = useUploadImage()

  //導航
  function navergateToMyModelDetial(id:number) {
    setCurrentModelId(id)
    navigateTo(`/User/MyModel/ModelDetail-${id}`)
  }
  function navergateToGallery(id:number) {
    setCurrentModelId(id)
    setOpenSearchPanel(false)
    navigateTo(`/Gallery/${id}`)
  }

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

  return {
    //methods
    navergateToMyModelDetial,
    navergateToGallery
  };
};