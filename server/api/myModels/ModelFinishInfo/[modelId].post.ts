import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)

    
    body.finished_date =  body.finished_date? new Date(body.finished_date) : null

    const myModel =await prisma.modelFinishInfo.create({
        data:{
            ...body,
            modelId:parseInt(modelId),
        }
    })
    return myModel
})