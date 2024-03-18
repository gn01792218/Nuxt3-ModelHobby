import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any //是FinishInfo的id

    const finishInfo =await prisma.modelFinishInfo.delete({
        where:{
            id:parseInt(id)
        }
    })
    return finishInfo
})
