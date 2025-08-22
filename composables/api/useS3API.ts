import type { DeleteS3ImageRequest } from "~/types/S3";
import useApiBase from "./useApiBase";

export default () => {
  const { fetchApiBase } = useApiBase()
  async function uploadImageToS3(payload: FormData) {
    const { url } = await fetchApiBase(`/api/S3`, "post", payload);
    return url as string;
  }
  async function deleteImageToS3(payload: DeleteS3ImageRequest) {
    const { success } = await fetchApiBase(`/api/S3`, "delete", payload);
    return success as boolean;
  }

  return {
    //data
    //methods
    uploadImageToS3,
    deleteImageToS3
  };
};
