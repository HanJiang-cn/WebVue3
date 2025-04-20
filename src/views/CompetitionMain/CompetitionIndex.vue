<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getCompetitionUserListApi } from '@/api/competition'
import { usePagination } from '@/hooks/usePagination'
import moment from 'moment'
import { useRouter } from 'vue-router'
const router = useRouter()

const loading = ref(false)
const afootMap = {
  1: { text: '正在报名', class: 'afoot-ongoing' },
  2: { text: '进行中', class: 'afoot-processing' },
  3: { text: '已结束', class: 'afoot-ended' }
}

const searchParams = ref({
  afoot: 0,
  type: null,
})

// 竞赛列表相关
const dataList = ref([])


// 状态计算
const calcafoot = (item) => {
  const now = moment()
  if (now.isBefore(moment(item.startTime))) return 1
  if (now.isBetween(moment(item.startTime), moment(item.endTime))) return 2
  return 3
}

// 剩余天数计算
const calcRemainingDays = (item) => {
  const now = moment()
  const afoot = calcafoot(item)
  const targetDate = afoot === 1 ? item.startTime : item.endTime
  return Math.max(0, moment(targetDate).diff(now, 'days'))
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      ...pageInfo,
      type: searchParams.value.type,
    }

    const { data: { records, total } } = await getCompetitionUserListApi(params)

    dataList.value = records.map(item => ({
      ...item,
      remainingDays: calcRemainingDays(item),
      afoot: calcafoot(item),
      afootInfo: afootMap[calcafoot(item)],
      type: item.type,
    }))
     // 根据筛选条件过滤数据
     dataList.value = dataList.value.filter(item => {
      if (searchParams.value.afoot!== 0 && item.afoot!== searchParams.value.afoot) {
        return false
      }
      if (searchParams.value.type!== null && item.type!== searchParams.value.type) {
        return false
      }
      return true
    })
    setTotals(Number(total))
  } finally {
    loading.value = false
  }
}
const handleDetail = (id) => {
  console.log(id)
  router.push({
    path: '/competition/detail',
    query: { id: id }
  })
}
// 筛选条件变化时重新加载数据
const handleFilterChange = () => {
  pageInfo.current = 1
  loadData()
}

onMounted(loadData)
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
</script>

<template>
  <div class="competition-container">
    <el-backtop :right="70" :bottom="100" />

    <!-- 轮播图 -->
    <el-carousel height="400px" indicator-position="none">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="carousel-image" />
      </el-carousel-item>
    </el-carousel>

    <main class="main-content">
      <!-- 右侧筛选栏 -->
      <section class="content-main">
        <div v-loading="loading" class="competition-list">
          <article
            v-for="item in dataList"
            :key="item.id"
            class="competition-item"
          >
            <div @click="handleDetail(item.id)"

              class="cover-link"
            >
              <img :src="item.cover" alt="竞赛封面">
            </div>
            <div class="competition-info">
              <div @click="handleDetail(item.id)"
                class="title-link"
              >
                <span class="hot-tag" v-if="item.hot">TOP 1</span>
                {{ item.name }}
              </div>

              <div class="meta-info">
                <p><span>主办方：</span>{{ item.organizer }}</p>
                <p><span>级别：</span>{{ item.type===1?'团队赛':'个人赛' }}</p>
                <p><span>报名时间：</span>{{ moment(item.startTime).format('YYYY-MM-DD HH:mm') }}</p>
                <p><span>比赛时间：</span>{{ moment(item.endTime).format('YYYY-MM-DD HH:mm') }}</p>
              </div>
            </div>

            <div class="afoot-info">
              <span :class="['afoot-tag', item.afootInfo.class]">
                {{ item.afootInfo.text }}
              </span>
              <div v-if="item.afoot !== 3" class="countdown">
                距离{{ item.afoot === 1 ? '报名截止' : '比赛结束' }}还有
                <span class="days">{{ item.remainingDays }}</span> 天
              </div>
            </div>
          </article>
        </div>

        <!-- 分页 -->
        <el-pagination
          v-model:current-page="pageInfo.current"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </section>

      <!-- 左侧筛选栏 -->
      <aside class="filter-sidebar">
        <div class="filter-section">
          <div class="filter-group">
            <h3>状态筛选</h3>
            <el-select
              v-model="searchParams.afoot"
              @change="handleFilterChange"
            >
              <el-option label="全部" :value="0" />
              <el-option label="正在报名" :value="1" />
              <el-option label="进行中" :value="2" />
              <el-option label="已结束" :value="3" />
            </el-select>
          </div>

          <div class="filter-group">
            <h3>竞赛类别</h3>
            <el-radio-group v-model="searchParams.type" @change="handleFilterChange">
              <el-radio-button :value="0">个人赛</el-radio-button>
              <el-radio-button :value="1">团队赛</el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style lang="less" scoped>
.competition-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  .carousel-image {
    height: 100%;
    background: url('https://publicqn.saikr.com/e7deb4a855005b2f2788b4d5c95b9de41737790598003.png') center/cover;
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 280px; /* 交换列顺序 */
  gap: 24px;
  margin-top: 40px;
}

.filter-sidebar {
  .filter-section {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);

    .filter-group  {
      margin-bottom: 15px;
      h3{
        margin-bottom: 15px;
      }
        :deep(.el-radio-group) {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          transition: all 0.3s ease;

          .el-radio-button {
            border-radius: 5px;
            border: none;
            color: #333;
            font-size: 14px;

            .el-radio-button__inner {
              border-radius: 5px;
              border: 0;
            }
          }
        }
      }
    .el-radio-group {
      display: grid;
      gap: 8px;
    }
  }
}

.content-main {
  .competition-list {
    display: grid;
    gap: 20px;
  }
}

.competition-item {
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  .cover-link {
    display: block;
    height: 150px;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .competition-info {
    .title-link {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      text-decoration: none;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &:hover {
        color: #22bfa7;
        cursor: pointer;
      }

      .hot-tag {
        background: linear-gradient(135deg, #ff6161, #e71313);
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 8px;
      }
    }

    .meta-info {
      margin-top: 12px;
      color: #666;
      font-size: 14px;

      p {
        margin: 6px 0;
      }

      span {
        color: #999;
        min-width: 70px;
        display: inline-block;
      }
    }
  }

  .afoot-info {
    text-align: right;
    min-width: 140px;

    .afoot-tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;

      &.afoot-ongoing { background: #e8f4ff; color: #1890ff; }
      &.afoot-processing { background: #fff7e6; color: #faad14; }
      &.afoot-ended { background: #fff0f0; color: #ff4d4f; }
    }

    .countdown {
      margin-top: 8px;
      font-size: 12px;
      color: #666;

      .days {
        color: #22bfa7;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}

.el-pagination {
  margin-top: 24px;
  justify-content: center;
}
</style>
