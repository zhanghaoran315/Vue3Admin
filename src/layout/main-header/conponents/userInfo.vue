<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'
import ScreenFull from 'screenfull'
import { useLoginStore } from '@/stores'
import { storeToRefs } from 'pinia'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)

const avatarUrl = userInfo.value.avatarUrl
const userName = userInfo.value.name

const router = useRouter()

const onCommand = (type: string) => {
  switch (type) {
    case 'profile':
      router.push('/main/profile')
      break
    case 'max':
      router.push('/screenfull')
      break
    case 'gitee':
      location.href = 'https://gitee.com/zhang-hara/vue-ts-pinia-cms'
      break
    case 'logout':
      logout()
      break
    default:
      console.log('无指令')
  }
}

const logout = () => {
  localCache.deleteItem(LOGIN_TOKEN)

  router.push('/login')
}

const isFullScreen = ref(false)

const onFullScreen = () => {
  if (ScreenFull.isEnabled) {
    ScreenFull.toggle()

    isFullScreen.value = !isFullScreen.value
  }
}
</script>

<template>
  <div class="user-info">
    <el-icon class="icon" size="22" @click="onFullScreen">
      <component :is="isFullScreen ? 'scale-to-original' : 'full-screen'" />
    </el-icon>
    <el-dropdown @command="onCommand">
      <div class="dropdown">
        <el-avatar :size="30" fit="contain" :src="avatarUrl" />
        <span class="text">{{ userName }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="profile">
            <el-icon><User /></el-icon>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item command="max">
            <el-icon><PieChart /></el-icon>
            大屏适配
          </el-dropdown-item>
          <el-dropdown-item command="gitee">
            <el-icon><Share /></el-icon>
            gitee地址
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <el-icon><User /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;

  .icon {
    cursor: pointer;
    margin-right: 15px;
  }

  .dropdown {
    display: flex;
    align-items: center;

    .text {
      margin-left: 7px;
    }
  }

  :global(.el-dropdown-menu__item) {
    line-height: 24px;
  }
}
</style>
