<template>
  <el-popover
    placement="bottom"
    trigger="click"
    v-model:visible="visible"
    width="220"
  >
    <template #reference>
      <el-icon style="cursor:pointer;margin-right:6px;">
        <Filter />
      </el-icon>
    </template>
    <el-input
      v-model="search"
      size="small"
      :placeholder="`搜索${placeholder || ''}`"
      clearable
      style="margin-bottom: 8px;"
    />
    <ul class="filter-panel">
      <li
        v-for="item in filteredOptions"
        :key="item.value"
        :class="{ active: item.value === modelValue }"
        @click="select(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: [String, Number],
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const search = ref('')

// 过滤后的选项
const filteredOptions = computed(() =>
  props.options.filter(
    (opt: any) => !search.value || opt.label.includes(search.value)
  )
)

function select(item: any) {
    console.log('item.value', item.value)
  emit('update:modelValue', item.value)
  visible.value = false
  search.value = ''
}

// 选中变化时清空搜索
watch(() => props.modelValue, () => {
  search.value = ''
})
</script>

<style scoped>
.pointer-input {
  cursor: pointer;
}
.filter-panel {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 180px;
  overflow-y: auto;
}
.filter-panel li {
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
}
.filter-panel li.active,
.filter-panel li:hover {
  background: #409eff;
  color: #fff;
}
</style>
