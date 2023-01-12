<script lang="ts" setup>
import { useLoginStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { mapPathToMenu } from '@/utils'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const { userMenus } = storeToRefs(useLoginStore())

const router = useRouter()
const onMenuClick = (menu: any) => {
  router.push(menu.url)
}

// ElMenu的激活菜单
// 1.手动修改url,展示对应的菜单
// 2.
const route = useRoute()
const defaultActive = computed(() => {
  const currentMenu = mapPathToMenu(route.path, userMenus.value)
  return currentMenu.id.toString()
})
</script>

<template>
  <div class="main-aside">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="Vue+TS+Pinia" />
      <h2 class="title" v-show="!isCollapse">Vue+TS+Pinia</h2>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isCollapse"
        :default-active="defaultActive"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
      >
        <!-- 遍历菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <!-- 有子菜单的一级菜单 -->
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon>
                  <component :is="item.icon.split('-icon-')[1]"></component>
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="iten in item.children" :key="iten.id">
                <el-menu-item
                  :index="iten.id + ''"
                  @click="onMenuClick(iten)"
                  >{{ iten.name }}</el-menu-item
                >
              </template>
            </el-sub-menu>
          </template>
          <!-- 无子菜单的一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">{{ item.name }}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-aside {
  height: 100%;
  color: #fff;
  // 菜单剩下的部分
  background-color: #0c2135;

  overflow: hidden;
  .logo {
    display: flex;
    align-items: center;

    height: 28px;
    padding: 10px 10px;

    background-color: #001529;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
    }
  }

  .menu {
    width: 100%;
    background-color: #001529;
  }

  .el-menu {
    border-right: none;
    user-select: none;

    width: 100%;

    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px;
        background-color: #0c2135;

        &:hover {
          color: #fff;
        }

        &.is-active {
          background-color: #0a60bd;
        }
      }
    }
  }
}
</style>
