import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const bucketName = body.bucketName?.replaceAll("_", "-");
  const url = body.url;
  const fileName = url.split(`${bucketName}/`)[1] ?? url;
  if (!bucketName || !url) {
    throw createError({ statusCode: 400, statusMessage: "Missing bucketName or url" });
  }

  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    })
  );

  return { success: true };
});