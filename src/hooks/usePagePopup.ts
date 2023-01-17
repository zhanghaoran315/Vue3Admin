import type PagePopup from '@/components/page-popup/page-popup.vue'
import { ref } from 'vue'

type callbackFn = (item?: any) => void

export function usePagePopup(createCb?: callbackFn, updateCb?: callbackFn) {
  const pagePopupRef = ref<InstanceType<typeof PagePopup>>()

  const defaultInfo = ref({})

  const onCreate = () => {
    defaultInfo.value = {}
    if (pagePopupRef.value) {
      ;(pagePopupRef.value.visible as any) = true
    }
    createCb && createCb()
  }

  const onUpdate = (item: any) => {
    defaultInfo.value = { ...item }
    if (pagePopupRef.value) {
      ;(pagePopupRef.value.visible as any) = true
    }
    updateCb && updateCb(item)
  }

  return {
    pagePopupRef,
    defaultInfo,
    onCreate,
    onUpdate
  }
}
