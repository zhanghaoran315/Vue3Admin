<script setup lang="ts">
import type { PropType } from 'vue'

interface ITextArrs {
  title: string
  desp: string
}

defineProps({
  textArrs: {
    type: Array as PropType<ITextArrs[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="text-link">
    <template v-for="(item, index) in textArrs" :key="index">
      <div class="item">
        <div class="title">{{ item.title }} :</div>
        <el-link type="primary">{{ item.desp }}</el-link>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;

  padding-left: 15px;

  .title {
    margin-right: 20px;

    position: relative;

    &::before {
      position: absolute;
      content: '';
      width: 5px;
      height: 5px;
      background: #000;
      border-radius: 50%;
      left: -15px;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
  }

  margin: 8px;
}
</style>
