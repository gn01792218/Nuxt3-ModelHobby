import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any
    const body = await readBody(event)

    body.purchase_date = body.purchase_date? new Date(body.purchase_date) : null

    const myModelPurchaseInfo =await prisma.purchaseInfo.update({
        where:{
            id:parseInt(Id)
        },
        data:body
    })
    return myModelPurchaseInfo
})