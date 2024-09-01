import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async(event)=>{
    const { userId } = event.context.params as any
    return await prisma.myModel.findMany({
        where:{
            userId
        },
        include:{
            size:true,
            finish_infos:true,
            purchase_infos:true,
        }
    })
})
