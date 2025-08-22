import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any  //這個id是FinishInfo的id

    const body = await readBody(event)

    body.finished_date =  body.finished_date? new Date(body.finished_date) : null

    const modelFinishInfo =await prisma.modelFinishInfo.update({
        where:{
            id:parseInt(id)
        },
        data:{
            ...body,
        }
    })
    return modelFinishInfo
})