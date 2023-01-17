<script lang="ts" setup>
import HrForm from '@/base-ui/form'
import { ref, watch, computed } from 'vue'
import { useSystemStore } from '@/stores'
const props = defineProps({
  pageName: {
    type: String,
    required: true
  },
  popupConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
})

const visible = ref(false)

const formData = ref({})

const title = computed(() => (props.defaultInfo.id ? '编辑数据' : '新增数据'))

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.popupConfig.formItems) {
      formData.value[item.field] = newValue[item.field]
    }
  }
)

const systemStore = useSystemStore()
const onConfirm = () => {
  // 确认弹窗需要区分编辑还是新增
  if (props.defaultInfo.id) {
    // 编辑
    systemStore.updatePageItem(
      props.pageName,
      {
        ...formData.value,
        ...props.otherInfo
      },
      props.defaultInfo.id
    )
  } else {
    // 新增
    systemStore.createPageItem(props.pageName, {
      ...formData.value,
      ...props.otherInfo
    })
  }
  visible.value = false
}

const onCancel = () => {
  visible.value = false
}

defineExpose({ visible })
</script>

<template>
  <div class="page-popup">
    <el-dialog
      v-model="visible"
      :title="title"
      width="30%"
      center
      destroy-on-close
    >
      <hr-form v-bind="popupConfig" v-model="formData"></hr-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onConfirm"> 确定 </el-button>
          <el-button @click="onCancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.page-popup {
  &:deep(.el-dialog__body) {
    padding-bottom: 15px;
  }
}
</style>
