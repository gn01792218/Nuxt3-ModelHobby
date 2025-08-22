import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)

    const myModel =await prisma.modelSize.update({
        where:{
            modelId:parseInt(modelId)
        },
        data:{
            ...body, 
            modelId:parseInt(modelId),
        }
    })
    return myModel
})