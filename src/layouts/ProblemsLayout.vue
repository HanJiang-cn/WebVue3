<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import logo from '@/assets/logo.webp'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDetailApi } from '@/api/question'
import CodemirrorEditor from '@/components/ProblemsMain/CodemirrorEditor.vue'
import QuestionList from '@/components/ProblemsMain/QuestionList.vue'

const router = useRouter()
const visible = ref(false)
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visibles = ref(false)
const test = ref('')
const activeName = ref('1')
const activeName1 = ref('1')
const activeName2 = ref('1')

const Visable = () => {
  visibles.value = !visibles.value
  console.log(visibles.value)
}

const handleTabChange = () => {
  if (activeName.value === '1') {
    router.push({
      path: '/problems/question',
      query: {
        // 保留所有现有参数
        ...router.currentRoute.value.query
      }
    })
  } else if (activeName.value === '2') {
    router.push({
      path: '/problems/solution',
      query: {
        // 保留所有现有参数
        ...router.currentRoute.value.query
      }
    })
  }
}

onMounted(() => {
  // 获取当前路由
  const currentRoute = router.currentRoute.value
  if (currentRoute.path === '/problems/question') {
    activeName.value = '1'
  } else if (currentRoute.path === '/problems/solution' || currentRoute.path === '/problems/solution/content') {
    activeName.value = '2'
  }
})

// 测试结果
const TestResults = [
  {
    content: '测试用例1的内容',
    status: 'ok',
  }
]
const handleTestResultsData = (value) => {
  const data = ref({})
  data.value = value
  if (data.value.status === 'ok') {
    TestResults.push({
      content: '编译成功！',
      status: 'ok',
    })
  } else {
    TestResults.push({
      content: '编译失败！',
      status: 'error',
    })
  }
}

// 用户菜单
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const menuItemsAdmin = ref([
  { name: 'profile', label: '个人中心', icon: 'User' },
  { name: 'settings', label: '账号设置', icon: 'Setting' },
  { name: 'admin', label: '管理员菜单', icon: 'Setting' },
  { name: 'messages', label: '我的消息', icon: 'Message' },
  { name: 'favorites', label: '我的收藏', icon: 'Star' },
  { name: 'problems', label: '题目中心', icon: 'FileTextOutlined' },
])
const menuItems = ref([
  { name: 'profile', label: '个人中心', icon: 'User' },
  { name: 'settings', label: '账号设置', icon: 'Setting' },
  { name: 'messages', label: '我的消息', icon: 'Message' },
  { name: 'favorites', label: '我的收藏', icon: 'Star' }
])

const handleMenuClick = (item) => {
  if (item.name === 'profile') {
    handleNav('/user')
  } else if (item.name === 'settings') {
    handleNav('/user/setting')
  } else if (item.name === 'admin') {
    handleNav('/admin')
  } else if (item.name === 'messages') {
    handleNav('/accounts/notifications')
  } else if (item.name === 'favorites') {
    handleNav('/accounts/collection')
  } else if (item.name === 'problems') {
    handleNav('/question/compile')
  }
}
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/')
    location.reload()
  })
}
const handleNav = (name) => {
  window.open(router.resolve({ path: name, }).href, '_self')
}

// 题目
const questionData = ref({})

const getQuestionInfo = async () => {
  const { data } = await getDetailApi({ id: router.currentRoute.value.query.id })
  // console.log(res)
  questionData.value = data
}

onMounted(() => {
  getQuestionInfo()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- 头 -->
        <el-row style="width: 100%;" justify="center">
          <el-col :span="8" class="left">
            <div class="logo">
              <img :src="logo" alt="logo" />
            </div>
            <div>
              <el-button-group>
                <el-tooltip popper-class="miaoshu" content="展开面板" placement="bottom" effect="light" :visible="visible">
                  <el-button type="primary" @mouseenter="visible = true" @mouseleave="visible = false" @click="Visable">
                    <el-icon :size="15" style="margin-right: 8px;">
                      <MenuUnfoldOutlined />
                    </el-icon>
                    每日一题
                  </el-button>
                </el-tooltip>
                <el-tooltip content="上一题" placement="bottom" effect="light" :visible="visible1">
                  <el-button type="primary" @mouseenter="visible1 = true" @mouseleave="visible1 = false">
                    <el-icon :size="15">
                      <LeftOutlined />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="下一题" placement="bottom" effect="light" :visible="visible2">
                  <el-button type="primary" @mouseenter="visible2 = true" @mouseleave="visible2 = false">
                    <el-icon :size="15">
                      <RightOutlined />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="随机题目" placement="bottom" effect="light" :visible="visible3">
                  <el-button type="primary" @mouseenter="visible3 = true" @mouseleave="visible3 = false">
                    <el-icon :size="15">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shuffle"
                        class="svg-inline--fa fa-shuffle absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                          d="M425 31l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-12.6 0-24.4 5.9-32 16l-46 61.3-30-40 37.6-50.1C298.2 117 324.3 104 352 104h78.1L391 65c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM204 322.7l-37.6 50.1C149.8 395 123.7 408 96 408H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c12.6 0 24.4-5.9 32-16l46-61.3 30 40zM391 287c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-27.7 0-53.8-13-70.4-35.2L128 168c-7.6-10.1-19.4-16-32-16H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c27.7 0 53.8 13 70.4 35.2L320 344c7.6 10.1 19.4 16 32 16h78.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9z">
                        </path>
                      </svg>
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </el-col>
          <el-col :span="8" class="center">
            <span >{{ questionData.title }}</span>
          </el-col>
          <el-col :span="8" class="right">
            <div>
              <el-button size="small" type="info" text>
                <el-icon :size="18" @click="router.push('/problems/search')">
                  <Search />
                </el-icon>
              </el-button>
            </div>
            <div>
              <el-popover trigger="click" placement="bottom" :width="240" :offset="10">
                <template #reference>
                  <el-avatar :size="25" class="cursor-pointer" :src="userStore.userAvatar" />
                </template>
                <div class="user-menu">
                  <!-- 用户信息 -->
                  <div class="user-info">
                    <el-avatar :size="40" :src="userStore.userAvatar" />
                    <div class="info">
                      <h4 class="nickname">{{ userStore.userName }}</h4>
                      <p class="email">{{ userStore.email }}</p>
                    </div>
                  </div>

                  <!-- 功能菜单 -->
                  <div class="menu-list" v-if="userStore.userRole === 'admin'">
                    <div v-for="item in menuItemsAdmin" :key="item.name" class="menu-item"
                      @click="handleMenuClick(item)">
                      <component :is="item.icon" class="icon" />
                      <span>{{ item.label }}</span>
                    </div>
                  </div>
                  <div class="menu-list" v-else>
                    <div v-for="item in menuItems" :key="item.name" class="menu-item" @click="handleMenuClick(item)">
                      <component :is="item.icon" class="icon" />
                      <span>{{ item.label }}</span>
                    </div>
                  </div>
                  <!-- 退出登录 -->
                  <div class="logout" @click="handleLogout">
                    <el-icon>
                      <SwitchButton />
                    </el-icon>
                    <span>退出登录</span>
                  </div>
                </div>
              </el-popover>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="10">
          <!-- 左边 -->
          <el-col :span="12">
            <el-card class="card-left">
              <el-tabs v-model="activeName" type="card" @tab-change="handleTabChange">
                <!-- 题目描述 -->
                <el-tab-pane name="1">
                  <!-- 标题 -->
                  <template #label>
                    <el-icon>
                      <ReadOutlined />
                    </el-icon>
                    <span>题目描述</span>
                  </template>
                  <RouterView />
                </el-tab-pane>
                <!-- 题解 -->
                <el-tab-pane name="2" class="solution-tab">
                  <template #label>
                    <el-icon>
                      <CodepenOutlined />
                    </el-icon>
                    <span>题解</span>
                  </template>
                  <RouterView />
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
          <!-- 右边 -->
          <el-col :span="12">
            <el-card class="card-right">
              <!-- 代码 -->
              <el-tabs v-model="activeName1" type="card">
                <el-tab-pane name="1">
                  <template #label>
                    <el-icon>
                      <CodeOutlined />
                    </el-icon>
                    <span>代码</span>
                  </template>
                  <CodemirrorEditor @TestResultsData="handleTestResultsData" style="width: 98%; height: 68%;" />
                  <!-- <CodemirrorEditor /> -->
                  <el-tabs v-model="activeName2" type="card" class="vscode">
                    <!-- 测试 -->
                    <el-tab-pane label="测试" name="1">
                      <template #label>
                        <el-icon>
                          <ExperimentOutlined />
                        </el-icon>
                        <span>测试</span>
                      </template>
                      <div class="test">
                        <el-input v-model="test" type="textarea" placeholder="请输入测试用例" style="width: 100%;" />
                        <el-button type="primary" style="margin-top: 10px;">测试</el-button>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="测试结果" name="2">
                      <template #label>
                        <el-icon>
                          <EllipsisOutlined />
                        </el-icon>
                        <span>测试结果</span>
                      </template>
                      <div class="result error">
                        <span>1、编译错误！</span>
                      </div>
                      <div class="result success">
                        <span>2、编译成功！</span>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <!-- 每日一题 -->
      <QuestionList :visible="visibles" @colse="visibles = false"></QuestionList>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.user-menu {
  position: relative;

  .user-info {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;

    .info {
      margin-left: 12px;

      .nickname {
        margin: 0;
        font-size: 14px;
        color: #303133;
        font-weight: 600;
      }

      .email {
        margin: 4px 0 0;
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .menu-list {
    padding: 8px 0;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      font-size: 14px;
      color: #303133;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }

      .icon {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        color: #409EFF;
      }
    }
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    color: #f56c6c;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #fef0f0;
    }

    .el-icon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }
  }
}

.common-layout {

  .el-header {
    display: flex;
    align-items: center;
    height: 48px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #ebeef5;

    .el-popper.is-customized .el-popper__arrow::before {
      background-color: #F0F0F0;
    }

    .el-row {
      height: 40px;

      .left {
        display: flex;
        align-items: center;

        .logo {
          img {
            width: 17px;
            padding-right: 7px;
            margin-right: 5px;
            border-right: 1px solid #0000000d;
          }
        }

        .el-button-group {
          max-width: 250px;
          width: 200px;
          height: 32px;
          margin-left: 5px;

          &:hover {
            .el-button {
              background: #0000000d;
            }
          }

          .el-button {
            margin-right: 1px;
            background: transparent;
            color: #777777;
            font-size: 14px;
            border: none;

            &:first-child {
              width: 100px;
            }

            &:last-child,
            &:nth-child(2),
            &:nth-child(3) {
              width: 32px;
            }

            &:last-child {
              margin-right: 0;
            }

            &:hover {
              color: #1a1a1a;
              background: #E2E2E2;
            }
          }
        }
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;

        span {
          color: #2c3e50;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-size: 18px;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;

        }
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  .el-main {

    .el-col {
      >.el-card {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
      }
    }

    .card-left {
      height: 90vh;

      .el-tab-pane {
        overflow: auto;
        height: 80vh;
        margin-top: 10px;
      }

      .el-icon {
        margin-right: 5px;
      }

      :deep(.el-tabs__header) {
        margin-top: 10px;
        border: none;
        height: 10px;

        .el-tabs__nav {
          border: none;

          .el-tabs__item {
            margin-left: 5px;
            border: none;
            font-size: 14px;
            color: #777777;
            border-radius: 15px;

            &:hover {
              color: #1a1a1a;
              border-radius: 15px;
              background: #00000d0d;
            }
          }

          .is-active {
            color: #1a1a1a;
            background: rgba(#409EFF, 0.1);
          }
        }
      }
    }

    .card-right {
      height: 90vh;

      .el-tab-pane {
        margin-top: 10px;
      }

      .el-icon {
        margin-right: 5px;
      }

      // 标签页和标签
      :deep(.el-tabs__header) {
        margin-top: 10px;
        border: none;
        height: 10px;

        .el-tabs__nav {
          border: none;

          .el-tabs__item {
            margin-left: 5px;
            border: none;
            font-size: 14px;
            color: #777777;
            border-radius: 15px;

            &:hover {
              color: #1a1a1a;
              border-radius: 15px;
              background: #00000d0d;
            }
          }

          .is-active {
            color: #1a1a1a;
            background: rgba(#409EFF, 0.1);
          }
        }


      }

      .el-tab-pane {
        overflow: auto;
        height: 89vh;

        .el-tag {
          margin-right: 5px;
          border-radius: 10px;
        }
      }

      // 代码编辑器和测试及测试结果
      .vscode {
        margin-top: 15px;

        .el-tab-pane {
          overflow: auto;
          height: 14vh;

          .el-tag {
            margin-right: 5px;
            border-radius: 10px;
          }
        }

        // 测试结果
        .result {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 12px;
          }

          &.success {
            background: fade(#67C23A, 10%);

            &::before {
              background: #67C23A;
            }
          }

          &.error {
            background: fade(#F56C6C, 10%);

            &::before {
              background: #F56C6C;
            }
          }
        }
      }
    }
  }
}
</style>
