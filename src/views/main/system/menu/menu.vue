<script setup lang="ts" name="menu-c">
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
</script>

<template>
  <div class="menu">
    <PageContent :contentConfig="contentConfig" pageName="menu" />
  </div>
</template>

<style scoped>
.menu {
  height: 100%;
}
</style>
