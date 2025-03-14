<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive } from 'vue'

// 用户信息
const userProfile = ref({
  nickname: '前端小能手',
  level: '白银Ⅱ',
  wins: 18,
  avatar: 'https://via.placeholder.com/60',
})

// 表单数据
const form = reactive({
  domain: '',
  competition: '',
})

// 验证规则
const rules = {
  domain: [
    { required: true, message: '请选择擅长领域', trigger: 'change' },
  ],
  competition: [
    { required: true, message: '请选择比赛类型', trigger: 'change' },
  ],
}

// 比赛类型和领域
const domains = ['算法设计', '数据结构', '系统编程']
const competitionTypes = ['ICPC', 'CCPC', 'LeetCode']

// 当前匹配状态
const currentMatch = ref({
  id: '#MATCH12345',
  members: 2,
  capacity: 3,
  deadline: '2025-03-31 23:59',
  status: '进行中',
})

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

// 提交匹配
const isSubmitting = ref(false)
const submitMatch = () => {
  matchForm.value.validate((valid) => {
    if (valid) {
      isSubmitting.value = true
      setTimeout(() => {
        currentMatch.value = {
          id: `#MATCH${Math.random().toString(16).substr(2, 5)}`,
          members: 1,
          capacity: 3,
          deadline: new Date().toISOString().slice(0, 16),
          status: '匹配中',
        }
        matchHistory.value.unshift({
          id: currentMatch.value.id,
          status: '匹配中',
        })
        isSubmitting.value = false
        // 模拟匹配进度
        const timer = setInterval(() => {
          if (currentMatch.value.members < 3) {
            currentMatch.value.members++
          } else {
            clearInterval(timer)
            currentMatch.value.status = '已组队'
          }
        }, 3000)
      }, 1000)
    }
  })
}
</script>

<template>
  <div class="default-layout">
    <h1>队友匹配系统</h1>
    <div class="main-layout">
      <!-- 主内容区 -->
      <div class="main">
        <!-- 匹配表单 -->
        <el-form :model="form" :rules="rules" ref="matchForm" class="match-form" label-position="top">
          <h2 class="section-title">创建匹配</h2>
          <el-form-item label="擅长领域" prop="domain">
            <el-select v-model="form.domain" placeholder="请选择领域">
              <el-option v-for="domain in domains" :key="domain" :label="domain" :value="domain" />
            </el-select>
          </el-form-item>
          <el-form-item label="比赛类型" prop="competition">
            <el-select v-model="form.competition" placeholder="请选择类型">
              <el-option v-for="type in competitionTypes" :key="type" :label="type" :value="type" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitMatch" :loading="isSubmitting" class="primary-btn">开始匹配</el-button>
          </el-form-item>
        </el-form>

        <!-- 当前匹配 -->
        <h2 class="section-title">匹配列表</h2>
        <div class="match-info">
          <el-card class="match-card" v-for="item in 4" :key="item">
            <div class="match-details">
              <p>匹配ID: {{ currentMatch.id }}</p>
              <p>成员人数: {{ currentMatch.members }}/{{ currentMatch.capacity }}</p>
              <p>截止时间: {{ currentMatch.deadline }}</p>
              <el-tag :type="statusType[currentMatch.status]" class="status-tag" effect="dark">{{ currentMatch.status
                }}</el-tag>
            </div>
            <el-button type="primary" class="secondary-btn">查看详情</el-button>
          </el-card>
        </div>
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
              <p>胜场数：{{ userProfile.wins }} 场</p>
            </div>
          </div>
        </el-card>

        <!-- 匹配历史 -->
        <el-card class="recent-matches">
          <template v-slot:header>
            <div class="clearfix">
              <span>最近匹配</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item v-for="match in matchHistory" :key="match.id" :timestamp="match.id" placement="top">
              <el-tag :type="statusType[match.status]" class="small-tag" effect="dark">{{ match.status }}</el-tag>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.default-layout {
  padding: 20px;
  color: #333;

  .main-layout {
    display: flex;
    gap: 20px;
    margin-top: 30px;

    .main {
      width: 70%;

      .match-info {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        .match-card {
          width: 48%;
          margin-top: 20px;

          .match-details {
            padding: 10px;
            border-bottom: 1px solid #EBEBEB;

            p {
              margin-bottom: 2px;
            }

            .status-tag {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }

  .aside {
    width: 30%;
  }
}
</style>
