import { serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'

export async function requireOwner(event: H3Event) {
  const user = await serverSupabaseUser(event).catch(() => null)
  const { ownerEmail } = useRuntimeConfig().public

  if (!user?.email || user.email !== ownerEmail) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
}
