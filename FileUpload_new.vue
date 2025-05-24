<template>
  <div class="upload-container">
    <el-upload
      class="upload"
      action="#"
      :auto-upload="false"
      :on-change="handleFileChange"
      :show-file-list="true"
      :limit="1"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>

    <div v-if="uploadInfo.uploading" class="upload-progress">
      <el-progress
        :percentage="uploadInfo.progress"
        :status="uploadInfo.progress === 100 ? 'success' : ''"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { reqUploadFile } from '@/api/upload/index'
import type { AxiosProgressEvent } from 'axios'

interface UploadInfo {
  file: File | null
  uploading: boolean
  progress: number
}

const uploadInfo = reactive<UploadInfo>({
  file: null,
  uploading: false,
  progress: 0
})

const handleFileChange = async (file: any) => {
  uploadInfo.file = file.raw
  uploadInfo.progress = 0
  
  // 文件选择后直接上传
  if (uploadInfo.file) {
    uploadInfo.uploading = true
    
    // 创建 FormData
    const formData = new FormData()
    formData.append('file', uploadInfo.file)
    
    const result = await reqUploadFile(formData, (progressEvent) => {
      if (progressEvent.total) {
        uploadInfo.progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
      }
    })

    if (result.code === 200) {
      ElMessage.success('上传成功')
      // emit('upload-success', result.data)
    }
    
    uploadInfo.uploading = false
  }
}
</script>

<style scoped>
.upload-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.upload {
  margin-bottom: 20px;
}

.upload-progress {
  margin-top: 20px;
}
</style> 
