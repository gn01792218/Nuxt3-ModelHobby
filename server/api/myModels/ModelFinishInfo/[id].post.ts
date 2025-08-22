import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any //這個id是model的id
    const body = await readBody(event)

    
    body.finished_date =  body.finished_date? new Date(body.finished_date) : null

    const myModel =await prisma.modelFinishInfo.create({
        data:{
            ...body,
            modelId:parseInt(id),
        }
    })
    return myModel
})