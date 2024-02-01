import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any
    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
       e_commerce_name,
       currency,
       price,
       shop_name,
       purchase_date 
     } = body

    const myModelPurchaseInfo =await prisma.purchaseInfo.update({
        where:{
            id:Id
        },
        data:{
            e_commerce_name,
            currency,
            price,
            shop_name,
            purchase_date:purchase_date? new Date(purchase_date) : null,
        }
    })
    return myModelPurchaseInfo
})