import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any
    const body = await readBody(event)

    body.finished_date =  body.finished_date? new Date(body.finished_date) : null

    const myModel =await prisma.modelFinishInfo.update({
        where:{
            modelId:parseInt(id)
        },
        data:{
            ...body,
            modelId:parseInt(id),
        }
    })
    return myModel
})