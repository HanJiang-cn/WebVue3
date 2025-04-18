import axios from 'axios'
import { ElNotification } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    ElNotification({
      title: '错误',
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 0) {
      ElNotification({
        title: '错误',
        message: response.data.message,
        type: 'error',
      })
    } else {
      return response.data
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElNotification({
      title: '错误',
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error)
  },
)

export default service
