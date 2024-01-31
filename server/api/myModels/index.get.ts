import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async(event)=>{
    return await prisma.myModel.findMany({
        include:{
            finish_info:true,
        }
    })
})
