import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
        finished_date,
        description,
        process_imgs,
        gallery,
     } = JSON.parse(body)

    const myModel =await prisma.modelFinishInfo.update({
        where:{
            modelId:parseInt(modelId)
        },
        data:{
            finished_date: finished_date? new Date(finished_date) : null,
            process_imgs,
            gallery,
            description,
            modelId:parseInt(modelId),
        }
    })
    return myModel
})