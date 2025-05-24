// 文件上传相关的数据ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 文件上传返回数据的ts类型
export interface UploadResponseData extends ResponseData {
  data: {
    url: string
  }
} 
