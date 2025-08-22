import { s3 } from "~/server/utils/S3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export default defineEventHandler(async (event) => {
  const body = await readMultipartFormData(event);
  const file = body?.find((f) => f.name === "file");
  const bucketName = body?.find((f) => f.name === "bucketName")?.data.toString().replaceAll("_", "-");

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  const fileName = file.filename;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.data,
      ContentType: file.type,
    })
  );

  return { url: `${process.env.R2_ENDPOINT}/${bucketName}/${fileName}` };
});