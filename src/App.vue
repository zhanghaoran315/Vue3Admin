<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
