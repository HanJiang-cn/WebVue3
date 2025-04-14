<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getCompetitionUserListApi } from '@/api/competition'
import { usePagination } from '@/hooks/usePagination'
import moment from 'moment'
const loading = ref(false)
const statusMap = {
  1: { text: '正在报名', class: 'status-ongoing' },
  2: { text: '进行中', class: 'status-processing' },
  3: { text: '已结束', class: 'status-ended' }
}
const checkList = ref([
  {
    title: '队伍信息',
    content: '队伍信息展示'
  },
  {
    title: '队伍成员',
    content: '队伍成员展示'
  },
  {
    title: '比赛项目',
    content: '比赛项目展示'
  }
])
const cities = ref([
  {
    value: 'beijing',
    label: '全部'
  },
  {
    value: 'shanghai',
    label: '上海'
  },
  {
    value: 'guangzhou',
    label: '广州'
  },
  {
    value: 'shenzhen',
    label: '深圳'
  },
  {
    value: 'hangzhou',
    label: '杭州'
  }
])
const checkGroup = ref([''])
const checkboxGroup1 = ref('beijing')
// 查询条件
const searchParams = ref({
  title: '',
  id: '',
  status: 0,
  tags: []
})
// 获取竞赛列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await getCompetitionUserListApi({
    ...pageInfo,
    searchText: searchParams.value.name, // 原userName改为searchText
    id: searchParams.value.id,
    status: searchParams.value.status,
    id: '',
    name: '',
    content: '',
    organizer: '',
    startTime: '',
    endTime: '',
    type: '',
    notId: 0,
    sortField: '',
    sortOrder: '',
    userId: 0
  })
  loading.value = false
  dataList.value = records
  dataList.value = records.map(item => ({
      ...item,
      // 计算剩余天数
      remainingDays: calcRemainingDays(item),
      // 计算状态
      status: calcStatus(item)
    }))
    setTotals(Number(total))
  dataList.value = records.map((records) => ({
    ...records,
  }))
}
// 状态计算方法
const calcStatus = (item) => {
  const now = moment()
  if (now.isBefore(moment(item.startTime))) return 1 // 未开始
  if (now.isBetween(moment(item.startTime), moment(item.endTime))) return 2 // 进行中
  return 3 // 已结束
}

// 剩余天数计算
const calcRemainingDays = (item) => {
  const now = moment()
  const targetDate = item.status === 1 ? item.startTime : item.endTime
  return Math.max(0, moment(targetDate).diff(now, 'days'))
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

</script>
<template>
  <div>
    <el-backtop :right="70" :bottom="100" />
    <div class="block text-center">
      <el-carousel height="400px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="background">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <div class="right">
        <div class="box">
          <div class="wrap">
            <div class="example-pagination-block">
              <div class="example-demonstration">
                <div class="item" v-for="item in dataList" :key="item.id">

                  <div> <a class="link" href="/competition/detail"><img
                        src="https://publicqn.saikr.com/2024/12/31/contest677394887c30d1.918105771735627946742.png"
                        alt="" style="height: 100%;"></a>
                    <div class="detial"><a href="/competition/detail"><span class="hoticon"> TOP&nbsp;1</span>
                        {{item.name}}</a>
                      <p class="plan"><span>主办方： </span>{{item.organizer}}</p>
                      <p class="plan"><span>竞赛级别：</span> {{item.type}}</p>
                      <p class="plan"><span>报名时间：</span>{{ moment(item.startTime).format('YYYY-MM-DD HH:mm') }}</p>
                      <p class="plan"><span>比赛时间：</span>{{ moment(item.endTime).format('YYYY-MM-DD HH:mm') }}</p>
                    </div>
                  </div>
                  <div class="including">
                <div class="include" v-if="item.status !== 3">
                  距离{{ item.status === 1 ? '报名截止' : '比赛结束' }}还有
                  <span class="day">{{ item.remainingDays }}</span> 天
                </div>
                  </div>
                </div>

              </div>
              <div class="page">
                <div class="fr mt mb">
                  <el-pagination v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
                    :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals"
                    background @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="left">
        <div class="section">
          <div class="search-box" >
  <el-select v-model="searchParams.status" placeholder="状态" style="margin-bottom: 15px;" >
    <el-option label="全部" :value="0"/>
    <el-option label="进行中" :value="1"/>
    <el-option label="已结束" :value="2"/>
  </el-select>
      <el-input
        v-model="searchParams.title"
        placeholder="搜索竞赛名称"
        clearable
        @keyup.enter="loadData"
        style="margin-bottom: 15px;"
      >
        <template #append>
          <el-button @click="loadData">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
    </div>
          <a href="#">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAAAAXNSR0IArs4c6QAAA85JREFUWEetl11oHFUYht83220i6KYWf5Gi1oASK3bO2dCW0HQtVUQMaCUBfxC1ghcKVSuCXi31ooh/FfRCRVFqQbGCN4KaarYgxrieM8GQ9EaKxnqhvVDbYlI3O589yzbuz2zmTPDc7MW87/s9e2bON98QKZZovRtRtBa9vftYKi2ksHpL6a0EIEo9DeB5kFOIojsYhj+n8fto0wLtB7C7HvwTstmtnJw87lPIV5MWqARgW0P4NMjNNOZv34JJOm8g0boXIicAZJtCyVdpzONJhXyv+wMp9SiA12KCq8hkbmS5PCNKjSKbPcLJyd98AVp1XkAyMpLBsWMzELm2Q6EPaO3dks/fhijaC3JopbcxFkiKxS4Wi9G54hIED4F8e5l/vYhMZh0WF68HeRjAu7T2wZXsUjyQUo/Q2jdcoGzcuAZdXUcBXJZQ4Mn69Zdrv+SdNOaTtFBtQNLX141c7jgWFq7m7OxpCYK3QD7sEVwGcPHZ3bmqrp1Dd/d1nJiY9/AuSdqBtL4HIgcRRYNYtepyRNGhNIEtJ/ApGvNSGn87kFLfA9AAXFd+BsCFLYE/AujzLPILcrn1LJUWPfVoApKBgR2oVsfq5n8ArI4JegXAFwDeBLAusZDIDobhl4m6uqAZSOtxiBSWNZNjNOYW2bTpUlQq7qHdnFBsP619IjWQaK0gYjoY3W65Ln0FgKO0tr92AguFHpw8+TmAoY4Fya9pzNaVAL0IkT0djHMAhgGUQc7SmGCpR23ZshZnznwDoFPTnKO1V6YHUsod23wH40e0dlSUesdtDK3d1air7S7wHUQyMf4TtPaSlQD9AWBNrFHkZobhYcnnd4H8geWyg29aotQBAPe1+ckZGrMhPZDW8xDpiTF+Smtvrz0zWvfSmL/iwiUItoF040nzIg/RmJH0QEq5Qcs9tE13AyIbGIazSYHS378aPT2nY8aTB2jMe0n+c9eXjr0o9SGA0RbjOK3d7hsmSrmTeFGD/nfkctewVHKgXus/IK1vgshXLa4XaK3r2IlLtM5CxBVubKaP0drXE80NgubGqNT7AO5tuH6A1t7vEyhBMATyyJKWHMPw8K2NY4xPTjNQoXA+Tp36DCKDdfOvyOX6fD55RKmPAeys+cgQ1ep2Tk396QPRqGl/uQ4OXoD5+YP1RgiI7GMYPrtcsCjlQByQW+OoVO7i9LRrI6lX/IAGEFrvgcjes99h54HsOEaI1jdA5FuQ3RBx32xFGlNJTVI3LDtTy8DAekTRcxCZoLVxA77rTe4d6B58dwA6vQu9+byGfO+0/0H4L8U/Vyw4wrImAAAAAElFTkSuQmCC"
              alt="" style="height: 14px;">
            热门竞赛top50
          </a>
          <div class="short-name">
            竞赛类别
          </div>
          <div class="item-title">工科</div>
          <div class="item-content">
            <el-checkbox-group v-model="checkGroup">
              <el-checkbox v-for="item in checkList" :key="item" :label="item.title" :value="item.content" />
            </el-checkbox-group>
          </div>
          <div class="item-title">工科</div>
          <div class="item-content">
            <el-checkbox-group v-model="checkGroup">
              <el-checkbox v-for="item in checkList" :key="item" :label="item.title" :value="item.content" />
            </el-checkbox-group>
          </div>
          <div class="item-title">竞赛级别</div>
          <div class="item-group" style="margin-top: 15px;">
            <el-radio-group v-model="checkboxGroup1">
              <el-radio-button v-for="city in cities" :key="city" :value="city.value">
                {{ city.label }}
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(https://publicqn.saikr.com/e7deb4a855005b2f2788b4d5c95b9de41737790598003.png);
}

.main {
  display: flex;
  justify-content: center;
  height: 100%;
  margin: 0 auto;
  margin-top: 40px;

  .left {
    float: left;
    width: 310px;
    margin-left: 18px;

    .section {
      border-radius: 4px;
      border: 1px solid #ecedf3;
      box-sizing: border-box;
      background: #fff;
      padding: 20px;

      a {
        min-width: 108px;
        margin-top: 0;
        background: #ffe6e6;
        color: #ff3232;
        text-decoration: none;
        display: inline-flex;
        height: 28px;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 4px;
        font-size: 14px;
        padding: 0 10px;
      }

      .short-name {
        color: #333;
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
        margin-top: 30px;
      }

      .item-title {
        color: #333;
        font-weight: 600;
        font-size: 14px;
        margin-top: 20px;
      }

      .item-content {
        .el-checkbox {
          margin-right: 30px;
          width: 104px;
        }

      }

      // 2号按钮组
      .item-group {
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
    }
  }

  .right {
    float: left;
    width: 900px;
    height: 100%;

    .box {
      width: 100%;
      height: 100%;
      background: #fff;

      .wrap {
        border-radius: 4px;
        border: 1px solid #ecedf3;
        box-sizing: border-box;
        background: #fff;
        padding: 0 20px 20px;
        max-width: calc(92vw - 334px);
        min-width: 680px;
        min-height: 200px;

        .item {
          display: flex;
          flex-direction: row;
          align-items: top;
          justify-content: space-between;
          position: relative;
          padding: 20px 0;
          border-top: 1px solid #ecedf3;

          .link {
            width: 231px;
            border-radius: 6px;
            overflow: hidden;
            height: 154px;
            margin-right: 16px;
            float: left;
          }

          .detial {
            float: left;
            position: relative;
            max-width: 450px;

            a {
              color: #333;
              height: 52px;
              display: flex;
              font-size: 20px;
              line-height: 26px;
              font-weight: 700;
              overflow: hidden;
              cursor: pointer;
              margin-bottom: 6px;
              text-decoration: none;
              align-items: top;
              justify-content: flex-start;
              flex: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              max-height: 52px;
              white-space: normal;
              word-break: break-word;

              &:hover {
                color: #22bfa7;
              }

              .hoticon {
                font-family: Helvetica-Bold;
                font-weight: 700;
                margin-right: 8px;
                margin-top: 4px;
                border-radius: 2px 4px;
                background: linear-gradient(135deg, #ff6161, #e71313);
                width: 50px;
                height: 18px;
                font-size: 12px;
                display: inline-flex;
                color: #fff8f5;
                align-items: center;
                justify-content: center;
                position: relative;
              }
            }

            .plan {
              font-size: 14px;
              line-height: 23px;
              color: #999;

              span {
                display: inline-block;
                width: 70px;
              }
            }
          }

          .including {
            float: right;

            span {
              color: #03b349;
            }

            .include {
              font-size: 12px;
              color: #999;
              margin-top: 3px;

              .day {
                font-size: 14px;
                color: #22bfa7;
                font-weight: 700;
                padding: 0 3px;
              }
            }
          }
        }
      }

      .page {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ecedf3;

        .el-pagination {
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
