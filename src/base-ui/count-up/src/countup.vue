<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

const props = defineProps({
  number: {
    type: Number,
    default: 0
  },
  option: {
    type: Object,
    default: () => ({})
  }
})

const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 1, // 动画时长
  separator: ',', // 千分位分隔
  decimal: '.', // 小数分隔
  prefix: '￥' // 前缀
}

const counterRef = ref<HTMLElement | null>(null)
const instance = ref<CountUp | null>(null)

onMounted(() => {
  createCounter()
})

watch(
  () => props.number,
  () => {
    update(props.number)
  }
)

const createCounter = () => {
  if (!counterRef.value) return
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  instance.value = new CountUp(counterRef.value, props.number, opts)
  instance.value.start()
}

const update = (number: number) => {
  if (!instance.value) return
  instance.value.update(number)
}
</script>

<template>
  <div class="count-up">
    <span ref="counterRef"></span>
  </div>
</template>

<style scoped lang="less"></style>
