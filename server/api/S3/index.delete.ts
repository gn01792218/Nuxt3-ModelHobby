import { s3 } from "~/server/utils/S3";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

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