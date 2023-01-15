<script setup lang="ts" name="department">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig, contentConfig } from './config'
</script>

<template>
  <div class="department">
    <PageSearch :searchConfig="searchConfig" />
    <PageContent :contentConfig="contentConfig" pageName="department" />
  </div>
</template>

<style scoped>
.department {
  height: 100%;
}
</style>
