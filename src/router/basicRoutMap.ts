const routes = [
  // 主页
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/DefaultLayout.vue'),
    // redirect: '/',
  },
  // 搜索
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/layouts/SearchLayout.vue'),
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
  // 登录&注册
  {
    path: '/accounts',
    name: 'Accounts',
    // redirect: '/accounts/login',
    component: () => import('@/layouts/AccountsLayout.vue'),
    children: [
      // 登录
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/AccountsMain/LoginCard.vue'),
      },
      // 注册
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/AccountsMain/RegisterCard.vue'),
      },
      // 通知
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/AccountsMain/NotificationsView.vue'),
      },
      // 收藏
      {
        path: 'collection',
        name: 'Collection',
        redirect: '/accounts/collection/all',
        component: () => import('@/views/AccountsMain/CollectionView.vue'),
        children: [
          {
            path: 'all',
            name: 'CollectionAll',
            component: () => import('@/views/AccountsMain/CollectionView/CollectionAll.vue'),
          },
          {
            path: 'post',
            name: 'CollectionPost',
            component: () => import('@/views/AccountsMain/CollectionView/CollectionPost.vue'),
          },
        ],
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
  // 题目
  {
    path: '/question',
    name: 'Question',
    component: () => import('@/layouts/QuestionLayout.vue'),
    children: [
      {
        path: '',
        name: 'QuestionIndex',
        component: () => import('@/views/QuestionMain/QuestionIndex.vue'),
      },
      {
        path: 'compile',
        name: 'QuestionCompile',
        redirect: '/question/compile/public',
        component: () => import('@/views/QuestionMain/QuestionCompile.vue'),
        children: [
          {
            path: 'public',
            name: 'QuestionCompilePublicLibrary',
            component: () => import('@/views/QuestionMain/QuestionCompile/PublicLibrary.vue'),
          },
          {
            path: 'private',
            name: 'QuestionCompilePrivateLibrary',
            component: () => import('@/views/QuestionMain/QuestionCompile/PrivateLibrary.vue'),
          },
        ],
      },
      {
        path: 'edit',
        name: 'QuestionEdit',
        component: () => import('@/views/QuestionMain/QuestionEdit.vue'),
      },
      {
        path: 'submit',
        name: 'QuestionSubmit',
        component: () => import('@/views/QuestionMain/QuestionSubmit.vue'),
      },
      {
        path: 'ceshi',
        name: 'QuestionDetail',
        component: () => import('@/views/QuestionMain/QuestionDetailceshi.vue'),
      },
      {
        path: 'paper',
        name: 'QuestionPaper',
        component: () => import('@/views/QuestionMain/QuestionPaper.vue'),
      },
    ],
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
        name: 'TeamIndex',
        component: () => import('@/views/TeamMain/TeamMain.vue'),
      },
      {
        path: 'create',
        name: 'TeamCreate',
        component: () => import('@/views/TeamMain/TeamMainCreate.vue'),
      },
      {
        path: 'list',
        name: 'TeamList',
        component: () => import('@/views/TeamMain/TeamMainList.vue'),
      },
      {
        path: 'manage',
        name: 'TeamManage',
        component: () => import('@/views/TeamMain/TeamMainManage.vue'),
      },
      {
        path: 'match',
        name: 'TeamMatch',
        component: () => import('@/views/TeamMain/TeamMainMatch.vue'),
      },
      {
        path: 'join',
        name: 'TeamJoin',
        component: () => import('@/views/TeamMain/TeamMainJoin.vue'),
      },
    ],
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
      {
        path: 'edit',
        name: 'PostEdit',
        component: () => import('@/views/PostMain/PostEdit.vue'),
      },
      {
        path: 'create',
        name: 'PostCreate',
        component: () => import('@/views/PostMain/PostCreate.vue'),
      },
      {
        path: 'solutionpost',
        name: 'SolutionPost',
        component: () => import('@/views/PostMain/SolutionPost.vue'),
      },
      {
        path: 'solutioncreate',
        name: 'SolutionCreate',
        component: () => import('@/views/PostMain/SolutionCreate.vue'),
      },
      {
        path: 'solutionedit',
        name: 'SolutionEdit',
        component: () => import('@/views/PostMain/SolutionEdit.vue'),
      },
      {
        path: 'solutiondetail',
        name: 'SolutionDetail',
        component: () => import('@/views/PostMain/SolutionDetail.vue'),
      },
    ],
  },
  // 课程中心
  {
    path: '/store',
    name: 'Store',
    component: () => import('@/layouts/StoreLayout.vue'),
  },
  // 竞赛介绍
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
      {
        path: 'update',
        name: 'CompetitionRank',
        component: () => import('@/views/CompetitionMain/CompetitionUpdate.vue'),
      },
      {
        path: 'create',
        name: 'AdminCompetitionCreate',
        component: () => import('@/components/AdminMain/CompetitionCreate.vue'),
      },
    ],
  },
  // 管理员
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminIndex',
        component: () => import('@/views/AdminMain/AdminIndex.vue'),
        meta: {
          needAuth: 'admin',
        },
      },
      {
        path: 'post',
        name: 'AdminPost',
        component: () => import('@/views/AdminMain/AdminPost.vue'),
        meta: {
          needAuth: 'admin',
        },
      },
      {
        path: 'competition',
        name: 'AdminCompetition',
        component: () => import('@/views/AdminMain/AdminCompetition.vue'),
        meta: {
          needAuth: 'admin',
        },
      },
      {
        path: 'isapproved',
        name: 'AdminIsApproved',
        component: () => import('@/views/AdminMain/AdminIsApproved.vue'),
        meta: {
          needAuth: 'admin',
        },
      },
      {
        path: 'users',
        name: 'AdminUser',
        component: () => import('@/views/AdminMain/AdminUser.vue'),
        // 权限设置
        meta: {
          needAuth: 'admin',
        },
      },
      // 题解管理
      {
        path: 'solution',
        name: 'AdminSolution',
        meta: {
          needAuth: 'admin',
        },
        children: [
          {
            path: '',
            name: 'SolutionIndex',
            component: () => import('@/views/AdminMain/AdminSolution/SolutionIndex.vue'),
          },
          {
            path: 'review',
            name: 'SolutionReview',
            component: () => import('@/views/AdminMain/AdminSolution/SolutionReview.vue'),
          },
        ],
      },
      // banner 管理
      {
        path: 'banner',
        name: 'AdminBanner',
        meta: {
          needAuth: 'admin',
        },
        children: [
          {
            path: 'index',
            name: 'BannerIndex',
            component: () => import('@/views/AdminMain/AdminBanner/BannerIndex.vue'),
          },
          {
            path: 'community',
            name: 'BannerCommunity',
            component: () => import('@/views/AdminMain/AdminBanner/BannerCommunity.vue'),
          },
        ],
      },
    ],
  },
]

export default routes
