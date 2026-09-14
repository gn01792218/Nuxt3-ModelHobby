import { prisma } from '@/server/utils/prisma'
import { sanitizeDescriptionHtml } from '@/utils/sanitizeDescriptionHtml'
export default defineEventHandler(async (event)=>{
    await requireOwner(event)
    const { id } = event.context.params as any //這個id是model的id
    const body = await readBody(event)


    body.finished_date =  body.finished_date? new Date(body.finished_date) : null
    body.description = sanitizeDescriptionHtml(body.description)

    const myModel =await prisma.modelFinishInfo.create({
        data:{
            ...body,
            modelId:parseInt(id),
        }
    })
    return myModel
})