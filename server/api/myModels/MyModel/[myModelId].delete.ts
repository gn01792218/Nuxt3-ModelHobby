import { prisma } from '@/server/utils/prisma'
export default defineEventHandler(async (event)=>{
    const { myModelId } = event.context.params as any

    const myModel =await prisma.myModel.delete({
        where:{
            id:parseInt(myModelId)
        }
    })
    return myModel
})
