import { prisma } from '@/server/utils/prisma'

export default defineEventHandler(async (event)=>{
    await requireOwner(event)
    const body = await readBody(event)
    const myModel =await prisma.myModel.create({
        data:body
    })
    return myModel
})
