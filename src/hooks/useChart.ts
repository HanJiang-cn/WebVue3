/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Ref, onBeforeUnmount, onMounted, ref, markRaw } from 'vue'
import * as echarts from 'echarts'

export function useChart(chartRef: Ref<HTMLElement | null>, setChartData: any) {
  // 用于存储图表实例的响应式引用
  const chartInstance = ref<echarts.ECharts | null>(null)
  //初始化图表实例并设置初始选项
  const initChart = () => {
    // 检查图表容器是否存在
    if (chartRef.value) {
      // 初始化图表实例
      chartInstance.value = markRaw(echarts.init(chartRef.value))
      // 获取图表数据
      const options = setChartData()
      // 设置图表选项
      chartInstance.value.setOption(options)
    }
  }

  //调整图表大小
  const resizeChart = () => {
    // 检查图表实例是否存在
    chartInstance.value?.resize()
  }

  //在组件挂载时初始化图表并添加窗口调整事件监听器
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  //在组件卸载前移除窗口调整事件监听器并销毁图表实例
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart)
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }
  })
}
