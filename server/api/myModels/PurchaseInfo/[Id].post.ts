import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { Id } = event.context.params as any //這個id要帶ModelId
    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
       e_commerce_name,
       currency,
       price,
       shop_name,
       purchase_date 
     } = body

    const myModelPurchaseInfo =await prisma.purchaseInfo.create({
        data:{
            e_commerce_name,
            currency,
            price,
            shop_name,
            purchase_date:purchase_date? new Date(purchase_date) : null,
            modelId:parseInt(Id),
        }
    })
    return myModelPurchaseInfo
})