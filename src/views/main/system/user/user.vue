<script setup lang="ts" name="user">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig } from './config'

const onQueryClick = (value: any) => {
  console.log('点击搜索：', value)
}

const onResetClick = () => {
  console.log('点击重置')
}
</script>

<template>
  <div class="user">
    <PageSearch
      :searchConfig="searchConfig"
      @query="onQueryClick"
      @reset="onResetClick"
    />
    <PageContent pageName="users" />
  </div>
</template>

<style scoped>
.user {
  height: 100%;
}
</style>
