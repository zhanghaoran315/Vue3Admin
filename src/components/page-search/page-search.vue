<script lang="ts" setup>
import HrForm from '@/base-ui/form'
import { ref } from 'vue'

const props = defineProps({
  searchConfig: {
    type: Object,
    required: true
  }
})

const formItems = props.searchConfig.formItems
const formOriginData: Record<string, any> = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

// 这里只能用ref
const formData = ref(formOriginData)

const emit = defineEmits(['query', 'reset'])

const onQueryClick = () => {
  emit('query', formData.value)
}

const onResetClick = () => {
  formData.value = formOriginData
  // for (const key in formOriginData) {
  //   formData.value[key] = formOriginData[key]
  // }
  emit('reset')
}
</script>

<template>
  <div class="page-search">
    <hr-form v-bind="searchConfig" v-model="formData">
      <template #header>
        <div class="header">
          <h2>高级检索</h2>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <el-button type="primary" icon="Search" @click="onQueryClick"
            >搜索</el-button
          >
          <el-button icon="Refresh" @click="onResetClick">重置</el-button>
        </div>
      </template>
    </hr-form>
  </div>
</template>

<style scoped lang="less">
.page-search {
  padding-top: 18px;

  .header {
    color: #666;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 5px;

    text-align: center;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 50px 20px 0;
  }
}
</style>
