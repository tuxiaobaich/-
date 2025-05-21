<template>
  <div>
    {{ formatDate(getMondayOfWeek(dateTime)) }}
    <el-date-picker
      v-model="value1"
      type="week"
      format="[Week] ww"
      value-format="YYYY-ww"
      placeholder="Pick a week"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref('')
const dateTime = ref('')

function getMondayOfWeek(weekStr: string): Date | null {
  if (!weekStr) return null
  const [yearStr, weekNumStr] = weekStr.split('-')
  const year = Number(yearStr)
  const week = Number(weekNumStr)
  if (!year || !week) return null

  // 计算该年第1天
  const firstDay = new Date(year, 0, 1)
  // 计算本年第一个周一
  const firstMonday = new Date(firstDay)
  const day = firstDay.getDay()
  // 0:周日, 1:周一, ..., 6:周六
  const diff = day === 0 ? 1 : 8 - day
  firstMonday.setDate(firstDay.getDate() + diff - 1)

  // 计算目标周的周一
  const monday = new Date(firstMonday)
  monday.setDate(firstMonday.getDate() + (week - 1) * 7)
  return monday
}

// 格式化为 yyyy-MM-dd
function formatDate(date: Date | null) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const handleChange = (val: string) => {
  dateTime.value = val
}
</script>
