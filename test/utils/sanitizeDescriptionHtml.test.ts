import { describe, it, expect } from 'vitest'
import { sanitizeDescriptionHtml } from '@/utils/sanitizeDescriptionHtml'

describe('sanitizeDescriptionHtml', () => {
  it('should return empty string for empty input', () => {
    expect(sanitizeDescriptionHtml('')).toBe('')
    expect(sanitizeDescriptionHtml(null)).toBe('')
    expect(sanitizeDescriptionHtml(undefined)).toBe('')
  })

  it('should keep allowed formatting tags', () => {
    const html = '<p><strong>粗體</strong><em>斜體</em><u>底線</u><s>刪除線</s></p>'
    expect(sanitizeDescriptionHtml(html)).toBe(html)
  })

  it('should keep lists and headings', () => {
    const html = '<h2>標題</h2><ul><li>項目1</li><li>項目2</li></ul><ol><li>項目1</li></ol>'
    expect(sanitizeDescriptionHtml(html)).toBe(html)
  })

  it('should strip script tags and event handler attributes (XSS)', () => {
    const html = '<p onclick="alert(1)">safe</p><script>alert(1)</script>'
    const result = sanitizeDescriptionHtml(html)
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('onclick')
    expect(result).toContain('safe')
  })

  it('should keep https links and add safe rel/target', () => {
    const html = '<a href="https://example.com">連結</a>'
    const result = sanitizeDescriptionHtml(html)
    expect(result).toContain('href="https://example.com"')
    expect(result).toContain('target="_blank"')
    expect(result).toContain('rel="noopener noreferrer nofollow"')
  })

  it('should strip javascript: links', () => {
    const html = '<a href="javascript:alert(1)">危險連結</a>'
    const result = sanitizeDescriptionHtml(html)
    expect(result).not.toContain('javascript:')
  })

  it('should keep img src/alt but strip disallowed attributes', () => {
    const html = '<img src="https://pub-abc.r2.dev/foo.webp" alt="圖片" onerror="alert(1)">'
    const result = sanitizeDescriptionHtml(html)
    expect(result).toContain('src="https://pub-abc.r2.dev/foo.webp"')
    expect(result).toContain('alt="圖片"')
    expect(result).not.toContain('onerror')
  })

  it('should drop disallowed tags like iframe', () => {
    const html = '<p>text</p><iframe src="https://evil.example"></iframe>'
    const result = sanitizeDescriptionHtml(html)
    expect(result).not.toContain('<iframe')
  })
})
