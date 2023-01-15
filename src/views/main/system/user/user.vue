<script setup lang="ts" name="user">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig, contentConfig } from './config'
import { ref } from 'vue'

import { usePageSearch } from '@/hooks'

const { pageContentRef, onQuery, onReset } = usePageSearch()

// const pageContentRef = ref<InstanceType<typeof PageContent>>()

// const onQuery = (params: any) => {
//   console.log('点击搜索：', params)
//   pageContentRef.value?.getPageData(params)
// }

// const onReset = () => {
//   console.log('点击重置')
//   pageContentRef.value?.getPageData()
// }
</script>

<template>
  <div class="user">
    <PageSearch
      :searchConfig="searchConfig"
      @query="onQuery"
      @reset="onReset"
    />
    <PageContent
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="users"
    />
  </div>
</template>

<style scoped>
.user {
  height: 100%;
}
</style>
