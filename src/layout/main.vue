<script lang="ts" setup name="main-container">
import MainHeader from './main-header/main-header.vue'
import MainAside from './main-aside/main-aside.vue'

import { ref } from 'vue'

const isCollapse = ref(false)

const onFoldChange = (isFold: boolean) => (isCollapse.value = isFold)
</script>

<template>
  <div class="main">
    <el-container class="container">
      <el-aside class="aside" :width="isCollapse ? '60px' : '210px'">
        <main-aside :is-collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header" height="48px">
          <MainHeader @foldChange="onFoldChange" />
        </el-header>
        <el-main class="page-content" id="global-scroll-wrap">
          <div class="wrapper">
            <router-view v-slot="{ Component }">
              <transition name="zhr" mode="out-in">
                <!-- <keep-alive exclude="dashboard"> -->
                <component :is="Component"></component>
                <!-- </keep-alive> -->
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop :right="100" :bottom="100" target="#global-scroll-wrap" />
  </div>
</template>

<style scoped lang="less">
.zhr-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.zhr-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.zhr-enter-active,
.zhr-leave-avtive {
  transition: all 0.5s ease;
}
.main {
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;

  .aside {
    transition: width 0.3s ease;
  }

  .page {
    height: 100%;
    .page-header {
      background-color: aqua;
    }

    .page-content {
      height: calc(100% - 48px);
      overflow-y: auto;
      background-color: #f0f2f5;

      .wrapper {
        border-radius: 5px;
        background-color: #fff;
      }
    }
  }
}
</style>
