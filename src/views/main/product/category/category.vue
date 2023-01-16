<script setup lang="ts" name="category">
import One from './cpns/index.vue'
</script>

<template>
  <div class="category">
    <h2>category</h2>
    <template v-if="undefined">
      <one>
        <template #one></template>
      </one>
    </template>
  </div>
</template>

<style scoped>
.category {
  height: 100%;
}
</style>
