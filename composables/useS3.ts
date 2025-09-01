import useS3API from "./api/useS3API";
import { type DeleteS3ImageRequest } from "@/types/S3";
import { type ModelFinishInfo } from "@/types/finishInfo"
import { StorageBucket } from "@/types/storage"
interface UploadImageToS3Option {
  bucketName: string;
  fileNameTitle: string;
  modelId: number;
}

export default () => {
  const { uploadImageToS3, deleteImageToS3 } = useS3API()
 
  async function uploadMultipleImagesToS3(
    imgs: File[],
    option: UploadImageToS3Option
  ): Promise<string[]> {
    const { bucketName, fileNameTitle, modelId } = option
    if (!imgs?.length) return [];

    const paths: string[] = [];
    for (let i = 0; i < imgs.length; i++) {
      const fileName = `${fileNameTitle}_modelId_${modelId}_${crypto.randomUUID()}`;
      const file = new File([imgs[i]], fileName, { type: imgs[i].type });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucketName", bucketName);
      const imgRes = await uploadImageToS3(formData); // 等待一個完成再下一個，因為cloudfare不能一次處理太多併發!
      paths.push(imgRes);
    }
    return paths;
  }
  async function removeImageFromS3Storage(payload: DeleteS3ImageRequest) {
    return await deleteImageToS3(payload);
  }
  async function processRemoveFinishInfoImgs(process_imgs: string[], gallery:string[]) {
    for (const url of process_imgs) {
      await removeImageFromS3Storage({ bucketName: StorageBucket.model_finish_info_images, url });
    }
    for (const url of gallery) {
      await removeImageFromS3Storage({ bucketName: StorageBucket.model_finish_info_images, url });
    }
  }
  function getModelImagePublicUrl(imgDbPaath: string) {
    const parts = imgDbPaath.split("/");
    const fileName = parts[parts.length - 1];
    return `https://pub-ea4ffee135904113a125e470f4010841.r2.dev/${fileName}`
  }
  function getFinishImagePublicUrl(imgDbPaath: string) {
    const parts = imgDbPaath.split("/");
    const fileName = parts[parts.length - 1];
    return `https://pub-73b4c2d30374470b97f76a027badce36.r2.dev/${fileName}`
  }


  return {
    //data
    //methods
    uploadMultipleImagesToS3,
    removeImageFromS3Storage,
    processRemoveFinishInfoImgs,
    getModelImagePublicUrl,
    getFinishImagePublicUrl
  };
};
