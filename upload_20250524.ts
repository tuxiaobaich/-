import request from '@/utils/request'
import type { UploadResponseData } from './type'
import type { AxiosProgressEvent } from 'axios'

// 文件上传模块接口地址
enum API {
    UPLOAD_URL = '/admin/product/fileUpload'
}

// 上传文件接口方法
export const reqUploadFile = (data: FormData, onProgress?: (event: AxiosProgressEvent) => void) => {
    return request.post<any, UploadResponseData>(API.UPLOAD_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: onProgress
    })
} 
