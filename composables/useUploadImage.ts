export default () => {
  const { compressImg } = useImageCompress();
  async function handleUploadMutipleImgs(
    event: Event,
    previewImgs: Ref<string[]>
  ) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;
    const compressedFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const finalImg = await handleCompress(files[i])
      if (!finalImg) return console.log("解壓縮圖片失誤");
      compressedFiles.push(finalImg);
      // alert(
      //   `第 ${i + 1} 張圖片壓縮後大小: ${(finalImg.size / 1024 / 1024).toFixed(2)} MB`
      // );

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
  async function handleCompress(img: File) {
    const compressed = await compressImg(img);
    if (!compressed) return console.log('圖片擠壓縮失敗')
    console.log("最終的照片", `${compressed.size / 1024 / 1024} MB`);
    // alert(`最終的照片 ${compressed.size / 1024 / 1024} MB`);
    return compressed;
  }

  return {
    //data
    //methods
    handleUploadMutipleImgs,
    handleCompress
  };
};
