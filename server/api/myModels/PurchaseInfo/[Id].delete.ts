import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any

    const myModelPurchaseInfo =await prisma.purchaseInfo.delete({
        where:{
            id:parseInt(Id)
        }
    })
    return myModelPurchaseInfo
})