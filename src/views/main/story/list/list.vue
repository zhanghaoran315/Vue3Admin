<script setup lang="ts" name="list">
import PageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'
import { contentConfig } from './config'
</script>

<template>
  <div class="list">
    <PageContent
      pageName="moment"
      ref="pageContentRef"
      :contentConfig="contentConfig"
    >
      <template #author="{ row }">
        <span>{{ row.author.name }}</span>
      </template>
    </PageContent>
  </div>
</template>

<style scoped>
.list {
  padding: 20px;
}
</style>
