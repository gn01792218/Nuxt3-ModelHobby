// utils/enumToArray.ts
export function enumToArray<T extends Record<string, string>>(enumObj: T): string[] {
  return Object.values(enumObj)
}