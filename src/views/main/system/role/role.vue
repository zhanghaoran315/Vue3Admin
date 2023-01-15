<script setup lang="ts" name="role">
import PageContent from '@/components/page-content/page-content.vue'
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig, contentConfig } from './config'
</script>

<template>
  <div class="role">
    <PageSearch :searchConfig="searchConfig" />
    <PageContent :contentConfig="contentConfig" pageName="role" />
  </div>
</template>

<style scoped>
.role {
  height: 100%;
}
</style>
