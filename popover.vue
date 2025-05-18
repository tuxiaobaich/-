<template>
  <el-popover
    placement="bottom"
    trigger="click"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <el-input
        placeholder="点击弹出"
        readonly
        class="pointer-input"
      />
    </template>
    <div @click="popoverVisible = false" style="cursor:pointer;">
      点我关闭弹窗
    </div>
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const popoverVisible = ref(false)
</script>

<style scoped>
.pointer-input {
  cursor: pointer;
}
.pointer-input :deep(.el-input__wrapper) {
  cursor: pointer;
}
.pointer-input :deep(input) {
  cursor: pointer;
}
</style>
