/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  Login = '/user/login',
  Register = '/user/register',
  GetUserInfo = '/user/get/login',
  Update = '/user/update/my',
}

interface LoginData {
  userAccount: string
  userPassword: string
}

interface RegisterData {
  userAccount: string
  userPassword: string
  checkPassword: string
}

interface UpdateData {
  userAvatar: string
  userName: string
  userProfile: string
}

function loginApi(data: LoginData): Promise<any> {
  return post(Api.Login, data)
}

function registerApi(data: RegisterData): Promise<any> {
  return post(Api.Register, data)
}

function updateUserApi(data: UpdateData): Promise<any> {
  return post(Api.Update, data)
}

// 获取用户信息
function getUserApiInfo() {
  return get(Api.GetUserInfo)
}

export { loginApi, registerApi, getUserApiInfo, updateUserApi }
