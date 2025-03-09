import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/user'
import { ElNotification } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const token = ref(sessionStorage.getItem('token') || '')// 定义token, 初始值为本地存储中的token, 如果没有则为空字符串
  const username = ref(sessionStorage.getItem('username') || '')
  const roles = ref(sessionStorage.getItem('roles')?JSON.parse(sessionStorage.getItem('roles')!):[])// 定义角色, 初始值为本地存储中的角色, 如果没有则为空数组
  const menu = ref(sessionStorage.getItem('menu')?JSON.parse(sessionStorage.getItem('menu')!):[])

  const login = async (data: any) => {
    // 登录接口, 成功后将相关数据存储到本地存储中, 否则抛出错误
    try{
        const res = await loginApi(data)
        console.log(res)
        token.value = res.data.token
        username.value = res.data.user.username
        roles.value = res.data.user.roles
        menu.value = res.data.menulist
        // 存储到本地存储中, 方便下次登录时直接使用
        // 注意: 本地存储只能存储字符串, 所以需要将数组转换为字符串
        //sessionStorage是会话级别的存储, 当关闭浏览器时, 存储的数据会被清除
        sessionStorage.setItem('token', token.value)
        sessionStorage.setItem('username', username.value)
        sessionStorage.setItem('roles', JSON.stringify(roles.value))
        sessionStorage.setItem('menu', JSON.stringify(menu.value))
    }
    catch (error) {
        // 抛出错误
        console.log("登录失败:", error)
    }
  }

  const logout = () => {
      // 清除本地存储中的数据
      sessionStorage.clear()
      // 清除pinia中的数据
      token.value = ''
      username.value = ''
      roles.value = []
      menu.value = []
      ElNotification({
        title: '成功',
        message: '退出成功',
        type: 'success',
      })
    }
  return { token, username, roles, menu, login, logout}
})
