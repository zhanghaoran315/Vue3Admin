<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { phoneRules } from '../config/phoneRules'
import { ElForm } from 'element-plus'

const phone = reactive({
  number: '',
  code: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('手机登录')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="login-phone">
    <el-form
      :model="phone"
      :rules="phoneRules"
      label-width="80"
      status-icon
      ref="formRef"
    >
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" placeholder="请输入验证码" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.login-phone {
  .get-code {
    display: flex;
    justify-content: space-between;

    .get-btn {
      margin-left: 5px;
    }
  }
}
</style>
