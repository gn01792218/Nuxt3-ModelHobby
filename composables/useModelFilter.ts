import { enumToArray } from "~/utils/enumToArray"
import { ModelBrand, ModelScale, ModelType, type Model } from "~/types/model"
import { filterModelsByCriteria, presentOptions } from "~/utils/modelFilter"

export default (
  models: Ref<Model[]> | ComputedRef<Model[]>,
  config?: { optionsSource?: 'enum' | 'models' }
) => {
  const allBrandOptions = enumToArray(ModelBrand)
  const allScaleOptions = enumToArray(ModelScale)
  const allTypeOptions = enumToArray(ModelType)
  const optionsSource = config?.optionsSource ?? 'enum'

  const selectedBrand = ref('')
  const selectedScale = ref('')
  const selectedType = ref('')

  const brandOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'brand', allBrandOptions) : allBrandOptions
  )
  const scaleOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'scale', allScaleOptions) : allScaleOptions
  )
  const typeOptions = computed(() =>
    optionsSource === 'models' ? presentOptions(models.value, 'type', allTypeOptions) : allTypeOptions
  )

  const filteredModels = computed<Model[]>(() =>
    filterModelsByCriteria(models.value, {
      brand: selectedBrand.value,
      type: selectedType.value,
      scale: selectedScale.value,
    })
  )

  function reSetFilter() {
    selectedBrand.value = ''
    selectedScale.value = ''
    selectedType.value = ''
  }

  return {
    //data
    brandOptions,
    scaleOptions,
    typeOptions,
    selectedBrand,
    selectedScale,
    selectedType,
    filteredModels,
    //methods
    reSetFilter,
  }
}
