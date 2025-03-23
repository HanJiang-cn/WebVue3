<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { ElCard, ElStatistic, ElTable, ElTableColumn, ElTag } from 'element-plus'
import * as echarts from 'echarts'

// 模拟数据
const practiceData = ref({
  total: 1286,
  correctRate: 76.8,
  dailyActive: 234,
  trendData: [65, 78, 66, 89, 93, 102, 115],
  categories: [
    { name: '动态规划', value: 342 },
    { name: '二叉树', value: 278 },
    { name: '链表', value: 195 },
    { name: '回溯算法', value: 167 },
    { name: '其他', value: 304 }
  ]
})

const recentRecords = ref([
  { date: '2024-02-20', topic: '动态规划', correct: true },
  { date: '2024-02-19', topic: '二叉树', correct: false },
  { date: '2024-02-18', topic: '链表', correct: true },
  { date: '2024-02-17', topic: '回溯算法', correct: true },
  { date: '2024-02-16', topic: '图论', correct: false }
])

// 初始化图表
let chart = null
const initChart = () => {
  const chartDom = document.getElementById('trend-chart')
  chart = echarts.init(chartDom)
  const option = {
    color: ['#409EFF'],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: practiceData.value.trendData,
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#409EFF'
          }, {
            offset: 1, color: 'rgba(64,158,255,0.1)'
          }]
        }
      }
    }]
  }
  chart.setOption(option)
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="dashboard-container">
    <!-- 数据概览 -->
    <el-row :gutter="16" class="mb-4">
      <el-col :xs="24" :sm="8">
        <el-card class="stat-card blue-card">
          <div class="stat-content">
            <el-icon class="stat-icon">
              <DataBoard />
            </el-icon>
            <div>
              <div class="stat-title">总刷题数</div>
              <el-statistic :value="practiceData.total" :value-style="{ fontSize: '28px', color: '#409EFF' }" />
              <div class="stat-trend success">
                <el-icon>
                  <TrendChapters />
                </el-icon>
                周同比 +12%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-card class="stat-card green-card">
          <div class="stat-content">
            <el-icon class="stat-icon">
              <List />
            </el-icon>
            <div>
              <div class="stat-title">正确率</div>
              <el-statistic :value="practiceData.correctRate" suffix="%" :precision="1"
                :value-style="{ fontSize: '28px', color: '#67C23A' }" />
              <div class="stat-trend warning">
                <el-icon>
                  <TrendChapters />
                </el-icon>
                较昨日 +2.5%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-card class="stat-card purple-card">
          <div class="stat-content">
            <el-icon class="stat-icon">
              <User />
            </el-icon>
            <div>
              <div class="stat-title">日活跃用户</div>
              <el-statistic :value="practiceData.dailyActive" :value-style="{ fontSize: '28px', color: '#8A2BE2' }" />
              <div class="stat-trend success">
                <el-icon>
                  <TrendChapters />
                </el-icon>
                在线率 89%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 主要内容区域 -->
    <el-row :gutter="20">
      <!-- 左侧内容 -->
      <el-col :xs="24" :sm="16">
        <!-- 趋势图表 -->
        <el-card class="chart-card mb-4">
          <div class="chart-header">
            <span class="chart-title">近7天刷题趋势</span>
            <div class="chart-legend">
              <span class="legend-item"><i class="dot blue"></i>刷题量</span>
            </div>
          </div>
          <div id="trend-chart" style="height: 300px;"></div>
        </el-card>

        <!-- 题目分类 -->
        <el-card class="mb-4">
          <div class="chart-title">题目分类统计</div>
          <div class="category-chart" style="height: 280px;"></div>
        </el-card>
      </el-col>

      <!-- 右侧侧边栏 -->
      <el-col :xs="24" :sm="8">
        <!-- 最近记录表格 -->
        <el-card class="mb-4">
          <div class="record-header">
            <span class="record-title">最近刷题记录</span>
          </div>
          <el-table :data="recentRecords" style="width: 100%">
            <el-table-column prop="date" label="日期" width="100" />
            <el-table-column prop="topic" label="题目类型" />
            <el-table-column label="状态" width="80" align="center">
              <template #default="{ row }">
                <el-tag :type="row.correct ? 'success' : 'danger'" size="small" effect="dark">
                  {{ row.correct ? '正确' : '错误' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <!-- 热门题目 -->
        <el-card>
          <div class="record-title">热门题目排行</div>
          <div class="hot-list">
            <div v-for="n in 5" :key="n" class="hot-item">
              <span class="rank">{{ n }}</span>
              <span class="title">经典动态规划问题 #{{ n }}</span>
              <span class="count">1.2k次练习</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.mb-4 {
  margin-bottom: 20px;
}

.dashboard-container {
  padding: 20px;

  .stat-card {
    margin-bottom: 20px;
    border-radius: 12px;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stat-content {
      display: flex;
      align-items: center;
      padding: 16px;

      .stat-icon {
        font-size: 40px;
        margin-right: 20px;
        padding: 12px;
        border-radius: 8px;
      }

      .stat-title {
        color: #909399;
        font-size: 14px;
        margin-bottom: 8px;
      }

      .stat-trend {
        font-size: 12px;
        margin-top: 8px;
        display: flex;
        align-items: center;

        &.success {
          color: #67C23A;
        }

        &.warning {
          color: #E6A23C;
        }
      }
    }

    &.blue-card {
      .stat-icon {
        color: #409EFF;
        background: rgba(64, 158, 255, 0.1);
      }
    }

    &.green-card {
      .stat-icon {
        color: #67C23A;
        background: rgba(103, 194, 58, 0.1);
      }
    }

    &.purple-card {
      .stat-icon {
        color: #8A2BE2;
        background: rgba(138, 43, 226, 0.1);
      }
    }
  }

  .chart-card {
    border-radius: 8px;

    :deep(.el-card__body) {
      padding: 20px;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .chart-title {
      color: #606266;
      font-size: 16px;
      font-weight: 600;
    }

    .chart-legend {
      .legend-item {
        display: inline-flex;
        align-items: center;
        margin-left: 20px;
        font-size: 12px;

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 6px;

          &.blue {
            background: #409EFF;
          }
        }
      }
    }
  }

  .record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .record-title {
    color: #606266;
    font-size: 16px;
    font-weight: 600;
  }

  // 表格样式优化
  :deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;

    th {
      background-color: #f5f7fa;
      color: #606266;
    }

    .el-table__row:hover {
      td {
        background-color: #f5f7fa !important;
      }
    }
  }

  .progress-box {
    margin-top: 20px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;

    .progress-label {
      color: #606266;
      margin-bottom: 8px;
    }

    .progress-text {
      color: #909399;
      font-size: 12px;
      margin-top: 8px;
    }
  }

  .hot-list {
    .hot-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;

      .rank {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #f0f2f5;
        border-radius: 4px;
        margin-right: 12px;
      }

      .title {
        flex: 1;
        color: #606266;
      }

      .count {
        color: #909399;
        font-size: 12px;
      }

      &:nth-child(1) .rank {
        background: #fff0f0;
        color: #f56c6c;
      }

      &:nth-child(2) .rank {
        background: #fff7e6;
        color: #e6a23c;
      }

      &:nth-child(3) .rank {
        background: #f0f5ff;
        color: #409EFF;
      }
    }
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 10px;

    .stat-card {
      margin-bottom: 12px;
    }

    .hot-item {
      padding: 8px 0;
    }
  }
}
</style>
