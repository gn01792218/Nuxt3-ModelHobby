import { s3 } from "~/server/utils/S3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
  await requireOwner(event);
  const body = await readMultipartFormData(event);
  const file = body?.find((f) => f.name === "file");
  const bucketName = body
    ?.find((f) => f.name === "bucketName")
    ?.data.toString()
    .replaceAll("_", "-");

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }

  const fileName = file.filename?.replace(/\.[^.]+$/, "") + ".webp"; // 改成 webp 副檔名

  // 👉 使用 Sharp 轉換格式
  const webpBuffer = await sharp(file.data)
    .webp({ quality: 80 }) // 這裡等同於你前端的 IMGQULATY = 0.8
    .toBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: webpBuffer,
      ContentType: "image/webp",
    })
  );

  return { url: `${process.env.R2_ENDPOINT}/${bucketName}/${fileName}` };
});