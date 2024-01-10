export default () => {
  function handleUploadImg(event:InputEvent){
    const input = event.target as HTMLInputElement
    if(input.files){
        const img = input.files[0]
        const reader = new FileReader()
        reader.onload = (e)=>{
            //預覽圖
        }
        reader.readAsDataURL(img)
    }
  }

  return {
    //data
    //methods
    handleUploadImg,
  };
};
