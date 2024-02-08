export default () => {
  function handleUploadMutipleImgs(event: Event, previewImgs:Ref<string[]>) {
   const input = event.target as HTMLInputElement
   const files = input.files
   if (files) {
      previewImgs.value.length = 0
      for (let i = 0; i < files.length; i++) {
         const img = files[i]
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