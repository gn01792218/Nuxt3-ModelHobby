import { beforeAll, beforeEach, vi } from 'vitest'
import { config } from '@vue/test-utils'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

// 全域設定
config.global.mocks = {}

// 在每個測試之前重置 Pinia
beforeEach(() => {
  setActivePinia(createPinia())
})