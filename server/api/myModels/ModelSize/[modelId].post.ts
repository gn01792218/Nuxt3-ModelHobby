import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)
    const myModel =await prisma.modelSize.create({
        data:{
            ...body,
            modelId:parseInt(modelId),
        }
    })
    return myModel
})