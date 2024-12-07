export default () => {
  const { compressImg } = useImageCompress();
  const { convertToWebP } = useImageTrasfer()
  async function handleUploadMutipleImgs(
    event: Event,
    previewImgs: Ref<string[]>
  ) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    const compressedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
       const compressed = await compressImg(files[i]);
       const finalImg = await convertToWebP(compressed)
      if (!finalImg) return console.log("解壓縮圖片失誤");
      compressedFiles.push(finalImg);
      console.log("壓縮出來的照片", `${compressedFiles[i].size / 1024 / 1024} MB`);
      if (finalImg.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => { 
          //預覽圖
          previewImgs.value.push(e.target?.result as string);
        };
        reader.readAsDataURL(finalImg);
      }
    }
    return compressedFiles;
  }

  return {
    //data
    //methods
    handleUploadMutipleImgs,
  };
};
