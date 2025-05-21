<template>
  <div>
    {{ formatDate(getFirstDayOfWeek(dateTime)) }}
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

/**
 * 根据ISO周数获取该周第一天的日期
 * @param {string} weekString - 格式为"YYYY-WW"的周数字符串，例如"2025-21"
 * @returns {Date} 返回该周第一天的Date对象（周一）
 */
function getFirstDayOfWeek(weekString) {
  // // 验证输入格式
  if (!/^\d{4}-W\d{2}$/.test(weekString)) {
    throw new Error('Invalid week format. Expected format: "YYYY-WW"');
  }

  // 解析年份和周数
  const [year, week] = weekString.split('-').map((s, i) => 
    i === 1 ? parseInt(s.replace('W', ''), 10) : parseInt(s, 10)
  );

  // 验证周数范围 (1-53)
  if (week < 1 || week > 53) {
    throw new Error('Week number must be between 1 and 53');
  }

  // 创建一个日期对象，设置为该年的1月4日（根据ISO标准，这一天总是在第一周）
  const januaryFourth = new Date(year, 0, 4);
  
  // 获取1月4日是星期几（0=周日，1=周一，...，6=周六）
  const dayOfWeek = januaryFourth.getDay();
  
  // 计算该年第一周的周一日期
  const firstWeekMonday = new Date(year, 0, 4 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  // 计算目标周的周一日期
  const targetWeekMonday = new Date(firstWeekMonday);
  targetWeekMonday.setDate(firstWeekMonday.getDate() + (week - 1) * 7);
  
  // 验证结果年份是否正确（防止跨年情况）
  if (targetWeekMonday.getFullYear() > year) {
    throw new Error('Invalid week number for the given year');
  }
  
  return targetWeekMonday;
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
