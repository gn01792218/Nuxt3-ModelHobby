import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
        unit,
        width,
        length,
        height
     } = JSON.parse(body)
    const myModel =await prisma.modelSize.create({
        data:{
            unit,
            width,
            length,
            height,
            modelId:parseInt(modelId),
        }
    })
    return myModel
})