<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="screen-full">
    <h2>first</h2>
    <div class="back">
      <el-affix :offset="120">
        <el-button type="primary" @click="router.back">返回</el-button>
      </el-affix>
    </div>
  </div>
</template>

<style scoped lang="less">
.screen-full {
  width: 100%;
  height: 100%;

  background-color: #bfa;

  .back {
    float: right;
  }
}
</style>
