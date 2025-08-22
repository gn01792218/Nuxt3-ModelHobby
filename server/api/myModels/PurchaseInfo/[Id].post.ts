import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any //這個id要帶ModelId
    const body = await readBody(event)

    body.purchase_date = body.purchase_date? new Date(body.purchase_date) : null

    const myModelPurchaseInfo =await prisma.purchaseInfo.create({
        data:{
            ...body,
            modelId:parseInt(Id)
        }
    })
    return myModelPurchaseInfo
})