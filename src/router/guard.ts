import router from './index'
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'

router.beforeEach((to) => {
  const userStore = useUserStore()
  const isLogin = userStore.id

  // 需要拦截的路由名称（根据实际路由配置修改）
  const authRoutes = ['Login', 'Register']
  // const noAuthRoutes = ['PostDetail', 'PostEdit', 'PostCreate', 'TeamIndex']

  // // 如果用户未登录且尝试访问认证相关页面
  // if (!isLogin && noAuthRoutes.includes(to.name as string)) {
  //   // 重定向到登录页面
  //   return { path: '/accounts/login' }
  // }
  // 如果用户已登录且尝试访问认证相关页面
  if (isLogin && authRoutes.includes(to.name as string)) {
    // 重定向到首页或其他指定页面
    return { path: '/' }
  }

  if (to.meta?.needAuth && to.meta.needAuth !== userStore.userRole) {
    // 提醒用户没有权限访问该页面
    ElNotification({
      title: '失败',
      message: '您没有权限访问该页面',
      type: 'error',
    })
    return { path: '/' }
  }
})
