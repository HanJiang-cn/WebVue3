<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { searchCompetition, signCompetition, reviewCompetition } from '@/api/competition'
import { ElMessage } from 'element-plus'
import router from '@/router'
import moment from 'moment'
//从userStore中导入用户id
import { useUserStore } from '@/stores/user'
import PreviewOnly from '@/components/PreviewOnly.vue'
const isSigned = ref(false)
const userStore = useUserStore()
// 状态映射
const statusMap = {
  1: { text: '正在报名', class: 'status-ongoing' },
  2: { text: '进行中', class: 'status-processing' },
  3: { text: '已结束', class: 'status-ended' }
}

const id = ref(router.currentRoute.value.query.id)
const competition = ref({})
const defaultCover = 'https://publicqn.saikr.com/saikr/contest/1741945485113/1741945485113c8rsy744kh9.png'

// 计算竞赛状态
const competitionStatus = computed(() => {
  const now = moment()
  if (now.isBefore(competition.value.startTime)) return 1
  if (now.isBetween(competition.value.startTime, competition.value.endTime)) return 2
  return 3
})

// 剩余天数计算
const remainingDays = computed(() => {
  const now = moment()
  const target = competitionStatus.value === 1
    ? competition.value.startTime
    : competition.value.endTime
  return Math.max(0, moment(target).diff(now, 'days'))
})

// 获取竞赛详情
const getCompetition = async () => {
  console.log(id.value)
  try {
    const { data } = await searchCompetition({ competitionId: id.value })
    // 将返回数组的第一个元素赋值给 competition
    if (data && data.length > 0) {
      competition.value = data[0]

      // 处理可能的空值字段
      competition.value.views = competition.value.views || 0
      competition.value.pushName = competition.value.pushName || '大赛组委会'
    }
  } catch (error) {
    ElMessage.error('获取竞赛信息失败')
  }
}
//获取是否已经报名
const checkSignStatus = async () => {
  if (!userStore.isLogin) {
    isSigned.value = false
    return
  }

  try {
    const { data } = await reviewCompetition(id.value, userStore.id)
    // 根据实际返回的data字符串判断
    isSigned.value = data === "已参加"

  } catch (error) {
    isSigned.value = false
  }
}
// 报名
const handleSignUp = async () => {
  try {
    const { code } = await signCompetition(id.value, userStore.id)
    if (code === 0) {
      ElMessage.success('报名成功')
      await checkSignStatus() // 重新获取最新状态
    }
  } catch (error) {
    ElMessage.error('已报名')
  }
}
//点击进行考试
const handleExam = () => {
  window.open(router.resolve({
    path: '/competition/answer',
    query: {
      id: id.value
    }
  }).href, '_self')
  // router.push({
  //   path: '/competition/answer',
  //   query: {
  //     id: id.value
  //   }
  // })
}

onMounted(() => {
  getCompetition()
})
</script>

<template>
  <div class="detail-container">
    <!-- 封面图 -->
    <div class="cover-wrapper">
      <img :src="competition.coverUrl || defaultCover" :alt="competition.name" class="competition-cover">
    </div>

    <!-- 主体内容 -->
    <main class="main-content">
      <!-- 左侧内容 -->
      <section class="content-main">
        <div class="competition-header">
          <h1 class="title">{{ competition.name }}</h1>
          <span :class="['status-tag', statusMap[competitionStatus].class]">
            {{ statusMap[competitionStatus].text }}
          </span>
        </div>

        <div class="time-info">
          <p>
            <span>报名时间：</span>
            {{ moment(competition.startTime).format('YYYY-MM-DD HH:mm') }} 至
            {{ moment(competition.endTime).format('YYYY-MM-DD HH:mm') }}
          </p>
          <p v-if="competitionStatus !== 3" class="countdown">
            距离{{ competitionStatus === 1 ? '报名截止' : '比赛结束' }}还有
            <span class="highlight">{{ remainingDays }}</span> 天
          </p>
        </div>

        <div class="info-section">
          <h2 class="section-title">竞赛信息</h2>
          <pre class="competition-info">
            <PreviewOnly :content="competition.info" />
            <!-- {{ competition.info }} -->
          </pre>
        </div>

        <div class="info-section">
          <h2 class="section-title">主办方信息</h2>
          <p class="organizer-info">{{ competition.organizer }}</p>
        </div>
      </section>

      <!-- 右侧侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">竞赛概览</h3>
          <div class="meta-info">
            <div class="meta-item">
              <span class="label">竞赛类型：</span>
              <span class="value">{{ competition.type === 1 ? '个人赛' : '团队赛' }}</span>
            </div>
            <!-- <div class="meta-item">
              <span class="label">浏览次数：</span>
              <span class="value">{{ (competition.views / 10000).toFixed(1) }}万</span>
            </div> -->
            <div class="meta-item">
              <span class="label">发布机构：</span>
              <span class="value">{{ competition.pushName || '大赛组委会' }}</span>
            </div>
          </div>
          <el-button v-if="competitionStatus === 1" type="primary" class="signup-btn" :disabled="isSigned"
            @click="handleSignUp">
            {{ !isSigned ? '立即报名' : '已报名' }}
          </el-button>

          <!-- 考试按钮 -->
          <el-button v-if="competitionStatus === 2" type="primary" class="signup-btn" :disabled="isSigned"
            @click="handleExam">
            进行考试
            <el-tooltip v-if="isSigned" content="请先完成报名" placement="top">
              <i class="el-icon-warning" style="margin-left: 5px" />
            </el-tooltip>
          </el-button>

          <!-- 结束提示 -->
          <div v-if="competitionStatus === 3" class="disabled-tip">
            赛事已结束
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style lang="less" scoped>
.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.cover-wrapper {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;

  .competition-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

.competition-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;

  .title {
    font-size: 28px;
    color: #333;
    margin: 0;
  }

  .status-tag {
    width: 75px;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 14px;
    text-align: center;


    &.status-ongoing {
      background: #e8f4ff;
      color: #1890ff;
    }

    &.status-processing {
      background: #fff7e6;
      color: #faad14;
    }

    &.status-ended {
      background: #fff0f0;
      color: #ff4d4f;
    }
  }
}

.time-info {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;

  p {
    margin: 8px 0;
    color: #666;
  }

  .countdown {
    font-size: 16px;

    .highlight {
      color: #22bfa7;
      font-weight: bold;
      font-size: 20px;
    }
  }
}

.info-section {
  margin-bottom: 32px;

  .section-title {
    font-size: 20px;
    color: #333;
    border-left: 4px solid #1890ff;
    padding-left: 12px;
    margin: 16px 0;
  }

  .competition-info {
    white-space: pre-wrap;
    line-height: 1.8;
    color: #444;
  }

  .organizer-info {
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
  }
}

.sidebar {
  .sidebar-card {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .sidebar-title {
      font-size: 18px;
      color: #333;
      margin-top: 0;
    }
  }

  .meta-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    .label {
      color: #999;
    }

    .value {
      color: #666;
      font-weight: 500;
    }
  }

  .disabled-tip {
    margin-top: 20px;
    padding: 12px;
    text-align: center;
    background: #f5f7fa;
    color: #909399;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
  }

  .signup-btn {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    font-size: 16px;
  }
}
</style>
