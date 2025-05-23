<template>
  <el-upload
    class="upload-demo"
    action="#"
    :show-file-list="false"
    :before-upload="handleBeforeUpload"
    :accept="'.xls,.xlsx'"
    :http-request="realUploadRequest"
    :on-progress="handleProgress"
  >
    <span>添加文件</span>
  </el-upload>
  <div v-if="fileName" style="margin-top: 12px; display: flex; align-items: center;">
    <span>已选择文件：{{ fileName }}</span>
    <el-button
      type="danger"
      size="small"
      icon="el-icon-delete"
      style="margin-left: 10px;"
      @click="removeFile"
      circle
      plain
    />
  </div>
  <el-progress
    v-if="uploadPercent > 0 && uploadPercent < 100"
    :percentage="uploadPercent"
    style="margin-top: 12px; width: 300px;"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadExcel } from '@/api/acl/upload'

const fileName = ref('')
const uploadPercent = ref(0)

async function realUploadRequest({ file, onProgress }: any) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await uploadExcel(formData, (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        uploadPercent.value = percent
        onProgress({ percent })
      }
    })
    ElMessage.success('上传成功')
    setTimeout(() => {
      uploadPercent.value = 0
    }, 500) // 延迟归零，便于观察
    console.log(response.data)
  } catch (e) {
    ElMessage.error('上传失败')
    uploadPercent.value = 0
  }
}

function handleBeforeUpload(file: File) {
  const isExcel = file.type === 'application/vnd.ms-excel' ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  if (!isExcel) {
    ElMessage.error('只能上传Excel文件（.xls, .xlsx）')
    return false
  }
  fileName.value = file.name
  return true
}

function handleProgress(event: any) {
  console.log('progress', event.percent)
  uploadPercent.value = Math.floor(event.percent)
}

function removeFile() {
  fileName.value = ''
}
</script>
