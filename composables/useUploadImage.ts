export default () => {
   const { compressImg } = useImageCompress()
  async function handleUploadMutipleImgs(event: Event, previewImgs:Ref<string[]>) {
   const input = event.target as HTMLInputElement
   const files = input.files
   if (files) {
      for (let i = 0; i < files.length; i++) {
         const img = await compressImg(files[i]) 
         if(!img) return console.log('解壓縮圖片失誤')
         files[i] = img
         console.log('壓縮出來的照片', `${files[i].size / 1024 / 1024} MB`)
         if (img.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
               //預覽圖
               previewImgs.value.push(e.target?.result as string)
            }
            reader.readAsDataURL(img)
         }
      }
   }
   return files
}

  return {
    //data
    //methods
    handleUploadMutipleImgs
  };
};