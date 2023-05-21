<template>
  <div class="overview">
    <el-card shadow="never" header="关于">
      <div class="card-content">
        Vue3Admin 是一个基于
        Vue3、TypeScript、ElementPlus、Node、Koa、Mysql的全栈后台管理系统Demo项目。
      </div>
    </el-card>
    <el-card class="mt-15" shadow="never" header="技术栈">
      <div class="card-content">
        <text-link :textArrs="technologyStacks"></text-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="overview">
import TextLink from './cpns/text-link.vue'
import { technologyStacks } from './config'
</script>

<style lang="less" scoped>
.overview {
  background-color: #f0f2f5;

  :deep(.el-card__header) {
    padding: 10px 20px !important;
    font-weight: 700;
  }

  .mt-15 {
    margin-top: 15px;
  }
}
</style>
