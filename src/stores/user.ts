/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi, getLoginUserInfoApi } from '@/api/user'
import { ElNotification } from 'element-plus'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
  // Cookie名称和配置
  const USER_COOKIE_KEY = 'user_info'
  const COOKIE_OPTIONS = { expires: 7 } // 7天后过期

  // 从cookie中解析用户信息或初始化空值
  const userCookie = Cookies.get(USER_COOKIE_KEY)
  const initialUser = userCookie
    ? JSON.parse(userCookie)
    : {
        id: '',
        userName: '',
        userAccount: '',
        userProfile: '',
        userRole: '',
      }

  const id = ref(initialUser.id)
  const userName = ref(initialUser.userName)
  const userAccount = ref(initialUser.userAccount)
  const userProfile = ref(initialUser.userProfile)
  const userRole = ref(initialUser.userRole)

  // 更新cookie中的用户信息
  const updateUserCookie = () => {
    const userData = {
      id: id.value,
      userName: userName.value,
      userAccount: userAccount.value,
      userProfile: userProfile.value,
      userRole: userRole.value,
    }
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(userData), COOKIE_OPTIONS)
  }

  const login = async (data: any) => {
    try {
      const response = await loginApi(data)
      id.value = response.data.id
      userName.value = response.data.userName
      userAccount.value = response.data.userAccount
      userProfile.value = response.data.userProfile
      userRole.value = response.data.userRole
      updateUserCookie()
      ElNotification({
        title: '成功',
        message: '登陆成功',
        type: 'success',
      })
    } catch (error) {
      console.log('登录失败:', error)
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const response = await getLoginUserInfoApi()
    id.value = response.data.id
    userName.value = response.data.userName
    userAccount.value = response.data.userAccount
    userProfile.value = response.data.userProfile
    userRole.value = response.data.userRole
    updateUserCookie()
  }

  const logout = () => {
    // 清除cookie中的用户信息
    Cookies.remove(USER_COOKIE_KEY)
    // 清除pinia中的数据
    id.value = ''
    userName.value = ''
    userAccount.value = ''
    userProfile.value = ''
    userRole.value = ''
    ElNotification({
      title: '成功',
      message: '退出成功',
      type: 'success',
    })
  }

  return {
    id,
    userName,
    userAccount,
    userProfile,
    userRole,
    login,
    logout,
    getUserInfo,
  }
})
