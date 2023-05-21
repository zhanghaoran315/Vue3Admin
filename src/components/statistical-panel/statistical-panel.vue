<script lang="ts" setup>
import HrCountUp from '@/base-ui/count-up'
import type { CountUpOptions } from 'countup.js'

defineProps({
  panelData: {
    type: Object,
    default: () => ({})
  }
})

const option1: CountUpOptions = {
  decimalPlaces: 0, // 保留两位
  prefix: '' // 单位
}

const option2: CountUpOptions = {
  decimalPlaces: 0, // 保留两位
  prefix: '￥' // 单位
}
</script>

<template>
  <div class="statistical-panel">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <HrCountUp
        :number="panelData.number1"
        :option="panelData.amount === 'saleroom' ? option2 : option1"
      />
    </div>
    <div class="footer">
      <div class="sub-title">
        {{ panelData.subtitle }}
      </div>
      <HrCountUp
        :number="panelData.number2"
        :option="panelData.amount === 'saleroom' ? option2 : option1"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.statistical-panel {
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 0 20px;
  background-color: #fff;
  // box-shadow: 0 2px 12px 0 rgb(0 0 0, 0.1);

  height: 130px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .content {
    flex: 1;
    color: rgba(0, 0, 0, 0.85);
    font-size: 26px;

    display: flex;
    align-items: center;
  }

  .footer {
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);

    border-top: 1px solid #f0f0f0;
    letter-spacing: 1px;
    display: flex;
    align-items: center;

    .sub-title {
      margin-right: 5px;
    }
  }
}
</style>
