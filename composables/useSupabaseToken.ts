// composables/useSupabaseToken.ts
import { parse } from 'cookie'

export function useSupabaseToken() {
  let token = ''

  if (process.server) {
    const headers = useRequestHeaders(['cookie'])
    const cookies = parse(headers.cookie || '')
    const tokenParts = Object.entries(cookies)
      .filter(([key]) => key.startsWith('sb-') && key.includes('auth-token'))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value)

    token = tokenParts.join('')
  }

  if (process.client) {
    const raw = document.cookie
    const cookies = parse(raw)
    const tokenParts = Object.entries(cookies)
      .filter(([key]) => key.startsWith('sb-') && key.includes('auth-token'))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value)

    token = tokenParts.join('')
  }

  return token
}