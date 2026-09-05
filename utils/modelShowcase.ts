import type { Model } from "~/types/model"

export function hasFinishedGallery(model: Model): boolean {
  return !!model.finish_infos?.[0]?.gallery?.length
}

export function hasFinishedDate(model: Model): boolean {
  return !!model.finish_infos?.[0]?.finished_date
}

// 卡片需要代表圖與完成時間才能正常顯示，兩者缺一都要排除
export function isShowcaseReady(model: Model): boolean {
  return hasFinishedGallery(model) && hasFinishedDate(model)
}
