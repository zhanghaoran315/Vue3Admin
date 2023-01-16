import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const onQuery = (params: any) => {
    ;(pageContentRef.value as any).getPageData(params)
  }

  const onReset = () => {
    ;(pageContentRef.value as any).getPageData()
  }

  return { pageContentRef, onQuery, onReset }
}
