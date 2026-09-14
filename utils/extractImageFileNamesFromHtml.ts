// 從富文本描述(HTML)裡取出所有 <img src="..."> 對應的檔名，用於清理 R2 上的孤兒圖片
export function extractImageFileNamesFromHtml(html: string | null | undefined): string[] {
  if (!html) return []
  const matches = html.matchAll(/<img[^>]+src="([^"]+)"/g)
  return Array.from(matches, ([, src]) => src.split("/").pop()).filter((fileName): fileName is string => !!fileName)
}
