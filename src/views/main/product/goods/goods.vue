<script setup lang="ts" name="goods">
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
</script>

<template>
  <div class="goods">
    <PageContent
      :content-config="contentConfig"
      page-name="goods"
    ></PageContent>
  </div>
</template>

<style scoped>
.goods {
  height: 100%;
}
</style>
