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
        userAvatar: null,
        userProfile: '',
        userRole: '',
        tags: [],
        area: [],
        birth: '',
        email: '',
        gender: '',
        score: '',
        social_accounts_Github: '',
        social_accounts_web: '',
        signature: '',
      }

  const id = ref(initialUser.id)
  const userName = ref(initialUser.userName)
  const userAvatar = ref(initialUser.userAvatar)
  const userProfile = ref(initialUser.userProfile)
  const userRole = ref(initialUser.userRole)
  const tags = ref(initialUser.tags)
  const area = ref(initialUser.area)
  const birth = ref(initialUser.birth)
  const email = ref(initialUser.email)
  const gender = ref(initialUser.gender)
  const score = ref(initialUser.score)
  const social_accounts_Github = ref(initialUser.social_accounts_Github)
  const social_accounts_web = ref(initialUser.social_accounts_web)
  const signature = ref(initialUser.signature)

  // 更新cookie中的用户信息
  const updateUserCookie = () => {
    const userData = {
      id: id.value,
      userName: userName.value,
      userAvatar: userAvatar.value,
      userProfile: userProfile.value,
      userRole: userRole.value,
      tags: tags.value,
      area: area.value,
      birth: birth.value,
      email: email.value,
      gender: gender.value,
      score: score.value,
      social_accounts_Github: social_accounts_Github.value,
      social_accounts_web: social_accounts_web.value,
      signature: signature.value,
    }
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(userData), COOKIE_OPTIONS)
  }

  // 登录
  const login = async (data: any) => {
    try {
      const response = await loginApi(data)
      id.value = response.data.id
      userName.value = response.data.userName
      userAvatar.value = response.data.userAvatar
      userProfile.value = response.data.userProfile
      userRole.value = response.data.userRole
      // 将 tags 转换为数组
      tags.value = response.data.tags ? response.data.tags.split(',') : []
      // 将 area 转换为数组
      area.value = response.data.area ? response.data.area.split(',') : []

      birth.value = response.data.birth
      email.value = response.data.email
      gender.value = response.data.gender
      score.value = response.data.score
      social_accounts_Github.value = response.data.social_accounts_Github
      social_accounts_web.value = response.data.social_accounts_web
      signature.value = response.data.signature

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
    userAvatar.value = response.data.userAvatar
    userProfile.value = response.data.userProfile
    userRole.value = response.data.userRole
    tags.value = response.data.tags ? response.data.tags.split(',') : []
    area.value = response.data.area ? response.data.area.split(',') : []
    birth.value = response.data.birth
    email.value = response.data.email
    gender.value = response.data.gender
    score.value = response.data.score
    social_accounts_Github.value = response.data.social_accounts_Github
    social_accounts_web.value = response.data.social_accounts_web
    signature.value = response.data.signature
    updateUserCookie()
  }

  // 退出登录
  const logout = () => {
    // 清除cookie中的用户信息
    Cookies.remove(USER_COOKIE_KEY)
    id.value = ''
    userName.value = ''
    userAvatar.value = null
    userProfile.value = ''
    userRole.value = ''
    tags.value = []
    area.value = []
    birth.value = ''
    email.value = ''
    gender.value = ''
    score.value = ''
    social_accounts_Github.value = ''
    social_accounts_web.value = ''
    signature.value = ''
    ElNotification({
      title: '成功',
      message: '退出成功',
      type: 'success',
    })
  }

  return {
    id,
    userName,
    userAvatar,
    userProfile,
    userRole,
    tags,
    area,
    birth,
    email,
    gender,
    score,
    social_accounts_Github,
    social_accounts_web,
    signature,
    login,
    logout,
    getUserInfo,
  }
})
