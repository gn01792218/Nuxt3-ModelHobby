import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { id } = event.context.params as any

    const modelSize =await prisma.modelFinishInfo.findUnique({
        where:{
            modelId:parseInt(id)
        }
    })
        return modelSize
})