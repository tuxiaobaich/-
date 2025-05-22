<template>
  <el-table :data="filteredData" border style="width: 100%;">
    <el-table-column prop="name" label="姓名">
      <template #header>
        <div class="header-filter">
          姓名
          <ColumnFilter
            :options="nameOptions"
            v-model="filters.name"
            placeholder="搜索姓名"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template #header>
        <div class="header-filter">
          状态
          <ColumnFilter
            :options="statusOptions"
            v-model="filters.status"
            placeholder="搜索状态"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="role" label="角色">
      <template #header>
        <div class="header-filter">
          角色
          <ColumnFilter
            :options="roleOptions"
            v-model="filters.role"
            placeholder="搜索角色"
          />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import ColumnFilter from './ColumnFilter.vue'
import { ref, computed } from 'vue'

// 示例数据
const tableData = ref([
  { name: '张三', status: '已通过', role: '管理员' },
  { name: '李四', status: '待审核', role: '用户' },
  { name: '王五', status: '已拒绝', role: '用户' },
  { name: '赵六', status: '已通过', role: '管理员' }
])

// 各列可选项
const nameOptions = [
  { label: '张三', value: '张三' },
  { label: '李四', value: '李四' },
  { label: '王五', value: '王五' },
  { label: '赵六', value: '赵六' }
]
const statusOptions = [
  { label: '全部', value: '' },
  { label: '待审核', value: '待审核' },
  { label: '已通过', value: '已通过' },
  { label: '已拒绝', value: '已拒绝' }
]
const roleOptions = [
  { label: '全部', value: '' },
  { label: '管理员', value: '管理员' },
  { label: '用户', value: '用户' }
]

// 筛选条件
const filters = ref({
  name: '',
  status: '',
  role: ''
})



// 过滤数据
const filteredData = computed(() => {
  console.log('filters', filters.value)
  return tableData.value.filter(row => {
    return (!filters.value.name || row.name === filters.value.name)
      && (!filters.value.status || row.status === filters.value.status)
      && (!filters.value.role || row.role === filters.value.role)
  })
})
</script>

<style scoped>
.header-filter {
  display: flex;
  align-items: center;
}
.filter-panel {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 180px;
  overflow-y: auto;
}
.filter-panel li {
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
  font-size: 14px;
}
.filter-panel li.active,
.filter-panel li:hover {
  background: #409eff;
  color: #fff;
}
</style>
