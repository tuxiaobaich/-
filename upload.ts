import request from '@/utils/request'
import type { AxiosProgressEvent } from 'axios'

export function uploadExcel(
  formData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  return request.post('/admin/product/fileUpload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  })
}
