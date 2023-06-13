<script lang="ts" setup>
import { nextTick, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'
interface IProps {
  data: any[]
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => []
})

watch(
  () => props.data,
  async (newVal) => {
    await nextTick()
    startAnimation(newVal)
  }
)

const startAnimation = (data: any[]) => {
  // 等DOM 更新完成之后执行
  const option1: CountUpOptions = {
    decimalPlaces: 1, // 保留一位小数
    duration: 2,
    useGrouping: false // 1000 -> 1,000
  }

  const option2: CountUpOptions = {
    decimalPlaces: 1, // 保留一位小数
    duration: 2,
    useGrouping: false,
    suffix: '%'
  }

  data.forEach((item) => {
    new CountUp(`total-${item.id}`, item.totalNum, option1).start()
    new CountUp(`percentage-${item.id}`, item.percentage, option2).start()
  })
}
</script>

<template>
  <div class="count-panel">
    <template v-for="item in data" :key="item.id">
      <div class="item">
        <div class="item-left">
          <div class="title">{{ item.title }}</div>
          <div :id="`total-${item.id}`" class="total">{{ item.totalNum }}</div>
          <div class="unit">{{ item.unit }}</div>
        </div>
        <div class="item-right">
          <i :class="['triangle', item.isUp ? 'up' : 'down']"></i>
          <div :id="`percentage-${item.id}`" class="percentage">
            {{ item.percentage }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.count-panel {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  .item {
    flex: 1;
    height: 100%;
    padding: 0 10px 0 35px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;

    .item-left {
      opacity: 0.8;
      .title {
        font-size: 16px;
        color: #fff;
      }

      .total {
        display: inline-block;
        font-size: 36px;
        font-weight: 700;
        color: #23aeff;
        line-height: 60px;
      }

      .unit {
        display: inline-block;
        font-size: 18px;
        color: #23aeff;
      }
    }

    .item-right {
      margin-top: 35px;

      .triangle {
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;

        &.up {
          border-bottom: 8px solid #c70013;
          margin-bottom: 4px;
        }

        &.down {
          border-top: 8px solid #c70013;
        }
      }

      .percentage {
        display: inline-block;
        color: #c70013;
      }
    }
  }
}
</style>
