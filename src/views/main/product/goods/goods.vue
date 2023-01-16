<script setup lang="ts" name="goods">
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
</script>

<template>
  <div class="goods">
    <PageContent :content-config="contentConfig" page-name="goods">
      <template #oldPrice="{ row, prop }">
        {{ '¥ ' + row[prop] }}
      </template>
      <template #newPrice="{ row, prop }">
        {{ '¥ ' + row[prop] }}
      </template>
      <template #image="{ row, prop }">
        <el-image
          style="width: 70px; height: 80px"
          :src="row[prop]"
          :zoom-rate="1.2"
          :preview-src-list="[row[prop]]"
          fit="cover"
          preview-teleported
        />
      </template>
    </PageContent>
  </div>
</template>

<style scoped>
.goods {
  height: 100%;
}
</style>
