<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive } from 'vue'
import TeamMatch from '@/components/TeamMain/TeamMatch.vue'
// 匹配动画对话框
import MatchAnimationDialog from '@/components/TeamMain/MatchAnimationDialog.vue'

const dialogFormVisible = ref(false)
// 用户信息
const userProfile = ref({
  nickname: '前端小能手',
  level: '白银Ⅱ',
  wins: 18,
  avatar: 'https://via.placeholder.com/60',
  points: 30,
  PointsPercentage: 80,
})

// 表单数据
const form = reactive({
  domain: '',
  competition: '',
  language: [],
  members: 1,
})

// 验证规则
const rules = {
  domain: [
    { required: true, message: '请选择擅长领域', trigger: 'change' },
  ],
  competition: [
    { required: true, message: '请选择比赛类型', trigger: 'change' },
  ],
  language: [
    { required: true, message: '请选择擅长语言', trigger: 'change' },
  ],
  members: [
    { required: true, message: '请输入队伍人数', trigger: 'change' },
    { type: 'number', min: 1, max: 5, message: '队伍人数必须在1-5之间', trigger: 'change' },
  ]
}

// 比赛类型、领域和语言选项
const domains = ['算法设计', '数据结构', '系统编程', '前端', '后端', '移动开发', '游戏开发', '人工智能']
const competitionTypes = ['ICPC', 'CCPC', 'LeetCode', 'Codeforces', 'AtCoder', 'HackerRank', 'Kaggle']
const languages = ['C++', 'Python', 'JavaScript', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin']

// 当前匹配状态
const currentMatch = ref([
  {
    id: '#MATCH12345',
    members: 2,
    capacity: 3,
    deadline: '2025-03-31 23:59',
    status: '进行中',
  },
  {
    id: '#MATCH12345',
    members: 2,
    capacity: 3,
    deadline: '2025-03-31 23:59',
    status: '进行中',
  },
  {
    id: '#MATCH12345',
    members: 2,
    capacity: 3,
    deadline: '2025-03-31 23:59',
    status: '进行中',
  },
  {
    id: '#MATCH12345',
    members: 2,
    capacity: 3,
    deadline: '2025-03-31 23:59',
    status: '进行中',
  },
])

// 匹配历史
const matchHistory = ref([
  { id: '#MATCH1001', status: '已组队' },
  { id: '#MATCH2020', status: '进行中' },
  { id: '#MATCH3005', status: '已结束' },
])

// 状态对应颜色
const statusType = {
  进行中: 'warning',
  已组队: 'success',
  已结束: 'info',
  匹配中: 'primary',
}

// 表单引用
const matchForm = ref(null)
// 匹配动画弹窗
const dialogVisible = ref(false)
// 提交匹配
const isSubmitting = ref(false)
const submitMatch = () => {
  console.log('提交数据:', form)
  matchForm.value.validate((valid) => {
    if (valid) {
      isSubmitting.value = true
      // 匹配动画弹窗
      dialogVisible.value = true
      setTimeout(() => {
        dialogVisible.value = false
        // 模拟匹配进度
        if (!dialogVisible.value) {
          setTimeout(() => {
            currentMatch.value.unshift({
              id: `#MATCH${Math.random().toString(16).substr(2, 5)}`,
              members: 1,
              capacity: 3,
              deadline: new Date().toISOString().slice(0, 16),
              status: '匹配中',
            })
            matchHistory.value.unshift({
              id: currentMatch.value[0].id,
              status: currentMatch.value[0].status,
            })
            isSubmitting.value = false
            // 模拟匹配进度
            const timer = setInterval(() => {
              if (currentMatch.value[0].members < 3) {
                currentMatch.value[0].members++
              } else {
                clearInterval(timer)
                currentMatch.value[0].status = '已组队'
              }
            }, 3000)
          }, 500)
        }
      }, 7000)
    }
  })
}

// 匹配详情
const handleVisable = () => {
  dialogFormVisible.value = true
}
const handleClose = () => {
  dialogFormVisible.value = false
}
</script>

<template>
  <div class="default-layout">
    <div class="main-layout">
      <!-- 主内容区 -->
      <div class="main">
        <!-- 匹配表单 -->
        <h2 class="section-title">创建匹配</h2>
        <el-form :model="form" :rules="rules" ref="matchForm" class="match-form" label-position="top">
          <el-form-item label="擅长领域" prop="domain">
            <el-select v-model="form.domain" placeholder="请选择领域">
              <el-option v-for="domain in domains" :key="domain" :label="domain" :value="domain" />
            </el-select>
          </el-form-item>
          <el-form-item label="擅长语言/框架" prop="language">
            <el-select v-model="form.language" placeholder="请选择语言" multiple clearable>
              <el-option v-for="lang in languages" :key="lang" :label="lang" :value="lang" />
            </el-select>
          </el-form-item>
          <el-form-item label="比赛名称" prop="competition">
            <el-select v-model="form.competition" placeholder="请选择类型">
              <el-option v-for="type in competitionTypes" :key="type" :label="type" :value="type" />
            </el-select>
          </el-form-item>
          <el-form-item label="人数" prop="members">
            <el-input type="number" v-model.number="form.members" :min="1" :max="5" placeholder="请输入人数" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitMatch" :loading="isSubmitting" class="primary-btn">开始匹配</el-button>
          </el-form-item>
          <MatchAnimationDialog :dialogVisible="dialogVisible" />
        </el-form>

        <!-- 当前匹配 -->
        <h2 class="section-title">匹配列表</h2>
        <div class="match-info">
          <!-- 空状态 -->
          <el-empty description="description" v-show="currentMatch.length === 0" />
          <!-- 有内容 -->
          <el-card class="match-card" v-for="currentMatch in currentMatch" :key="currentMatch">
            <div class="match-details">
              <p>匹配ID: {{ currentMatch.id }}</p>
              <p>成员人数: {{ currentMatch.members }}/{{ currentMatch.capacity }}</p>
              <p>截止时间: {{ currentMatch.deadline }}</p>
              <el-tag :type="statusType[currentMatch.status]" class="status-tag" effect="dark">{{
                currentMatch.status
                }}</el-tag>
            </div>
            <el-button type="primary" class="secondary-btn" @click="handleVisable">查看详情</el-button>
          </el-card>
        </div>
        <TeamMatch :dialogFormVisible="dialogFormVisible" @close="handleClose" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 用户卡片 -->
        <el-card class="user-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>用户信息</span>
            </div>
          </template>
          <div class="user-details">
            <el-avatar :src="userProfile.avatar" :size="60" class="avatar"></el-avatar>
            <div class="info">
              <h3>{{ userProfile.nickname }}</h3>
              <p>竞赛等级：{{ userProfile.level }}</p>
              <p>共参加比赛：{{ userProfile.wins }} 场</p>
            </div>
          </div>
          <div class="points">
            <span>{{ userProfile.points }}</span>
            <el-progress :percentage="userProfile.PointsPercentage" :stroke-width="6" :show-text="false"
              class="progress" />
          </div>
        </el-card>

        <!-- 匹配历史 -->
        <el-card class="recent-matches">
          <template v-slot:header>
            <div class="clearfix">
              <span>最近匹配信息</span>
            </div>
          </template>
          <!-- 空状态下 -->
          <el-empty description="description" v-show="matchHistory.length === 0" />
          <!-- 有内容 -->
          <el-scrollbar max-height="65vh">
            <el-timeline>
              <el-timeline-item v-for="match in matchHistory" :key="match.id" :timestamp="match.id" placement="top">
                <el-tag :type="statusType[match.status]" class="small-tag" effect="dark">{{ match.status }}</el-tag>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.default-layout {
  max-width: 1200px;
  margin: 0 auto;
}

.main-layout {
  display: flex;
  gap: 24px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

/* 主内容区样式 */
.main {
  flex: 1;
  min-width: 0;

  .section-title {
    font-size: 1.4em;
    color: #2c3e50;
    margin: 0 0 16px 0;
    padding-left: 12px;
    border-left: 4px solid #409EFF;
  }
}

.match-form {
  background: #fff;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .el-form-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-select {
    width: 100%;
  }

  .primary-btn {
    width: 100%;
    height: 40px;
    font-size: 16px;
  }
}

.match-info {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  .match-card {
    position: relative;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    .status-tag {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .match-details {
      p {
        margin: 8px 0;
        color: #606266;
        font-size: 0.95em;
      }
    }

    .secondary-btn {
      margin-top: 12px;
      width: 100%;
    }
  }
}

/* 侧边栏样式 */
.aside {
  width: 300px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  :deep(.el-card__header) {
    background: rgba(64, 158, 255, 0.05);
    border-bottom: 1px solid #ebeef5;
    padding: 14px 20px;

    span {
      font-weight: 600;
      color: #2c3e50;
      letter-spacing: 0.5px;
    }

    .clearfix {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      padding-left: 12px;
      border-left: 4px solid #409EFF;
    }
  }

  .user-card {
    background: linear-gradient(135deg, rgba(246, 248, 250, 0.9) 0%, #ffffff 100%);

    .user-details {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 16px 0;

      .avatar {
        flex-shrink: 0;
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
      }

      .info {
        flex: 1;

        h3 {
          margin: 0 0 8px;
          font-size: 1.2em;
          color: #2c3e50;
        }

        p {
          margin: 6px 0;
          font-size: 0.95em;
          color: #606266;
          display: flex;
          align-items: center;
          gap: 6px;

          &::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 4px;
            background: #409EFF;
            border-radius: 50%;
            margin-right: 8px;
          }

          &:nth-child(2) {
            color: #e6a23c;
            font-weight: 500;
          }

          &:last-child {
            color: #909399;
            font-size: 0.9em;
          }
        }
      }
    }

    .points {
      span {
        display: block;
        font-size: 0.9em;
        color: #606266;
        margin-bottom: 8px;

        &::before {
          content: '积分：';
          color: #409EFF;
          font-weight: 500;
        }
      }
    }
  }

  .recent-matches {
    margin-top: 30px;

    .el-scrollbar {
      padding: 0 16px;

      :deep(.el-timeline) {
        padding-left: 8px;

        .el-timeline-item {
          padding-bottom: 16px;

          &:last-child {
            padding-bottom: 8px;
          }

          &__node {
            width: 14px;
            height: 14px;
            left: -1px;
            background: #409EFF;
            border: 2px solid white;
            box-shadow: 0 2px 8px fade(#409EFF, 20%);

            &-normal {
              left: 3px;
            }
          }

          &__timestamp {
            color: #606266;
            font-size: 0.9em;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .small-tag {
      transform: scale(0.9);
      margin-left: -8px;
      font-weight: 500;
      letter-spacing: 0.5px;
      border-radius: 4px;
      padding: 6px 10px;
    }

    // 移动端适配
    @media (max-width: 768px) {
      .el-scrollbar {
        padding: 0 8px;

        :deep(.el-timeline) {
          padding-left: 0;

          .el-timeline-item {
            &__timestamp {
              font-size: 0.85em;
            }
          }
        }
      }

      .small-tag {
        font-size: 0.85em;
        padding: 4px 8px;
      }
    }
  }
}

/* 状态标签颜色映射 */
.status-tag {
  &[type="success"] {
    background: #67c23a;
  }

  &[type="warning"] {
    background: #e6a23c;
  }

  &[type="danger"] {
    background: #f56c6c;
  }

  &[type="info"] {
    background: #909399;
  }
}
</style>
