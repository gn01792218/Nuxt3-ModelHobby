import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const myModel =await prisma.myModel.create({
        data:body
    })
    return myModel
})
