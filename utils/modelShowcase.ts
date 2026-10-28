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

// 展示用名稱：有設定展示名稱就用展示名稱，否則退回中文名稱
export function getModelDisplayName(model: Pick<Model, 'name_zh' | 'display_name'>): string {
  return model.display_name?.trim() || model.name_zh
}
