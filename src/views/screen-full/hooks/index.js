import * as echarts from 'echarts'
import { onUnmounted, ref } from 'vue'

export default function useEchart2(divEl) {
  const echartInstance = echarts.init(divEl, null)

  onUnmounted(() => {
    echartInstance.dispose()
  })

  const setOption = (option) => echartInstance.setOption(option)

  const resizeEchart = () => echartInstance.resize()

  return {
    echartInstance,
    setOption,
    resizeEchart
  }
}
