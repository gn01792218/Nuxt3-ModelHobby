import { describe, it, expect } from 'vitest'
import { extractImageFileNamesFromHtml } from '@/utils/extractImageFileNamesFromHtml'

describe('extractImageFileNamesFromHtml', () => {
  it('should return empty array for empty input', () => {
    expect(extractImageFileNamesFromHtml('')).toEqual([])
    expect(extractImageFileNamesFromHtml(null)).toEqual([])
    expect(extractImageFileNamesFromHtml(undefined)).toEqual([])
  })

  it('should return empty array when there is no img tag', () => {
    const html = '<p>純文字</p><ul><li>項目</li></ul>'
    expect(extractImageFileNamesFromHtml(html)).toEqual([])
  })

  it('should extract file name from img src', () => {
    const html = '<p><img src="https://pub-abc.r2.dev/model_description_img_modelId_1_uuid.webp" alt="圖片"></p>'
    expect(extractImageFileNamesFromHtml(html)).toEqual(['model_description_img_modelId_1_uuid.webp'])
  })

  it('should extract multiple file names in order', () => {
    const html = '<img src="https://pub-abc.r2.dev/a.webp"><p>text</p><img src="https://pub-abc.r2.dev/b.webp">'
    expect(extractImageFileNamesFromHtml(html)).toEqual(['a.webp', 'b.webp'])
  })
})
