import sanitizeHtml from "sanitize-html"

// 富文本"描述"欄位允許的標籤/屬性，跟 RichTextEditor 工具列功能對齊(粗體/斜體/底線/刪除線、清單、標題、連結、圖片、字體顏色)
const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "u", "s",
  "ul", "ol", "li",
  "h1", "h2", "h3",
  "a", "img", "span"
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt"],
  span: ["class"]
}

// 字體顏色只允許站上既有色階，跟 RichTextEditor.vue 的 FONT_COLORS 對齊
const ALLOWED_CLASSES: sanitizeHtml.IOptions["allowedClasses"] = {
  span: ["text-main-700", "text-acent-600", "text-earth-700", "text-olive-700", "text-steel-700"]
}

export function sanitizeDescriptionHtml(html: string | null | undefined): string {
  if (!html) return ""
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedClasses: ALLOWED_CLASSES,
    allowedSchemes: ["https"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow", target: "_blank" })
    }
  })
}
