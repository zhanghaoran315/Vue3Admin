<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'
import type { IFormItem } from '..'

const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  modelValue: {
    type: Object,
    required: true
  },
  colLayout: {
    type: Object,
    default: () => ({
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8,
      xl: 8
    })
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '5px 30px' })
  }
})

const emit = defineEmits(['update:model-value'])

const onValueChange = (value: any, field: string) => {
  emit('update:model-value', { ...props.modelValue, [field]: value })
}

const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    emit('update:model-value', newValue)
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.field">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[item.field]"
                >
                  <el-option
                    v-for="iten in item.options"
                    :key="iten.value"
                    v-bind="iten"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[item.field]"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
