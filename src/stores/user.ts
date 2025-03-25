/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi, getLoginUserInfoApi } from '@/api/user'
import { ElNotification } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const id = ref(sessionStorage.getItem('id') || '')
  const userName = ref(sessionStorage.getItem('userName') || '')
  const userAccount = ref(sessionStorage.getItem('userAccount') || '')
  const userProfile = ref(sessionStorage.getItem('userProfile') || '')
  const userRole = ref(sessionStorage.getItem('userRole') || '')

  const login = async (data: any) => {
    // 登录接口, 成功后将相关数据存储到本地存储中, 否则抛出错误
    try {
      const response = await loginApi(data)
      id.value = response.data.id
      userName.value = response.data.userName
      userAccount.value = response.data.userAccount
      userProfile.value = response.data.userProfile
      userRole.value = response.data.userRole
      sessionStorage.setItem('id', response.data.id)
      sessionStorage.setItem('userName', response.data.userName)
      sessionStorage.setItem('userAccount', response.data.userAccount)
      sessionStorage.setItem('userProfile', response.data.userProfile)
      sessionStorage.setItem('userRole', response.data.userRole)
      ElNotification({
        title: '成功',
        message: '登陆成功',
        type: 'success',
      })
    } catch (error) {
      // 抛出错误
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
    sessionStorage.setItem('id', response.data.id)
    sessionStorage.setItem('userName', response.data.userName)
    sessionStorage.setItem('userAccount', response.data.userAccount)
    sessionStorage.setItem('userProfile', response.data.userProfile)
    sessionStorage.setItem('userRole', response.data.userRole)
  }

  const logout = () => {
    // 清除本地存储中的数据
    sessionStorage.clear()
    // 清除pinia中的数据
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
