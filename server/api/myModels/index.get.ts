import { PrismaClient } from "@prisma/client"
import myModels from "~/data/model"

const prisma = new PrismaClient()
export default defineEventHandler(async(event)=>{
    return await prisma.myModel.findMany()
})
