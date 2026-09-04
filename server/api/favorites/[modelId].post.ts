import { serverSupabaseUser } from '#supabase/server'
import { prisma } from '@/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event).catch(() => null)
    if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

    const { modelId } = event.context.params as any

    await prisma.favorite.upsert({
        where: {
            userId_modelId: {
                userId: user.id,
                modelId: parseInt(modelId)
            }
        },
        update: {},
        create: {
            userId: user.id,
            modelId: parseInt(modelId)
        }
    })

    return await prisma.favorite.findMany({
        where: { modelId: parseInt(modelId) },
        select: { userId: true }
    })
})
