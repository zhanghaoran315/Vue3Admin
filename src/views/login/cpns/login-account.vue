<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { localCache } from '@/utils'
import { accountRules } from '../config/accountRules'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores'
import type { IAccount } from '@/types'

const LOGIN_NAME = 'name'
const LOGIN_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getItem(LOGIN_NAME) ?? '',
  password: localCache.getItem(LOGIN_PASSWORD) ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // console.log('表单验证通过', account)
      loginStore.accountLoginAction({ ...account }).then(() => {
        if (isKeepPassword) {
          localCache.setItem(LOGIN_NAME, account.name)
          localCache.setItem(LOGIN_PASSWORD, account.password)
        } else {
          localCache.deleteItem(LOGIN_NAME)
          localCache.deleteItem(LOGIN_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="login-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60"
      ref="formRef"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input
          v-model="account.name"
          placeholder="请输入账号"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          placeholder="请输入密码"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
