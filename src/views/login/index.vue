<script lang="ts" setup>
import LoginAccount from './cpns/login-account.vue'
import LoginPhone from './cpns/login-phone.vue'

import { ref } from 'vue'

const isKeepPassword = ref<boolean>(true)

const currentTab = ref('account')

const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

const onLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else if (currentTab.value === 'phone') {
    phoneRef.value?.loginAction()
  }
}

const noKeepPassword = () => (isKeepPassword.value = false)
</script>

<template>
  <div class="login">
    <div class="login-panel">
      <h2 class="title">Vue-TS-Pinia-CMS</h2>
      <el-tabs type="border-card" stretch v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <LoginAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <LoginPhone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="control">
        <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
        <el-link type="primary" :underline="false" @click="noKeepPassword"
          >忘记密码</el-link
        >
      </div>
      <el-button
        type="primary"
        class="login-btn"
        size="large"
        @click="onLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('@/assets/img/login-bg.svg');
}

.login-panel {
  width: 340px;
  margin-top: -120px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }

  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
