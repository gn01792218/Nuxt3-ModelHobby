import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any

    const modelPurchaseInfo =await prisma.purchaseInfo.findUnique({
        where:{
            modelId:parseInt(modelId)
        }
    })
        return modelPurchaseInfo
})