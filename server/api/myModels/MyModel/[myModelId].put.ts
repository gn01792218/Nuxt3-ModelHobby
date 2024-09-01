import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { myModelId } = event.context.params as any;
  const body = await readBody(event);
  delete body.finish_infos
  delete body.purchase_infos
  delete body.size
  const myModel = await prisma.myModel.update({
    where: {
      id: parseInt(myModelId),
    },
    include: {
      size:true,
      finish_infos: true,
      purchase_infos: true,
    },
    data: body
  });
  return myModel;
});
