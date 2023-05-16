<script setup lang="ts" name="department">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PagePopup from '@/components/page-popup/page-popup.vue'
import { searchConfig, contentConfig, popupConfig } from './config'
import { usePagePopup, usePageSearch } from '@/hooks'

const { pagePopupRef, defaultInfo, onCreate, onUpdate } = usePagePopup()

const { onQuery, onReset, pageContentRef } = usePageSearch()
</script>

<template>
  <div class="department">
    <PageSearch
      :searchConfig="searchConfig"
      @query="onQuery"
      @reset="onReset"
    />
    <PageContent
      :contentConfig="contentConfig"
      pageName="department"
      ref="pageContentRef"
      @create="onCreate"
      @update="onUpdate"
    />
    <PagePopup
      pageName="department"
      ref="pagePopupRef"
      :defaultInfo="defaultInfo"
      :popupConfig="popupConfig"
    />
  </div>
</template>

<style scoped>
.department {
  height: 100%;
}
</style>
