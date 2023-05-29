<script lang="ts" setup>
import { useRouter } from 'vue-router'
const emits = defineEmits(['changeComp'])

const router = useRouter()

const onBack = (row: any) => {
  emits('changeComp', 'ListTable')
  // router.back()
}
</script>

<template>
  <div class="list-detail">
    <h2>list-detail</h2>
    <el-button type="primary" @click="onBack">返回</el-button>
  </div>
</template>

<style scoped lang="less">
.list-detail {
  padding: 20px;
  height: 600px;
}
</style>
