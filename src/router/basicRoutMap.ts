const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    // redirect: '/',
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/layouts/UserLayout.vue'),
  },
  {
    path: '/problemset',
    name: 'Problemset',
    component: () => import('@/layouts/ProblemsetLayout.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/LoginLayout.vue'),
  },
  {
    path: '/problems',
    name: 'Problems',
    component: () => import('@/layouts/ProblemsLayout.vue'),
  },
  {
    path: '/111',
    name: '111',
    component: () => import('@/views/ABC.vue'),
  },
  {
    path:'/compile',
    name:'Compile',
    component:()=>import('@/layouts/CompileLayout.vue')
  },
  {
    path:'/submit',
    name:'Submit',
    component:()=>import('@/layouts/SubmitLayout.vue')
  }
]

export default routes
