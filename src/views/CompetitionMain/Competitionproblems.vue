<!-- eslint-disable vue/block-lang -->
<script setup>
import logo from '@/assets/logo.webp'
import { ref, onMounted, computed, watch } from 'vue'
import CodemirrorEditor from '@/components/ProblemsMain/CodemirrorEditor.vue'
import CompetitionQuestionList from '@/components/CometitionMain/CompetitionQuestionList.vue'
import { useRouter, useRoute } from 'vue-router'
import { getCompetitionQuestionDetailApi } from '@/api/question'
import { searchCompetition } from '@/api/competition'
import { ElMessage } from 'element-plus'

const route = useRoute() // 增加route引用
const competition = ref({})
const router = useRouter()
const id = computed(() => route.query.id)
const questionId = computed(() => route.query.questionId)
const visible = ref(false)
const visibles = ref(false)
const test = ref('')
const activeName = ref('1')
const activeName1 = ref('1')
const activeName2 = ref('1')
const competitionQuestion = ref([])
const currentQuestion = ref({})
const competitionName = ref('');
// 加载竞赛题目
const loadQuestions = async () => {
  try {
    const { data } = await getCompetitionQuestionDetailApi(id.value)
    competitionQuestion.value = data

    // 当没有questionId时立即设置第一个题目
    if (!route.query.questionId && competitionQuestion.value.length) {
      const firstId = competitionQuestion.value[0].id
      router.replace({
        query: { ...route.query, questionId: firstId },
        // 添加回调确保路由更新完成
        onComplete: () => {
          currentQuestion.value = competitionQuestion.value[0]
          processQuestionData()
        }
      })
      return
    }
    // 已有questionId时直接处理数据
    currentQuestion.value = competitionQuestion.value.find(q => q.id === route.query.questionId) || {}
    console.log(currentQuestion)
    processQuestionData()
  } catch (error) {
    console.error('题目加载失败:', error)
  }
}
// 获取竞赛详情
const getCompetition = async () => {
  try {
    const { data } = await searchCompetition({ competitionId: id.value })
    if (data && data.length > 0) {
      competition.value = data[0] // 获取第一个竞赛信息
      competitionName.value = competition.value.name
    }
  } catch (error) {
    ElMessage.error('获取竞赛信息失败')
  }
}

const tableData = [
  {
    date: '2023-06-01',
    status: '编译成功',
    time: '10:00',
    memory: '100MB',
    notes: '完成了每日一题',
  },
  {
    date: '2023-06-02',
    status: '编译失败',
    time: '15:30',
    memory: '80MB',
    notes: '正在进行每日一题',
  },
  {
    date: '2023-06-03',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  },
  {
    date: '2023-06-04',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  },
  {
    date: '2023-06-05',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  }


]
// 添加切换题目逻辑
const currentQuestionIndex = computed(() =>
  competitionQuestion.value.findIndex(q => q.id === questionId.value)
)

const hasPreviousQuestion = computed(() => currentQuestionIndex.value > 0)
const hasNextQuestion = computed(() =>
  currentQuestionIndex.value < competitionQuestion.value.length - 1
)

const handleSwitchQuestion = (direction) => {
  const newIndex = direction === 'prev'
    ? currentQuestionIndex.value - 1
    : currentQuestionIndex.value + 1

  if (newIndex >= 0 && newIndex < competitionQuestion.value.length) {
    const newQuestion = competitionQuestion.value[newIndex]
    router.replace({
      query: {
        ...route.query,
        questionId: newQuestion.id
      }
    })
  }
}

const Visable = () => {
  visibles.value = !visibles.value
  console.log(visibles.value)
}


const handleListClose = () => {
  visibles.value = false
}
const value = ref(Date.now() + 1000 * 60 * 60 * 7)

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
// 新增工具函数：安全解析 JSON
const safeParseJSON = (str, defaultValue = []) => {
  // 如果已经是数组或对象直接返回
  if (Array.isArray(str) || typeof str === 'object') return str
  if (!str) return defaultValue
  try {
    const sanitized = str
      .replace(/'/g, '"')
      .replace(/\\/g, '\\\\')
    return JSON.parse(sanitized)
  } catch (e) {
    console.error('JSON解析失败:', e)
    return defaultValue
  }
}
// 处理当前题目数据
const processQuestionData = () => {
  if (!currentQuestion.value) return

  currentQuestion.value.tags = safeParseJSON(currentQuestion.value.tags || '[]')
  currentQuestion.value.judgeCase = safeParseJSON(currentQuestion.value.judgeCase || '[]')
  currentQuestion.value.question_example = safeParseJSON(currentQuestion.value.question_example || '[]')
  currentQuestion.value.question_prompt = safeParseJSON(currentQuestion.value.question_prompt || '[]')

  console.log('处理后的题目数据:', {
    tags: currentQuestion.value.tags,
    judgeCase: currentQuestion.value.judgeCase,
    question_example: currentQuestion.value.question_example,
    question_prompt: currentQuestion.value.question_prompt
  })
}
watch(
  () => route.query.questionId,
  (newVal) => {
    if (newVal && competitionQuestion.value.length) {
      const question = competitionQuestion.value.find(q => q.id === newVal)
      if (question) {
        currentQuestion.value = { ...question } // 创建新对象避免污染原始数据
        processQuestionData()
      }
    }
  },
  { immediate: true }
)
const handleNav = (name) => {
  window.open(router.resolve({ path: name, }).href, '_self')
}

onMounted(() => {
  loadQuestions()
  getCompetition()
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
            <div class="button-group">
              <el-button-group>
                <el-tooltip popper-class="miaoshu" content="展开面板" placement="bottom" effect="light" :visible="visible">
                  <el-button type="primary" @mouseenter="visible = true" @mouseleave="visible = false" @click="Visable">
                    <el-icon :size="15" style="margin-right: 8px;">
                      <MenuUnfoldOutlined />
                    </el-icon>
                    题目列表
                  </el-button>
                </el-tooltip>

                <el-button @click="handleSwitchQuestion('prev')" :disabled="!hasPreviousQuestion">
                  <LeftOutlined />
                </el-button>
                <el-button @click="handleSwitchQuestion('next')" :disabled="!hasNextQuestion">
                  <RightOutlined />
                </el-button>

                <!-- <el-tooltip content="随机题目" placement="bottom" effect="light" :visible="visible3">
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
                </el-tooltip> -->
              </el-button-group>
              <span class="time">剩余时间：
                <el-countdown :value="value" />
              </span>
            </div>
          </el-col>
          <el-col :span="8" class="center">
            <span>{{ competitionName }}</span>
          </el-col>
          <el-col :span="8" class="right">
            <div>
              <el-button size="small" type="info" text>
                <el-icon :size="18">
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
              <el-tabs v-model="activeName" type="card">
                <!-- 题目描述 -->
                <el-tab-pane name="1">
                  <!-- 标题 -->
                  <template #label>
                    <el-icon>
                      <ReadOutlined />
                    </el-icon>
                    <span>题目描述</span>
                  </template>
                  <!-- 内容 -->
                  <!-- 题目 -->
                  <el-row>
                    <h1>{{ currentQuestion?.title }}</h1>
                  </el-row>
                  <!-- 标签 -->
                  <!-- <el-row style="margin-top: 10px;">
    <el-tag type="success" v-for="item in competitionQuestion[0]?.tags" :key="item">{{ item }}</el-tag>
  </el-row> -->
                  <!-- 题目描述 -->
                  <el-row style="margin-top: 10px;">
                    <div class="topic-content ">
                      <!-- 题目描述部分 -->
                      <div class="topic-content__text">
                        <h3>题目描述</h3>
                        <p class="difficulty">本题目难度：<span>{{ currentQuestion?.difficulty }}</span></p>
                        <div v-html="currentQuestion?.content" class="content"></div>
                        <!-- 标签渲染 -->
                        <el-row class="tags-row" v-if="currentQuestion?.tags?.length">
                          <el-tag v-for="(tag, index) in currentQuestion.tags" :key="index" type="success"
                            class="tag-item">
                            {{ tag }}
                          </el-tag>
                        </el-row>

                        <!-- 评测用例渲染 -->
                        <div v-if="currentQuestion?.judgeCase?.length" class="judge-cases">
                          <h4>评测用例</h4>
                          <ul>
                            <li v-for="(caseItem, index) in currentQuestion.judgeCase" :key="index">
                              <div class="case-item">
                                <label>输入：</label>
                                <pre>{{ caseItem.input }}</pre>
                                <label>输出：</label>
                                <pre>{{ caseItem.output }}</pre>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <!-- 题目提示 -->
                        <div  v-if="currentQuestion?.question_prompt">
                          <ul>
                            <li
                            v-for="(prompt, index) in currentQuestion?.question_prompt" :key="index"
                              class="hint">
                              <div>
                                <div style="font-size: larger;"><strong>提示</strong>{{ index + 1 }}</div>
                                <div>{{ prompt }}</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="example"   v-if="currentQuestion?.question_example?.length">
                        <p v-for="(example, index) in currentQuestion.question_example" :key="index">
                          <span class="example-label">输入：{{ example.input }}&nbsp;</span>
                          <span class="example-input">输出：{{ example.output }}&nbsp;</span>
                          <span class="example-output">解释：{{ example.explain }}&nbsp;</span>
                        </p>
                      </div>
                    </div>
                    <!-- 提交记录 -->
                    <el-collapse style="width: 100%;">
                      <!-- 提交记录 -->
                      <el-collapse-item title="提交记录" name="1">
                        <el-table :data="tableData" style="width: 100%">
                          <el-table-column prop="date" label="日期" />
                          <el-table-column prop="status" label="运行状态">
                            <template #default="scope">
                              <el-tag v-if="scope.row.status === '编译成功'" type="success">
                                {{ scope.row.status }}
                              </el-tag>
                              <el-tag v-else-if="scope.row.status === '编译失败'" type="danger">
                                {{ scope.row.status }}
                              </el-tag>
                            </template>
                          </el-table-column>
                          <el-table-column prop="time" label="执行用时" />
                          <el-table-column prop="memory" label="消耗内存" />
                          <el-table-column prop="notes" label="备注" />
                        </el-table>
                      </el-collapse-item>
                    </el-collapse>
                  </el-row>
                </el-tab-pane>
                <!-- 题目相关信息 -->
                <el-tab-pane name="2">
                  <template #label>
                    <el-icon>
                      <CodepenOutlined />
                    </el-icon>
                    <span>题目信息</span>
                  </template>
                  <!-- 题目信息 -->
                  <el-row style="margin-top: 10px;">
                    <div class="problem-info">
                      <h3 class="info-title">题目信息</h3>
                      <div class="info-section">
                        <p class="difficulty">本题目难度：<span>简单</span></p>
                        <div class="target-box">
                          <p><strong>目标：</strong></p>
                          <ul>
                            <li>完成程序并输出结果</li>
                            <li>编译成功！</li>
                            <li>完成所有目标可获得满分</li>
                          </ul>
                        </div>
                        <p class="score">分值：<em>100</em>（完成所有目标可获得满分）</p>
                        <div class="notice-box">
                          <p><strong>注意事项：</strong></p>
                          <ol>
                            <li>请确保已完成每日一题的题目描述和示例</li>
                            <li>请确保已掌握相关解题思路和算法</li>
                          </ol>
                        </div>
                        <p class="source">题目来源：<a>孟神</a></p>
                      </div>
                    </div>
                  </el-row>
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
                  <CodemirrorEditor style="width: 98%; height: 68%;" />
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
      <CompetitionQuestionList :visible="visibles" @close="handleListClose" />
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

        .button-group {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .time {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #777777;
            font-size: 14px;
            color: #1a1a1a;
            font-size: 15px;
            margin-left: 10px;

            :deep(.el-statistic) {
              .el-statistic__content {
                color: #1a1a1a;
                font-size: 15px;
              }
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

      // 题解内容页面
      .solution-content {
        .title {
          width: 11%;
          display: flex;
          align-items: center;
          padding: 15px;
          cursor: pointer;

          .el-text {
            margin-left: 5px;
          }
        }
      }

      // 提交记录&评论
      .el-collapse {
        border: none;

        :deep(.el-collapse-item__header) {
          height: 50px;
          padding: 0 20px;
          font-size: 15px;
          color: #2c3e50;
          background: rgba(#409EFF, 0.05);
          border-radius: 8px;
          border-bottom: none;
          margin-top: 24px;
        }

        :deep(.el-collapse-item__content) {
          .el-table {
            margin-top: 16px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          }
        }
      }

      .up-solution {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        padding: 15px;
        border-bottom: 1px solid #0000000d;

      }

      .el-tab-pane {
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

      // 实例&提示&题目描述
      .el-tab-pane {
        overflow: auto;
        height: 80vh;

        // 标签
        .el-tag {
          margin-right: 5px;
          border-radius: 10px;
        }

        // 题目描述
        .topic-content {
          // margin-top: 10px;
          line-height: 1.6;
          position: relative;
          padding-right: 20px;

          .topic-content__text {
            h3 {
              font-size: 18px;
              color: #2c3e50;
              margin: 24px 0 16px;
              padding-left: 12px;
              border-left: 4px solid #409EFF;
            }

            p,
            li {
              line-height: 1.8;
              color: #606266;
              margin-bottom: 12px;
            }
          }

          // 示例
          .example {
            width: 780px;
            background: rgba(#409EFF, 0.03);
            border: 1px solid rgba(#409EFF, 0.1);
            border-radius: 8px;
            padding: 20px 0 20px 20px;
            margin: 24px 0;
            position: relative;

            // ::before 是伪元素选择器，用于在元素前面插入内容
            &::before {
              content: '示例';
              position: absolute;
              top: -12px;
              left: 20px;
              background: white;
              padding: 0 8px;
              color: #409EFF;
              font-size: 16px;
              font-weight: 500;
            }

            p {
              margin: 8px 0;
              font-family: 'JetBrains Mono', monospace;
              font-size: 14px;
              color: #2c3e50;

              &:nth-child(odd) {
                color: #909399;
              }
            }
          }
        }
      }

      // 题目信息
      .problem-info {
        line-height: 1.6;
        padding: 16px;
        background: #fff;
        border-radius: 8px;

        .info-title {
          font-size: 18px;
          color: #2c3e50;
          margin: 0 0 20px;
          padding-left: 12px;
          border-left: 4px solid #409EFF;
        }

        .info-section {
          p {
            margin: 12px 0;
            color: #606266;
          }

          .difficulty {
            span {
              color: #67C23A;
              font-weight: 500;
            }
          }

          .target-box {
            background: rgba(#409EFF, 0.03);
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;

            ul {
              margin: 8px 0 0 20px;
              padding: 0;

              li {
                margin: 8px 0;
                color: #606266;
              }
            }
          }

          .score {
            em {
              color: #E6A23C;
              font-style: normal;
              font-size: 1.2em;
            }
          }

          .notice-box {
            ol {
              margin: 8px 0 0 20px;
              padding: 0;

              li {
                margin: 8px 0;
                color: #606266;
              }
            }
          }

          .source {
            margin-top: 24px;
            color: #909399;

            a {
              color: #409EFF;
              text-decoration: none;
            }
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

  /* 标签样式 */
  .tags-row {
    margin: 12px 0;

    .tag-item {
      margin-right: 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  /* 评测用例样式 */
  .judge-cases {
    margin-top: 20px;

    .case-item {
      background: #f8f9fa;
      padding: 12px;
      border-radius: 6px;
      margin: 8px 0;

      pre {
        margin: 4px 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
      // 提示
    .hint {
      background: #fff9f0;
      border-left: 4px solid #E6A23C;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
      div {
      color: #8c6b3f;
      font-size: 14px;

    }

    }
}

</style>
