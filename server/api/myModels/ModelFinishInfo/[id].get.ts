import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any //這個id是FinishInfo的id

    const modelSize =await prisma.modelFinishInfo.findUnique({
        where:{
            id:parseInt(id)
        }
    })
        return modelSize
})