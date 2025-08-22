import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any

    const modelSize =await prisma.modelSize.findUnique({
        where:{
            modelId:parseInt(modelId)
        }
    })
        return modelSize
})