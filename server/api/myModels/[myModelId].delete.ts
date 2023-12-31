import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{

    const { myModelId } = event.context.params as any

    const myModel =await prisma.myModel.delete({
        where:{
            id:parseInt(myModelId)
        }
    })
    return myModel
})
