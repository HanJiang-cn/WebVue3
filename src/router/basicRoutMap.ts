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
    children: [
      {
        path: '',
        name: 'UserIndex',
        component: () => import('@/views/UserMain/UserIndex.vue'),
      },
      {
        path: 'setting',
        name: 'SettingMain',
        component: () => import('@/views/UserMain/SettingMain.vue'),
        children: [
          {
            path: '',
            name: 'SettingIndex',
            component: () => import('@/views/UserMain/SettingMain/SettingIndex.vue'),
          },
        ],
      },
    ],
  },
  // 题目列表
  {
    path: '/problemset',
    name: 'Problemset',
    component: () => import('@/layouts/ProblemsetLayout.vue'),
  },
  // 登录&注册
  {
    path: '/accounts',
    name: 'Accounts',
    redirect: '/accounts/login',
    component: () => import('@/layouts/AccountsLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginMain/LoginCard.vue'),
      },
      // 注册
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/LoginMain/RegisterCard.vue'),
      },
    ],
  },
  // 做题页面
  {
    path: '/problems',
    name: 'Problems',
    redirect: '/problems/question',
    component: () => import('@/layouts/ProblemsLayout.vue'),
    children: [
      {
        path: 'question',
        name: 'QuestionDescription',
        component: () => import('@/views/ProblemsMain/QuestionDescription.vue'),
      },
      {
        path: 'solution',
        name: 'SolutionList',
        component: () => import('@/views/ProblemsMain/SolutionList.vue'),
        children: [
          {
            path: '',
            name: 'SolutionListIndex',
            component: () => import('@/views/ProblemsMain/SolutionList/SolutionIndex.vue'),
          },
          {
            path: 'content',
            name: 'SolutionContent',
            component: () => import('@/views/ProblemsMain/SolutionList/SolutionContent.vue'),
          },
        ],
      },
    ],
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
  // 帖子
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/layouts/PostLayout.vue'),
    children: [
      {
        path: '',
        name: 'PostIndex',
        component: () => import('@/views/PostMain/PostIndex.vue'),
      },
      {
        path: 'detail',
        name: 'PostDetail',
        component: () => import('@/views/PostMain/PostDetail.vue'),
      },
    ],
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('@/layouts/StoreLayout.vue'),
  },
  {
    path: '/competition',
    name: 'Competition',
    component: () => import('@/layouts/CompetitionLayout.vue'),
    children: [
      {
        path: '',
        name: 'CompetitionIndex',
        component: () => import('@/views/CompetitionMain/CompetitionIndex.vue'),
      },
      {
        path: 'detail',
        name: 'CompetitionDetail',
        component: () => import('@/views/CompetitionMain/CompetitionDetail.vue'),
      },
      {
        path: 'answer',
        name: 'CompetitionProblems',
        component: () => import('@/views/CompetitionMain/CompetitionProblems.vue'),
      },
    ],
  },
]

export default routes
