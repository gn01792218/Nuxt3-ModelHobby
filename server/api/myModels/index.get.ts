import { prisma } from '@/server/utils/prisma'

export default defineEventHandler(async(event)=>{
    return await prisma.myModel.findMany({
        include:{
            size:true,
            finish_infos:true,
            purchase_infos:true,
        }
    })
})
