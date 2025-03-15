const routes = [
  // 主页
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    // redirect: '/',
  },
  // 个人中心
  {
    path: '/user',
    name: 'User',
    component: () => import('@/layouts/UserLayout.vue'),
  },
  // 题目列表
  {
    path: '/problemset',
    name: 'Problemset',
    component: () => import('@/layouts/ProblemsetLayout.vue'),
  },
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/layouts/LoginLayout.vue'),
  },
  // 做题页面
  {
    path: '/problems',
    name: 'Problems',
    component: () => import('@/layouts/ProblemsLayout.vue'),
  },
  // 比赛做题页面
  {
    path: '/competitionproblems',
    name: 'CompetitionProblems',
    component: () => import('@/layouts/CompetitionproblemsLayout.vue'),
  },
  // 社区
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/layouts/CommunityLayout.vue'),
  },
  // 竞赛排名
  {
    path: '/contest',
    name: 'Contest',
    component: () => import('@/layouts/ContestLayout.vue'),
  },
  // 试题库
  {
    path: '/compile',
    name: 'Compile',
    component: () => import('@/layouts/CompileLayout.vue'),
  },
  // 提交题目
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('@/layouts/SubmitLayout.vue'),
  },
  // 组队
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/layouts/TeamLayout.vue'),
    // 子路由
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/TeamMain/TeamMain.vue'),
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/TeamMain/TeamMainCreate.vue'),
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/TeamMain/TeamMainList.vue'),
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/TeamMain/TeamMainManage.vue'),
      },
      {
        path: 'match',
        name: 'Match',
        component: () => import('@/views/TeamMain/TeamMainMatch.vue'),
      },
    ],
  },
  // 发布帖子
  {
    path: '/publishpost',
    name: 'Publishpost',
    component: () => import('@/layouts/PublishpostLayout.vue'),
  },
  // 帖子详情
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/layouts/PostLayout.vue'),
  },
  {
    path:'/store',
    name:'Store',
    component:()=>import('@/layouts/StoreLayout.vue')
  }
]

export default routes
