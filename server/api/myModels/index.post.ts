import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{

    const body = await readBody(event)

    //選擇要傳送的欄位
    const { 
        name_zh,
        name_en,
        status,
     } = body
    const myModel =await prisma.myModel.create({
        data:{
            name_zh,
            name_en,
            status
        }
    })
    return myModel
})
