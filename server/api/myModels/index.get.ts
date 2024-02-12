import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async(event)=>{
    return await prisma.myModel.findMany({
        include:{
            size:true,
            finish_info:true,
            purchase_infos:true,
        }
    })
})
