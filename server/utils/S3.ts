import { S3Client } from "@aws-sdk/client-s3";

const globalForS3 = global as unknown as { s3: S3Client };

export const s3 =
  globalForS3.s3 ||
  new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForS3.s3 = s3;
}