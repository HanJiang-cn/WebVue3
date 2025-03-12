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
    path: '/competitionproblems',
    name: 'CompetitionProblems',
    component: () => import('@/layouts/CompetitionproblemsLayout.vue'),
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/layouts/CommunityLayout.vue'),
  },
  {
    path: '/contest',
    name: 'Contest',
    component: () => import('@/layouts/ContestLayout.vue'),
  },
  {
    path: '/compile',
    name: 'Compile',
    component: () => import('@/layouts/CompileLayout.vue'),
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('@/layouts/SubmitLayout.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('@/layouts/TeamLayout.vue'),
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/layouts/TeamLayoutCreate.vue'),
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/layouts/TeamLayoutList.vue'),
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('@/layouts/TeamLayoutManage.vue'),
  },
  {
    path: '/publishpost',
    name: 'Publishpost',
    component: () => import('@/layouts/PublishpostLayout.vue'),
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/layouts/PostLayout.vue'),
  },
]

export default routes
