import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { modelId } = event.context.params as any
    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
       e_commerce_name,
       currency,
       price,
       shop_name,
       purchase_date 
     } = JSON.parse(body)

    const myModel =await prisma.purchaseInfo.create({
        data:{
            e_commerce_name,
            currency,
            price,
            shop_name,
            purchase_date:new Date(purchase_date),
            modelId:parseInt(modelId),
        }
    })
    return myModel
})