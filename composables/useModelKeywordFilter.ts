import type { Model } from "~/types/model"

export default () => {
  const { converTradictionalToSimple } = useChinessConverter()

  function matchesKeyword(model: Model, keyword: string) {
    const modelString = converTradictionalToSimple(JSON.stringify(model).toLocaleLowerCase())
    const keywordArray = converTradictionalToSimple(keyword.trim().toLowerCase()).split(" ") as string[]
    return keywordArray.some(kw => modelString.includes(kw))
  }

  function filterModelsByKeyword(models: Model[], keyword: string) {
    if (!keyword.trim()) return models
    return models.filter((model) => matchesKeyword(model, keyword))
  }

  return {
    //methods
    matchesKeyword,
    filterModelsByKeyword,
  }
}
