/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/utils/http'

enum Api {
  Login = '/user/login',
  Register = '/user/register',
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

function loginApi(data: LoginData): Promise<any> {
  return post(Api.Login, data)
}

function registerApi(data: RegisterData): Promise<any> {
  return post(Api.Register, data)
}

export { loginApi, registerApi }
