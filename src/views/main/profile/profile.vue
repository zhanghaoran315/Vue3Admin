<script lang="ts" setup name="profile">
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import config from '@/global/config'
import { localCache } from '@/utils'
import { LOGIN_TOKEN } from '@/global'

const token = localCache.getItem(LOGIN_TOKEN)

const headers = {
  authorization: 'Bearer ' + token
}

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)

const router = useRouter()
const goBack = () => {
  router.back()
}

// http://localhost:5000/users/avatar/1
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('上传成功的勾子：', response)
  if (response.code === 200) location.reload()

  console.log('上传成功的勾子的第二个参数：', uploadFile)

  // const url = URL.createObjectURL(uploadFile.raw!)

  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const handleAvatarError = (res: any) => {
  console.log(res)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="profile">
    <h2 class="title">个人中心</h2>
    <div class="content">
      <div class="left">
        <el-avatar :size="180" :src="userInfo.avatarUrl" />
      </div>
      <div class="right">
        <el-form :model="userInfo" disabled label-width="80">
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="真实姓名">
                <el-input v-model="userInfo.realName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input v-model="userInfo.cellphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色">
                <el-input v-model="userInfo.role.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在部门">
                <el-input v-model="userInfo.department.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="修改头像">
            <el-upload
              class="avatar-uploader"
              :action="config.avatarUploadUrl"
              name="avatar"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="operate">
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.profile {
  padding: 20px;
  height: 600px;

  .title {
    text-align: center;
  }

  .content {
    // margin-top: 20px;
    padding: 20px;
    display: flex;
    // justify-content: center;

    .left {
      width: 400px;
      // background-color: red;
      display: flex;
      justify-content: center;
    }

    .right {
      flex: 1;
      padding-right: 100px;
      // background-color: red;
      .label {
        font-weight: 700;
        margin-bottom: 10px;
      }
      .operate {
        padding-left: 50px;
        margin-top: 20px;
      }
    }
  }

  .avatar-uploader {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
