/* eslint-disable @typescript-eslint/no-explicit-any */
import { post, get } from '@/utils/http'

enum Api {
  Login = '/user/login',
  Register = '/user/register',
  GetUserInfo = '/user/get/login',
  GetInfo = '/user/get/vo',
  Update = '/user/update/my',
  PlanList = '/user/Index/getPlan',
  GetCollection = '/admin/info/user/getInfo'
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

function updateLoginUserApi(data: UpdateData): Promise<any> {
  return post(Api.Update, data)
}

// 获取用户信息
function getLoginUserInfoApi() {
  return get(Api.GetUserInfo)
}
function getPlanListApi() {
  return get(Api.PlanList)
}

function getIdInfoApi(data: any) {
  return get(Api.GetInfo, data)
}

function getCollectionInfoApi(data: any) {
  return get(Api.GetCollection, data)
}

export { loginApi, registerApi, getLoginUserInfoApi, updateLoginUserApi, getPlanListApi, getIdInfoApi, getCollectionInfoApi }
