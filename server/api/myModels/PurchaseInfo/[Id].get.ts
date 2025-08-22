import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any

    const modelPurchaseInfos =await prisma.purchaseInfo.findMany({
        where:{
            modelId:parseInt(Id)
        }
    })
        return modelPurchaseInfos
})