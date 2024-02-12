import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const { myModelId } = event.context.params as any

    const myModel =await prisma.myModel.findUnique({
        where:{
            id:parseInt(myModelId)
        },
        include:{
            size:true,
            finish_info:true,
            purchase_infos:true,
        }
    })
    return myModel
})
