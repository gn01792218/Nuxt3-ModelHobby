import imageCompression from "browser-image-compression";
export default () => {
  const IMGQULATY = 0.8
  // WebP 格式轉換函數
async function convertToWebP(img: File): Promise<File> {
  const image = await createImageFromFile(img);
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0);

  // 轉換為 WebP 格式，並設置品質（例如 80%）
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject('WebP轉換失敗')),
      'image/webp',
      IMGQULATY
    )
  );

  return new File([blob], img.name, { type: 'image/webp' });
}

// 輔助函數：創建圖片對象
async function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => resolve(img);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

  return {
    //data
    //methods
    convertToWebP
  };
};
