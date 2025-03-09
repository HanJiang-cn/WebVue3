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
    path:'/contest',
    name:'Contest',
    component:()=>import('@/layouts/ContestLayout.vue')
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
