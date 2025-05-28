<template>
  <div class="box">
    <div class="screen-container">
      <div class="charts-wrapper">
        <div ref="barChartRef" class="chart-container"></div>
        <div ref="lineChartRef" class="chart-container"></div>
      </div>
    </div>
    <div class="right-container">
      内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { getBarChartConfig, getLineChartConfig, ChartManager } from '@/utils/echarts'

const barChartRef = ref()
const lineChartRef = ref()

const products = [
  { id: 1, name: '笔记本电脑', price: 999, stock: 15 },
  { id: 2, name: '智能手机', price: 699, stock: 23 },
  { id: 3, name: '平板电脑', price: 399, stock: 8 },
  { id: 4, name: '智能手表', price: 299, stock: 30 },
  { id: 5, name: '无线耳机', price: 199, stock: 45 },
  { id: 6, name: '游戏主机', price: 499, stock: 12 },
  { id: 7, name: '显示器', price: 349, stock: 18 },
  { id: 8, name: '键盘', price: 129, stock: 35 },
  { id: 9, name: '鼠标', price: 79, stock: 50 },
  { id: 10, name: '摄像头', price: 89, stock: 25 },
  { id: 11, name: '打印机', price: 299, stock: 10 },
  { id: 12, name: '路由器', price: 159, stock: 20 }
]

const BAR_CHART_KEY = 'productStock'
const LINE_CHART_KEY = 'productPrice'

function renderBarChart() {
  if (!barChartRef.value) return
  
  const chart = ChartManager.getInstance(BAR_CHART_KEY) || echarts.init(barChartRef.value)
  
  const chartData = {
    xData: products.map(item => item.name),
    series: [{
      name: '库存',
      type: 'bar' as const,
      data: products.map(item => item.stock)
    }]
  }

  const option = getBarChartConfig('产品库存柱形图', chartData, {
    yAxisName: '库存数量'
  })

  chart.setOption(option)
  ChartManager.setInstance(BAR_CHART_KEY, chart)
}

function renderLineChart() {
  if (!lineChartRef.value) return
  
  const chart = ChartManager.getInstance(LINE_CHART_KEY) || echarts.init(lineChartRef.value)
  
  const chartData = {
    xData: products.map(item => item.name),
    series: [{
      name: '价格',
      type: 'line' as const,
      data: products.map(item => item.price)
    }]
  }

  const option = getLineChartConfig('产品价格趋势', chartData, {
    yAxisName: '价格 ($)',
    smooth: true,
    color: '#67C23A'  // 使用Element Plus的成功色
  })

  chart.setOption(option)
  ChartManager.setInstance(LINE_CHART_KEY, chart)
}

// 处理窗口大小变化
const handleResize = () => {
  ChartManager.resizeAll()
}

onMounted(() => {
  renderBarChart()
  renderLineChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  ChartManager.removeInstance(BAR_CHART_KEY)
  ChartManager.removeInstance(LINE_CHART_KEY)
})
</script>

<style scoped>
.box {
  display: flex;
  width: 100%;
  height: 100%;
}

.screen-container {
  display: flex;
  min-width: 500px;
  height: 100%;
  flex: 1;
}

.charts-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-container {
  width: 100%;
  height: 400px;
  min-width: 500px;
}

.right-container {
  width: 300px;
  height: 100%;
  background-color: red;
  border: 1px solid #000;
}
</style>

