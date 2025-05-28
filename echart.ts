import type { EChartsOption } from 'echarts'

interface ChartData {
  xData: string[]
  series: Array<{
    name: string
    data: number[]
    type: 'bar' | 'line' | 'pie' // 可以根据需要扩展
  }>
}

// 基础图表配置
export const getBaseChartConfig = (title: string): EChartsOption => ({
  title: {
    text: title,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
})

// 柱状图配置生成器
export const getBarChartConfig = (
  title: string,
  data: ChartData,
  options: {
    yAxisName?: string
    barWidth?: string
    color?: string
  } = {}
): EChartsOption => {
  const { yAxisName = '', barWidth = '30%', color = '#409EFF' } = options

  return {
    ...getBaseChartConfig(title),
    xAxis: {
      type: 'category',
      data: data.xData,
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      max: function(value: { max: number }) {
        return Math.ceil(value.max * 1.2)
      }
    },
    series: data.series.map(item => ({
      ...item,
      barWidth,
      itemStyle: {
        color
      }
    }))
  }
}

// 折线图配置生成器
export const getLineChartConfig = (
  title: string,
  data: ChartData,
  options: {
    yAxisName?: string
    smooth?: boolean
    color?: string
  } = {}
): EChartsOption => {
  const { yAxisName = '', smooth = false, color = '#409EFF' } = options

  return {
    ...getBaseChartConfig(title),
    xAxis: {
      type: 'category',
      data: data.xData,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
      max: function(value: { max: number }) {
        return Math.ceil(value.max * 1.2)
      }
    },
    series: data.series.map(item => ({
      ...item,
      smooth,
      itemStyle: {
        color
      }
    }))
  }
}

// 图表实例管理
export class ChartManager {
  private static instances: Map<string, echarts.ECharts> = new Map()

  static setInstance(key: string, instance: echarts.ECharts) {
    this.instances.set(key, instance)
  }

  static getInstance(key: string) {
    return this.instances.get(key)
  }

  static removeInstance(key: string) {
    const instance = this.instances.get(key)
    if (instance) {
      instance.dispose()
      this.instances.delete(key)
    }
  }

  static resizeAll() {
    this.instances.forEach(instance => {
      instance.resize()
    })
  }
} 
