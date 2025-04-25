<!-- eslint-disable vue/block-lang -->
<script setup>
import QuestionIndexCard from '@/components/QuestionMain/QuestionIndexCard.vue'
import QuestionIndexBackground from '@/components/QuestionMain/QuestionIndexBackground.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const radio1 = ref('1')
const tableData = ref([
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '中等',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '困难',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  },
  {
    status: '',
    title: '求和',
    key: '123',
    pass: '56%',
    time: '1h',
    difficulty: '简单',
  }
])
const attrs = ref([
  {
    // key: 'today',
    dot: true,
    dates: [
      new Date(),
      new Date(2025, 2, 17)
    ],
  },
])
const handleHistory= () => {
    window.open(router.resolve({
      path: '/question/history',
    }).href, '_blank')
}
</script>

<template>
  <el-row style="width: 100%; margin-bottom: 100px;" :gutter="20">
    <QuestionIndexBackground></QuestionIndexBackground>
    <el-col :span="18">
      <el-row class="study">
        <div class="recommmend"></div>
        <div class="nav-title">
          <span class="left-title">学习计划</span>
          <span class="right-a">
            <span @click="handleHistory">查看更多</span>
          </span>
        </div>

        <div class="tap">
          <div class="block text-center">
            <el-carousel height="180px" motion-blur indicator-position="none">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="card">
                  <QuestionIndexCard v-for="item in 2" :key="item" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-row>
      <el-row>
        <div style="width: 100%; text-align: left;">
          <el-radio-group v-model="radio1" size="large">
            <el-radio-button value="1">
              <el-icon :size="17">
                <TakeawayBox />
              </el-icon>
              <span>全部题目</span>
            </el-radio-button>
            <el-radio-button value="2">
              <el-icon :size="17">
                <PullRequestOutlined />
              </el-icon>
              <span>算法</span>
            </el-radio-button>
            <el-radio-button value="3">
              <el-icon :size="17">
                <ConsoleSqlOutlined />
              </el-icon>
              <span>数据库</span>
            </el-radio-button>
            <el-radio-button value="4">
              <el-icon :size="17">
                <TableOutlined />
              </el-icon>
              <span>Shell</span>
            </el-radio-button>
            <el-radio-button value="5">
              <el-icon :size="17">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"
                  class="text-purple dark:text-dark-purple mr-2 hidden h-[18px] w-[18px] lg:block">
                  <path fill-rule="evenodd"
                    d="M16.664 3.48C16.02 2.905 15 3.363 15 4.226v3.546c0 .863 1.02 1.32 1.664.748l1.995-1.774a1 1 0 000-1.494l-1.995-1.774zM4 9a4 4 0 014-4h5a1 1 0 110 2H8a2 2 0 100 4h8a4 4 0 110 8h-6a1 1 0 010-2h6a2 2 0 000-4H8a4 4 0 01-4-4zm4 10.773v-3.546c0-.863-1.02-1.32-1.664-.748L4.34 17.253a1 1 0 000 1.494l1.995 1.773c.645.574 1.664.116 1.664-.747z"
                    clip-rule="evenodd"></path>
                </svg>
              </el-icon>
              <span>多线程</span>
            </el-radio-button>
            <el-radio-button value="6">
              <el-icon :size="17">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" fill="currentColor"
                  class="mr-2 hidden h-[18px] w-[18px] lg:block text-teal dark:text-dark-teal">
                  <mask id="javascript_svg__a" width="16" height="18" x="0.8" y="0.081" maskUnits="userSpaceOnUse">
                    <path d="M.8.081h16v18H.8z"></path>
                    <path
                      d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z">
                    </path>
                  </mask>
                  <path
                    d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z">
                  </path>
                  <path stroke-width="0.48"
                    d="M11.221 11.254a3.236 3.236 0 01-1.735-.314 1.135 1.135 0 01-.425-.798.175.175 0 00-.18-.174 37.413 37.413 0 00-.753 0 .167.167 0 00-.183.147 1.843 1.843 0 00.597 1.456 3.175 3.175 0 001.767.663c.67.078 1.349.049 2.01-.085a2.484 2.484 0 001.332-.714c.402-.494.521-1.16.313-1.762a1.481 1.481 0 00-.975-.864c-1.016-.356-2.114-.328-3.15-.598-.18-.055-.4-.117-.48-.306a.673.673 0 01.225-.755 2.037 2.037 0 011.071-.265 3.248 3.248 0 011.494.213c.288.169.488.456.545.783a.192.192 0 00.181.186c.25.006.498.002.749.002a.18.18 0 00.195-.132 1.92 1.92 0 00-.942-1.664 4.685 4.685 0 00-2.553-.388 2.788 2.788 0 00-1.726.69 1.712 1.712 0 00-.344 1.786 1.529 1.529 0 00.966.84c1.014.363 2.124.246 3.145.569.2.067.432.17.493.39a.782.782 0 01-.214.748 2.366 2.366 0 01-1.423.346zm4.361-6.669a6909.08 6909.08 0 00-5.934-3.336 1.336 1.336 0 00-1.298 0L2.438 4.572a1.217 1.217 0 00-.638 1.06v6.692a1.226 1.226 0 00.663 1.07c.566.306 1.116.645 1.693.931a2.441 2.441 0 002.172.06 1.678 1.678 0 00.79-1.518c.003-2.208 0-4.417.001-6.625a.173.173 0 00-.164-.201 31.753 31.753 0 00-.756 0 .167.167 0 00-.182.168c-.003 2.194.002 4.39 0 6.585 0 .31-.193.588-.485.697a1.22 1.22 0 01-.984-.132l-1.572-.884a.187.187 0 01-.107-.186V5.667a.204.204 0 01.124-.205l5.891-3.306a.204.204 0 01.232 0l5.892 3.305a.207.207 0 01.123.205v6.624a.191.191 0 01-.106.188c-1.934 1.089-3.87 2.176-5.805 3.262-.092.05-.202.133-.31.07-.508-.285-1.007-.582-1.513-.87a.163.163 0 00-.183-.012c-.222.13-.456.24-.7.326-.109.044-.244.057-.32.158.096.104.213.187.344.245l1.773 1.02a1.298 1.298 0 001.314.036c1.97-1.105 3.941-2.211 5.912-3.319a1.229 1.229 0 00.663-1.07V5.631a1.216 1.216 0 00-.618-1.046z"
                    mask="url(#javascript_svg__a)"></path>
                </svg>
              </el-icon>
              <span>JavaScirpt</span>
            </el-radio-button>
            <el-radio-button value="7">
              <el-icon :size="17">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"
                  class="mr-2 hidden h-[18px] w-[18px] lg:block text-[#140854] dark:text-[#5b40ec]">
                  <path fill-rule="evenodd"
                    d="M5.282 22.051a1 1 0 01-1-1V8.658a1 1 0 012 0V21.05a1 1 0 01-1 1zm5.575-9.229v3.908a1 1 0 01-2 0v-3.908a1 1 0 112 0zm-1-1.879a1 1 0 01-1-1v-.507a1 1 0 112 0v.507a1 1 0 01-1 1zm0-3.286a1 1 0 01-1-1V2.949a1 1 0 012 0v3.708a1 1 0 01-1 1zm4.307 12.902a1 1 0 01-1-1V15.65a1 1 0 112 0v3.908a1 1 0 01-1 1zm0-6.787a1 1 0 01-1-1v-.507a1 1 0 112 0v.507a1 1 0 01-1 1zm0-3.287a1 1 0 01-1-1V5.777a1 1 0 112 0v3.708a1 1 0 01-1 1zm4.554 5.144a1 1 0 01-1-1V2.949a1 1 0 112 0v11.68a1 1 0 01-1 1z"
                    clip-rule="evenodd"></path>
                </svg>
              </el-icon>
              <span>pandas</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-row>
      <el-row style="margin: 10px 0;">
        <el-select v-model="value" placeholder="题单" style="width: 150px" popper-class="select-dow">
          <el-option :value="1">
            <el-text truncated>字符串练习</el-text>
          </el-option>
          <el-option :value="2">
            <el-text truncated>数组练习</el-text>
          </el-option>
          <el-option :value="3">
            <el-text truncated>程序员面试金典（第 6 版）</el-text>
          </el-option>
          <el-option :value="4">
            <el-text truncated>🔥 LeetCode 热题 HOT 100</el-text>
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="难度" style="width: 150px" popper-class="select-dow">
          <el-option :value="1">
            <el-text type="success">简单</el-text>
          </el-option>
          <el-option :value="2">
            <el-text type="warning">中等</el-text>
          </el-option>
          <el-option :value="3">
            <el-text type="danger">困难</el-text>
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="状态" style="width: 150px" popper-class="select-dow">
          <el-option :value="1">
            <el-text truncated>➖未开始</el-text>
          </el-option>
          <el-option :value="2">
            <el-text truncated>✔️已解答</el-text>
          </el-option>
          <el-option :value="3">
            <el-text truncated>🔥尝试过</el-text>
          </el-option>
        </el-select>
        <el-input v-model="input2" style="width: 240px" placeholder="搜索题目、编号或内容" suffix-icon="Search" />
        <el-button type="primary" style="margin-left: 10px; width: 100px;">搜索</el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%; margin-top: 5px; ">
          <el-table-column prop="status" label="状态" />
          <el-table-column sortable prop="title" label="题目" />
          <el-table-column sortable prop="key" label="题解" />
          <el-table-column sortable prop="pass" label="通过率" />
          <el-table-column sortable prop="difficulty" label="难度">
            <template #default="scope">
              <el-tag
                :type="scope.row.difficulty === '简单' ? 'success' : scope.row.difficulty === '中等' ? 'warning' : 'danger'">
                {{ scope.row.difficulty }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable prop="time" label="平均解题时间" />
        </el-table>
        <el-pagination class="mt fr" v-model:current-page="currentPage4" v-model:page-size="pageSize4" :size="size"
          :disabled="disabled" :background="background" layout="prev, pager, next, jumper, sizes, total" :total="400"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row>
        <el-card class="practice-history" style="width: 100%;">
          <div id="title">
            <p>练习历史</p>
          </div>
          <div id="content">
            <a href="#">
              <span id="name">算法</span>
              <span id="condition">完成</span>
            </a>
          </div>
          <div id="record">
            <a href="#">
              <el-icon>
                <Clock />
              </el-icon>
              <span @click="handleHistory">查看记录</span>
            </a>
            <a href="#"><el-icon>
                <DocumentDelete />
              </el-icon>
              <span @click="handleHistory">错题练习</span></a>
          </div>
        </el-card>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-card class="calendar" style="width: 100%;">
          <ScheduleOutlined style="margin-left: 10px; font-size: 20px;" />
          <span>每日打卡</span>
          <VCalendar title-position="left" borderless transparent :attributes='attrs' :max-date="new Date()" />
        </el-card>
      </el-row>
      <el-row></el-row>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.study {
  border: 1px solid #eff0f2;
  padding: 20px;

  .nav-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .left-title {
      color: #1a1a1abf;
      font-size: 20px;
    }

    .right-a {
      color: #007aff;
      font-size: 14px;

      span {
        cursor: pointer;
      }
    }
  }
}

.card {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

:deep(.el-radio-group) {
  width: 100%;
  background-color: transparent;
  margin: 20px 0;

  .el-radio-button__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 13px;
    border-radius: 10px;
    border: none;
    background-color: rgba(59, 130, 246, 0.08);
    font-size: 16px;
    padding: 12px 13px;

    .el-icon {
      margin-right: 10px;
    }

    &:hover {
      color: #010000bf !important;
      background-color: rgb(118, 177, 208);
    }
  }

  .is-active {
    .el-radio-button__inner:hover {
      color: #fff !important;
    }
  }

  .el-radio-button {
    --el-radio-button-checked-text-color: #fff !important;
    --el-radio-button-checked-bg-color: rgb(10, 89, 138) !important;
    --el-radio-button-checked-border-color: transparent !important;
  }
}

:deep(.el-select) {
  margin-right: 10px;

  .el-select__wrapper {
    box-shadow: none !important;
    border-radius: 5px !important;
    background: #000a200d !important;

    &:hover {
      background: #000a201a !important;
    }
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none !important;
    border-radius: 5px !important;
    background: #000a200d !important;
  }

  .is-focus {
    box-shadow: none !important;
    background-color: #000a201a !important;
  }
}

.user-avatar {
  // margin-left: 20px;

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

.el-card {
  border-radius: 10px;
  box-shadow: 0px 2px 6px #0000000a,
    0px 4px 8px #00000005,
    0px 6px 12px #00000005;
}

.tap {
  height: 180px;
  width: 100%;

  .el-carousel__item h3 {
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

}

.practice-history {
  #title {
    font-size: 20px;
    height: 38px;
    color: #000;
    overflow: hidden;
  }

  #content {
    align-items: center;

    a {
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      align-items: center;
      margin: 0 -10px;
      padding: 10px 10px;
      border-radius: 5px;

      &:hover {
        background-color: rgba(248, 248, 248);
      }
    }

    #name {
      font-size: 17px;
      color: #555;
      font-weight: 600;
      margin-right: 10px;
    }

    #condition {
      font-size: 17px;
      color: #ff7849;
    }
  }

  #record {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    font-size: 17px;

    a {
      text-decoration: none;
      color: #262626;

      &:hover {
        color: #409EFF;
      }
    }

    .el-icon {
      margin-right: 2px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }
}

.calendar {
  span {
    margin: 5px 3px;
    font-size: 17px;
    color: #262626;
    font-weight: bolder;
  }

  :deep(.vc-pane) {
    min-width: 120px !important;
  }
}
</style>

// 下拉组件
<style lang="less">
.select-dow {
  width: 240px !important;
  border: none !important;

  .el-popper__arrow::before {
    background: transparent !important;
    border: none !important;
  }

  .el-scrollbar {
    .el-select-dropdown__item {
      margin: 0 5px;
      border-radius: 10px;
      // color: #ffa116;
    }

    .el-select-dropdown__item:hover {
      background: #F7F7F8;
    }

    .el-select-dropdown__item:not(.is-disabled):focus,
    .el-select-dropdown__item:not(.is-disabled):hover {
      background: #F7F7F8;
    }
  }
}
</style>
