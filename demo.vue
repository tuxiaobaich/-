<template>
  <div ref="containerRef" class="flex tag-container">
    <template v-for="(tag, i) in tags">
      <el-tag
        v-show="i < visibleCount"

        closable
        :type="tag.type"
        @close="handleClose(tag.name)"
        class="tag-item"
        :ref="el => tagRefs[i] = el"
      >
        {{ tag.name }}
      </el-tag>
    </template>
    <span v-if="visibleCount < tags.length" class="ellipsis-tag">...</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import type { TagProps } from 'element-plus'

interface TagsItem {
  name: string
  type: TagProps['type']
}

const tags = ref<TagsItem[]>([
  { name: 'Tag哈哈哈Tag哈哈哈Tag哈哈哈Tag哈哈哈Tag哈哈哈Tag哈哈哈TagTag', type: 'primary' },
  { name: 'Tag嘻嘻', type: 'success' },
  { name: 'Tag呀呀呀', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' },
  { name: 'Tag 6', type: 'success' },
  { name: 'Tag 7', type: 'info' },
  { name: 'Tag 7', type: 'info' },
  { name: 'Tag 7', type: 'info' },
  { name: 'Tag 7', type: 'info' },
  { name: 'Tag 7', type: 'info' }
])

const visibleCount = ref(tags.value.length)
const tagRefs = ref<any[]>([])
const containerRef = ref<HTMLElement | null>(null)

const calcVisibleTags = async () => {
  await nextTick()
  const containerWidth = containerRef.value?.offsetWidth || 0
  const ellipsisWidth = 36 // 省略号宽度，和样式保持一致
  const gap = 8 // flex 间隔

  // 先重置第一个标签内容宽度
  if (tagRefs.value[0]) {
    const contentEl = tagRefs.value[0].$el
      ? tagRefs.value[0].$el.querySelector('.el-tag__content')
      : tagRefs.value[0].querySelector('.el-tag__content')
    if (contentEl) {
      contentEl.style.maxWidth = ''
      contentEl.style.overflow = ''
      contentEl.style.textOverflow = ''
      contentEl.style.whiteSpace = ''
    }
  }

  // 计算第一个标签宽度
  const firstTagEl = tagRefs.value[0]
  let firstTagWidth = firstTagEl
    ? (firstTagEl.$el ? firstTagEl.$el.offsetWidth : firstTagEl.offsetWidth)
    : 0

  // 如果第一个标签太长，导致容器只能放下一个标签和省略号，则限制最大宽度
  if (firstTagWidth + ellipsisWidth + gap > containerWidth) {
    let maxWidth = containerWidth - ellipsisWidth - gap
    if (maxWidth < 40) maxWidth = 40 // 设置一个最小宽度，避免内容完全消失
    if (tagRefs.value[0]) {
      const contentEl = tagRefs.value[0].$el
        ? tagRefs.value[0].$el.querySelector('.el-tag__content')
        : tagRefs.value[0].querySelector('.el-tag__content')
      if (contentEl) {
        contentEl.style.maxWidth = maxWidth + 'px'
        contentEl.style.overflow = 'hidden'
        contentEl.style.textOverflow = 'ellipsis'
        contentEl.style.whiteSpace = 'nowrap'
      }
    }
    visibleCount.value = 1
    return
  }

  // 正常计算可见标签数量
  let total = 0
  let count = 0
  for (let i = 0; i < tags.value.length; i++) {
    const el = tagRefs.value[i]
    if (!el) continue
    const w = el.$el ? el.$el.offsetWidth : el.offsetWidth
    if (total + w + ellipsisWidth + gap > containerWidth) break
    total += w + gap
    count++
  }
  visibleCount.value = count
}

onMounted(() => {
  calcVisibleTags()
  // 响应容器宽度变化
  if (containerRef.value) {
    const resizeObserver = new ResizeObserver(() => calcVisibleTags())
    resizeObserver.observe(containerRef.value)
  }
})
watch(tags, () => {
  requestAnimationFrame(() => {
    calcVisibleTags()
  })
})

const handleClose = (name: string) => {
  tags.value = tags.value.filter(tag => tag.name !== name)
  requestAnimationFrame(() => {
    calcVisibleTags()
  })
}
</script>

<style scoped>
.flex.tag-container {
  width: 300px;
  display: flex;
  gap: 8px;
  border: 1px solid #eee;
  padding: 8px;
  overflow: hidden;
  position: relative;
  background: #fff;
}
.ellipsis-tag {
  display: inline-block;
  min-width: 28px;
  text-align: center;
  color: #999;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 14px;
  pointer-events: none;
}
.ellipsis-tag {
  display: inline-block;
  min-width: 36px;
  text-align: center;
  color: #999;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 0 8px;
  font-size: 14px;
  pointer-events: none;
}
/* .tag-item {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
} */
</style>
