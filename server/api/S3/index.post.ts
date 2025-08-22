import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

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