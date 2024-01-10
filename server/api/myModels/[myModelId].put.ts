import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { myModelId } = event.context.params as any;
  const body = await readBody(event);
  //選擇要傳送的欄位
  const { name_zh, name_en, status, main_img } = JSON.parse(body);

  const myModel = await prisma.myModel.update({
    where: {
      id: parseInt(myModelId),
    },
    data: {
      name_zh,
      name_en,
      status,
      main_img,
    },
  });
  return myModel;
});
