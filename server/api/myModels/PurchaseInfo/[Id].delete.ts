import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    await requireOwner(event)
    const { Id } = event.context.params as any

    const myModelPurchaseInfo =await prisma.purchaseInfo.delete({
        where:{
            id:parseInt(Id)
        }
    })
    return myModelPurchaseInfo
})