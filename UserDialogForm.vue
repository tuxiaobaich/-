<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    width="400px"
    @close="onCancel"
    @update:model-value="onUpdateVisible"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!form.id">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSave">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  title: String,
  user: Object, // 父组件传递的当前编辑用户（可为null/空对象）
  rules: Object
})
const emit = defineEmits(['update:visible', 'save', 'cancel'])

const formRef = ref()
const defaultForm = {
  id: null,
  username: '',
  nickname: '',
  role: '',
  password: ''
}
const form = ref({ ...defaultForm })

// 监听 user 变化，实时同步表单
watch(
  () => props.user,
  (val) => {
    console.log('user', val)
    if (val && val.id) {
      // 编辑
      form.value = { ...val, password: '' }
    } else {
      // 新增
      form.value = { ...defaultForm }
    }
    formRef.value?.clearValidate()
  },
 { immediate: true, deep: true }
)

// 监听 visible 变化，弹窗打开时清除校验
watch(
  () => props.visible,
  (val) => {
    if (val) {
      formRef.value?.clearValidate()
    }
  }
)

function onCancel() {
  emit('update:visible', false)
  emit('cancel')
}
function onSave() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('save', { ...form.value })
      emit('update:visible', false)
    }
  })
}
function onUpdateVisible(val: boolean) {
  emit('update:visible', val)
}
</script>
