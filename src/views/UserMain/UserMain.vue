<!-- eslint-disable vue/block-lang -->
<script setup>
import lg02 from '@/assets/lg02.png'
import HeatMap from '@/components/UserMain/HeatMap.vue'
import { ref, reactive } from 'vue'
import { useChart } from '@/hooks/useChart'
// import { usePagination } from '@/hooks/usePagination'

const activeName = ref('1')
const chartRef1 = ref(null)
const setChartData1 = () => {
  const chartOptions = reactive({
    legend: {
      top: '15%',
      left: '80%',
    },
    series: [
      {
        type: 'pie',
        radius: ['70%', '55%'],
        avoidLabelOverlap: false,
        center: ['45%', '35%'],
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
            fontWeight: 'bold',
            formatter: [
              '已完成{b}题目',
              '{c}个'
            ].join('\n'),
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '简单' },
          { value: 735, name: '普通' },
          { value: 580, name: '困难' },
        ]
      }
    ]
  })
  return chartOptions
}
useChart(chartRef1, setChartData1)

const tableData = reactive([
  {
    id: 1,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '已完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 2,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 3,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 4,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 5,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 6,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  },
  {
    id: 7,
    title: '两数之和',
    difficulty: '简单',
    progress: 100,
    date: '2023-03-13',
    status: '未完成',
    time: '10分钟',
    language: 'JavaScript',
  }
])

const pageInfo = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})
</script>

<template>
  <el-row style="width: 100%;">
    <el-avatar shape="square" :size="70"
      src="https://assets.leetcode.cn/aliyun-lc-upload/users/39WPa6NPut/avatar_1740320643.png?x-oss-process=image%2Fformat%2Cwebp" />
    <div class="user-avatar">
      <p>Han_Jiang</p>
      <p>hanjiang-cn</p>
      <p>个人签名：长风破浪会有时，直挂云帆济沧海</p>
    </div>
  </el-row>
  <el-row style="width: 100%; margin-top: 40px;" :gutter="20">
    <!-- 左栏 -->
    <el-col :span="7" style="margin-right: 0px;">
      <el-card style="width: 100%;">
        <!-- 个人资料 -->
        <el-row style="width: 100%; margin-bottom: 10px; border-bottom: 1px solid #e6e6e6;">
          <el-row style="width: 100%; margin-bottom: 20px; margin-top: 5px;">
            <div class="user-concern">
              <div>
                <p>关注</p>
                <p>100</p>
              </div>
              <div>
                <p>粉丝</p>
                <p>10000</p>
              </div>
              <div>
                <p>收藏</p>
                <p>100</p>
              </div>
            </div>
          </el-row>
          <el-row style="width: 100%;">
            <el-button type="success" plain style="width: 100%;">编辑个人资料</el-button>
          </el-row>
          <el-row style="width: 100%; margin-top: 20px;">
            <div class="user-info">
              <div class="title">
                <span>个人简介</span>
                <p>鸽鸽鸽鸽鸽鸽鸽鸽鸽鸽鸽鸽</p>
              </div>
              <div class="info">
                <!-- ip -->
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1em" height="1em"
                    fill="currentColor" class="w-[15px] h-[15px] text-label-2 dark:text-dark-label-2">
                    <path
                      d="M6.486 5.5a.986.986 0 00-.986.986v7.596a.986.986 0 101.972 0V6.486a.986.986 0 00-.986-.986z">
                    </path>
                    <path fill-rule="evenodd"
                      d="M9.472 5.5a1 1 0 00-1 1v7.576a.992.992 0 101.984 0v-2.512h2.008c1.045 0 1.924-.225 2.545-.758.637-.546.919-1.34.919-2.286 0-.94-.279-1.729-.913-2.27-.62-.529-1.496-.75-2.539-.75H9.472zm.984 4.212v-2.36h1.96c.635 0 .995.125 1.199.3l.012.01.013.01c.166.124.304.364.304.848 0 .474-.134.734-.313.888-.21.172-.58.304-1.215.304h-1.96z"
                      clip-rule="evenodd"></path>
                    <path fill-rule="evenodd"
                      d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>山东</span>
                </p>
                <!-- 性别 -->
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                    fill="currentColor" class="w-full h-full text-label-2 dark:text-dark-label-2">
                    <path fill-rule="evenodd"
                      d="M16.008 12.124A1.017 1.017 0 0116 12V7.586l-1.121 1.121a1 1 0 11-1.415-1.414l2.829-2.829a1 1 0 011.414 0l2.828 2.829a1 1 0 11-1.414 1.414L18 7.586V12c0 .042-.003.083-.008.124A4.002 4.002 0 0117 20a4 4 0 01-.992-7.876zm-8.016-.248c.005.04.008.082.008.124v1h2a1 1 0 110 2H8v4a1 1 0 11-2 0v-4H4a1 1 0 110-2h2v-1c0-.042.003-.083.008-.124A4.002 4.002 0 017 4a4 4 0 01.992 7.876zM7 10a2 2 0 100-4 2 2 0 000 4zm10 4a2 2 0 100 4 2 2 0 000-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>男</span>
                </p>
                <!-- 生日 -->
                <p>
                  <CalendarOutlined />
                  <span>1998.1.1</span>
                </p>
                <!-- 个人网站 -->
                <p>
                  <GlobalOutlined />
                  <span>2119.online</span>
                </p>
                <!-- GitHub -->
                <p>
                  <GithubOutlined />
                  <span>hanjiang-cn</span>
                </p>
              </div>
            </div>
          </el-row>
        </el-row>
        <!-- 荣誉 -->
        <el-row style="width: 100%; margin-bottom: 10px; border-bottom: 1px solid #e6e6e6;">
          <el-row style="width: 100%; margin-bottom: 20px; margin-top: 5px;">
            <div class="user-accomplishment">
              <div class="title">
                <span>相关数据</span>
              </div>
              <div class="accomplishment">
                <div>
                  <el-icon :size="20">
                    <Checked />
                  </el-icon>
                  <div>
                    <p>共做题数 10000 道</p>
                    <p>昨天：10000</p>
                  </div>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"
                    class="text-blue-s dark:text-dark-blue-s">
                    <path fill-rule="evenodd"
                      d="M1.104 12.444a1 1 0 010-.888c.13-.26.37-.693.722-1.241A18.85 18.85 0 013.88 7.652C6.184 5.176 8.896 3.667 12 3.667s5.816 1.509 8.119 3.985c.79.85 1.475 1.756 2.055 2.663.352.548.593.98.722 1.24a1 1 0 010 .89c-.13.26-.37.692-.722 1.24a18.848 18.848 0 01-2.055 2.663c-2.303 2.476-5.015 3.985-8.119 3.985s-5.816-1.509-8.119-3.985a18.846 18.846 0 01-2.055-2.663c-.352-.548-.593-.98-.722-1.24zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p>解法被浏览 10000 次</p>
                    <p>昨天：10000</p>
                  </div>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"
                    class="text-brand-orange dark:text-dark-brand-orange">
                    <path fill-rule="evenodd"
                      d="M11.394 2.074a2.5 2.5 0 011.212 0c.723.181 1.185.735 1.526 1.262.342.528.703 1.259 1.131 2.127l.392.795c.302.61.348.667.386.7a.498.498 0 00.086.063c.043.025.11.052.786.15l.877.128c.958.139 1.764.256 2.372.418.606.162 1.276.43 1.671 1.062a2.5 2.5 0 01.375 1.152c.052.744-.333 1.354-.728 1.841-.397.489-.98 1.058-1.674 1.733l-.634.619c-.489.476-.527.537-.548.583a.5.5 0 00-.033.101c-.01.05-.015.122.1.794l.15.873c.164.954.302 1.758.335 2.386.034.627-.014 1.346-.493 1.918-.263.314-.6.558-.98.712-.692.279-1.39.102-1.976-.124-.588-.226-1.309-.605-2.165-1.056l-.785-.412c-.603-.317-.674-.335-.724-.34a.497.497 0 00-.106 0c-.05.005-.12.023-.724.34l-.785.412c-.856.45-1.577.83-2.165 1.056-.585.226-1.284.403-1.976.124a2.5 2.5 0 01-.98-.712c-.48-.572-.527-1.291-.493-1.918.033-.628.171-1.431.335-2.386l.15-.873c.115-.672.11-.745.1-.794a.5.5 0 00-.033-.101c-.02-.046-.06-.107-.548-.583l-.634-.619c-.694-.675-1.277-1.244-1.674-1.733-.395-.487-.78-1.097-.728-1.841a2.5 2.5 0 01.375-1.152c.395-.633 1.065-.9 1.67-1.062.61-.162 1.415-.28 2.373-.418l.877-.128c.675-.098.743-.125.786-.15a.5.5 0 00.086-.062c.038-.034.084-.09.386-.701l.392-.795c.428-.868.789-1.599 1.131-2.127.341-.527.803-1.08 1.526-1.262z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p>解法被收藏 10000 次</p>
                    <p>昨天：10000</p>
                  </div>
                </div>
                <div>
                  <el-icon :size="20">
                    <Promotion />
                  </el-icon>
                  <div>
                    <p>共互动 10000 次</p>
                    <p>昨天：10000</p>
                  </div>
                </div>
              </div>
            </div>
          </el-row>
        </el-row>
        <!-- 标签 -->
        <el-row style="width: 100%; margin-bottom: 10px; border-bottom: 1px solid #e6e6e6;">
          <el-row style="width: 100%; margin-bottom: 20px; margin-top: 5px;">
            <div class="user-tag">
              <div class="title">
                <span>自我标签</span>
              </div>
              <div class="tag">
                <el-tag>标签1</el-tag>
                <el-tag>标签22</el-tag>
                <el-tag>新纪元延期十年</el-tag>
                <el-tag>标签41</el-tag>
                <el-tag>标</el-tag>
                <el-tag>标签61</el-tag>
                <el-tag>你被骗了！</el-tag>
              </div>
            </div>
          </el-row>
        </el-row>
        <!-- 语言 -->
        <el-row style="width: 100%; margin-bottom: 10px; border-bottom: 1px solid #e6e6e6;">
          <el-row style="width: 100%; margin-bottom: 20px; margin-top: 5px;">
            <div class="user-tag">
              <div class="title">
                <span>语言</span>
              </div>
              <div class="tag">
                <el-tag type="info">C++</el-tag>
                <el-tag type="info">C</el-tag>
                <el-tag type="info">PHP</el-tag>
                <el-tag type="info">HTML</el-tag>
              </div>
            </div>
          </el-row>
        </el-row>
      </el-card>
    </el-col>
    <!-- 右栏 -->
    <el-col :span="17">
      <el-row style="width: 100%; margin-bottom: 15px;">
        <!-- 饼图 -->
        <el-col :span="12" style="margin-right: 0px;">
          <el-card style="height: 180px; margin-right: 10px;">
            <div class="title">
              <span>做题分布</span>
            </div>
            <div ref="chartRef1" style="width: 100%; height: 200px; margin-top: -20px;"></div>
          </el-card>
        </el-col>
        <!-- 一言 -->
        <el-col :span="12">
          <el-card style="height: 180px; margin-left: 10px;">
            <div class="hitokoto">
              <div class="left">
                <p>心不动，则不痛；爱不离，则不弃。</p>
                <p>——作者</p>
              </div>
              <div class="right">
                <img :src="lg02">
              </div>
            </div>
            <div class="bottom">
              <span>
                今天你学习了吗？没用的话，快滚去学习去。你也可以看看上面⬆️的话，可能会对你有帮助。
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 热力图 -->
      <el-row>
        <el-card style="height: 200px; width: 100%; margin-bottom: 15px;">
          <HeatMap style="margin: -20px;" :size="8" />
        </el-card>
      </el-row>
      <el-row>
        <el-card style="height: 475px; width: 100%;">
          <el-tabs v-model="activeName" type="card">
            <!-- 所做题目 -->
            <el-tab-pane name="1">
              <template #label>
                <span class="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4zm5.718 9.304a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 14.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 15a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 16h2l.117-.007A1 1 0 0017 15zm-5.282-7.696a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 8.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 9a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 10h2l.117-.007A1 1 0 0017 9z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>所做题目</span>
                </span>
              </template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" />
                <el-table-column prop="title" label="题目名称" />
                <el-table-column prop="difficulty" label="难度" />
                <el-table-column prop="progress" label="进度" />
                <el-table-column prop="status" label="完成情况">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === '已完成' ? 'success' : 'info'">
                      {{ scope.row.status }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="解题时间" />
                <el-table-column prop="language" label="使用语言" />
              </el-table>
              <el-pagination class="fr mt" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
                :size="size" :disabled="disabled" layout="total, prev, pager, next, jumper" :total="1000"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-tab-pane>
            <!-- 题单 -->
            <el-tab-pane name="2">
              <template #label>
                <span class="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4zm5.718 9.304a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 14.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 15a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 16h2l.117-.007A1 1 0 0017 15zm-5.282-7.696a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 8.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 9a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 10h2l.117-.007A1 1 0 0017 9z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>竞赛</span>
                </span>
              </template>
              <div class="sheet">
                <div class="sheet-item">
                  <span>1. 绿桥杯软件和信息技术专业人才大赛</span>
                  <span class="sheet-item__action">查看详细</span>
                </div>
                <div class="sheet-item">
                  <span>2. 小学生创新创业训练计划项目</span>
                  <span class="sheet-item__action">查看详细</span>
                </div>
              </div>
            </el-tab-pane>
            <!-- 题解 -->
            <el-tab-pane name="3">
              <template #label>
                <span class="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4z"
                      clip-rule="evenodd"></path>
                    <path fill-rule="evenodd"
                      d="M10.763 12.827l-1.06-1.06a1 1 0 00-1.415 1.414l1.415 1.414a1.5 1.5 0 002.12 0l3.889-3.888a1 1 0 00-1.415-1.414l-3.534 3.534z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>题解</span>
                </span>
              </template>
              <el-empty :image-size="200" />
            </el-tab-pane>
            <!-- 讨论 -->
            <el-tab-pane name="4">
              <template #label>
                <span class="title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span>讨论</span>
                </span>
              </template>
              <el-empty :image-size="200" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>


<style lang="less" scoped>
.el-card {
  border-radius: 15px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 0px 1px 0px #0000001a,
    0px 0.5px 5px 0px #0000001a;
}

.user-avatar {
  margin-left: 20px;

  p {
    &:first-child {
      color: #262626;
      font-size: 20px;
      font-weight: 500;
    }

    &:nth-child(2) {
      color: #3c3c4399;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 400;
    }

    &:nth-child(3) {
      color: #262626bf;
      font-size: 14px;
    }
  }
}

.user-concern {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 14px;

  div {
    width: 33.3%;
    text-align: center;

    &:first-child,
    &:nth-child(2) {
      border-right: 1px solid #e6e6e6;
    }

    p {
      &:first-child {
        margin-bottom: 5px;
        color: #262626bf;
      }

      &:nth-child(2) {
        color: #262626;
      }
    }
  }
}

.user-info {
  margin-bottom: 20px;

  .title {
    span {
      margin-bottom: 10px;
      color: #262626;
      font-size: 16px;
      font-weight: bolder;
    }

    p {
      margin: 16px 0;
      color: #262626bf;
      font-size: 14px;
    }
  }

  .info {
    p {
      margin-bottom: 10px;
      color: #262626bf;
      font-size: 14px;

      svg,
      span {
        margin-right: 10px;
      }

      svg {
        color: #000;
      }
    }
  }
}

.user-tag {
  .title {
    margin-bottom: 15px;

    span {
      color: #262626;
      font-size: 16px;
      font-weight: bolder;
    }
  }

  .tag {
    .el-tag {
      margin-right: 10px;
      margin-bottom: 5px;
    }
  }
}

.user-accomplishment {
  .title {
    margin-bottom: 15px;

    span {
      color: #262626;
      font-size: 16px;
      font-weight: bolder;
    }
  }

  .accomplishment {

    >div {
      display: flex;
      justify-content: start;
      margin-bottom: 12px;

      >div {
        margin-left: 10px;
        margin-top: -3px;

        svg {
          font-size: 18px;
        }

        p {
          &:first-child {
            margin-bottom: 5px;
            color: #262626bf;
            font-size: 14px;
          }

          &:nth-child(2) {
            color: #3c3c4399;
            font-size: 12px;
          }
        }
      }

    }
  }
}

.hitokoto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .left {
    p {
      line-height: 25px;

      &:first-child {
        color: #262626;
        font-size: 16px;
      }

      &:nth-child(2) {
        margin-right: 10px;
        text-align: right;
        font-size: 16px;
      }
    }
  }

  .right {
    margin-left: 20px;

    img {
      width: 80px;
      height: 80px;
    }
  }
}

.bottom {
  margin-top: 10px;
  padding: 0 10px;
  color: #262626bf;
  font-size: 14px
}

:deep(.el-tabs__header) {
  border-bottom: none;
  transition: border-color 0.3s ease;

  .el-tabs__nav {
    border: none;
    gap: 8px; // 使用gap控制间距
    margin-bottom: -1px; // 对齐底部边框

    .title {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        font-size: 25px;
      }

      span {
        margin-left: 5px;
      }
    }

    .el-tabs__item {
      position: relative;
      padding: 15px 20px;
      margin-right: 10px;
      border: none !important;
      font-size: 16px;
      color: #64748b; // 现代中性色
      border-radius: 8px; // 更柔和的圆角
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      // 悬停状态
      &:hover {
        color: #3b82f6; // 品牌蓝色
        background: rgba(59, 130, 246, 0.05);
        transform: translateY(-2px);
      }

      // 激活状态
      &.is-active {
        color: #3b82f6;
        background: rgba(59, 130, 246, 0.1);

        // 底部指示条
        &::after {
          content: '';
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: -1px;
          height: 2px;
          background: #3b82f6;
          border-radius: 2px;
        }
      }
    }
  }
}

.sheet {
  &-item {
    width: 90%;
    height: 64px;
    margin: 12px 0;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(246, 247, 249, 0.8);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    border: 1px solid transparent;

    // 悬停效果
    &:hover {
      background-color: #f8f9fa;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      .sheet-item__action {
        color: #1677ff;
        margin-right: -4px; // 箭头动效
      }
    }

    // 操作区域
    &__action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #8a8f99;
      font-size: 13px;
      transition: all 0.2s ease;

      // 箭头图标
      &::after {
        content: '→';
        font-weight: 600;
        transition: margin 0.2s ease;
      }
    }
  }
}
</style>
