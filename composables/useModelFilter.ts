import { enumToArray } from "~/utils/enumToArray"
import { ModelBrand, ModelScale, ModelType, ModelTheme, type Model } from "~/types/model"
import { filterModelsByCriteria, presentOptions, excludeOptions } from "~/utils/modelFilter"

export default (
  models: Ref<Model[]> | ComputedRef<Model[]>,
  config?: { optionsSource?: 'enum' | 'models'; excludeTypeOptions?: string[] }
) => {
  const allBrandOptions = enumToArray(ModelBrand)
  const allScaleOptions = enumToArray(ModelScale)
  const allTypeOptions = enumToArray(ModelType)
  const allThemeOptions = enumToArray(ModelTheme)
  const optionsSource = config?.optionsSource ?? 'enum'
  const excludeTypeOptions = config?.excludeTypeOptions ?? []

  const { filterModelsByKeyword } = useModelKeywordFilter()

  const selectedBrand = ref('')
  const selectedScale = ref('')
  const selectedType = ref('')
  const selectedTheme = ref('')
  const selectedKeyword = ref('')

  const brandOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'brand', allBrandOptions) : allBrandOptions
  )
  const scaleOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'scale', allScaleOptions) : allScaleOptions
  )
  const typeOptions = computed(() => {
    const base = optionsSource === 'models' ? presentOptions(models.value, 'type', allTypeOptions) : allTypeOptions
    return excludeOptions(base, excludeTypeOptions)
  })
  const themeOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'theme', allThemeOptions) : allThemeOptions
  )

  const filteredModels = computed<Model[]>(() => {
    const byCriteria = filterModelsByCriteria(models.value, {
      brand: selectedBrand.value,
      type: selectedType.value,
      scale: selectedScale.value,
      theme: selectedTheme.value,
    })
    return filterModelsByKeyword(byCriteria, selectedKeyword.value)
  })

  function reSetFilter() {
    selectedBrand.value = ''
    selectedScale.value = ''
    selectedType.value = ''
    selectedTheme.value = ''
    selectedKeyword.value = ''
  }

  return {
    //data
    brandOptions,
    scaleOptions,
    typeOptions,
    themeOptions,
    selectedBrand,
    selectedScale,
    selectedType,
    selectedTheme,
    selectedKeyword,
    filteredModels,
    //methods
    reSetFilter,
  }
}
