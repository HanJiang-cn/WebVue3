<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
function add() {
  console.log('添加到计划表中')
}
import { Medal } from '@element-plus/icons-vue'

const rankList = ref([
  { rank: 1, name: '代码大师', score: 1500 },
  { rank: 2, name: '算法忍者', score: 1450 },
  { rank: 3, name: 'Bug终结者', score: 1400 },
  { rank: 4, name: '小白选手', score: 1200 },
  { rank: 5, name: 'Vue爱好者', score: 1150 },
  { rank: 6, name: 'React选手', score: 1100 },
  { rank: 7, name: '全栈新人', score: 1050 },
])
const schedules = ref([
  { id: 1, date: '2025-04-01', title: '春季编程挑战赛', time: '19:00-21:00', status: '已结束' },
  { id: 2, date: '2025-04-08', title: '算法周赛', time: '20:00-22:00', status: '报名中' },
  { id: 3, date: '2025-04-15', title: '全栈开发大赛', time: '18:30-20:30', status: '即将开始' },
  { id: 4, date: '2025-04-22', title: '人工智能挑战赛', time: '19:30-21:30', status: '未开放' },
  { id: 5, date: '2025-04-29', title: '网络安全竞赛', time: '20:00-22:00', status: '未开放' }
])
</script>


<template>
  <div class="card">
    <div class="coming">
      <div class="intro">欢迎参加这场1小时30分钟的比赛</div>
      <div class="title">第xxx场xx周比赛</div>
      <div class="time">中国时间:2025年4月11日&nbsp;1:00~2:30</div>
      <div class="add"><el-icon>
          <List />
        </el-icon><span @click="add"><a href="#">添加到计划表中</a></span></div>
      <div class="start">
        <el-countdown format="DD [天] HH:mm:ss" :value="value2" :value-style="'color:white'">
          <template #title>
            <div style="display: inline-flex; align-items: center;color: white;">
              <el-icon style="margin-right: 4px" :size="12">
                <Calendar />
              </el-icon>
              距离开始还有:
            </div>
          </template>
        </el-countdown>
      </div>
    </div>
  </div>
  <div class="card_tow">
    <div class="coming">
      <div class="title">第xxx场xx周比赛</div>
      <div class="time">中国时间:2025年4月11日&nbsp;1:00~2:30</div>
      <div class="add"><el-icon>
          <List />
        </el-icon><span @click="add"><a href="#">添加到计划表中</a></span></div>
      <div class="start">
        <el-countdown format="DD [天] HH:mm:ss" :value="value2" :value-style="'color:white'">
          <template #title>
            <div style="display: inline-flex; align-items: center;color: white;">
              <el-icon style="margin-right: 4px" :size="12">
                <Calendar />
              </el-icon>
              距离开始还有:
            </div>
          </template>
        </el-countdown>
      </div>
    </div>
  </div>
  <div class="rank">
    <div class="rank-header">实时排行榜</div>
    <div class="rank-list">
      <div v-for="(item, index) in rankList" :key="index" class="rank-item" :class="{ 'top-three': item.rank <= 3 }">
        <div class="rank-number">
          <el-icon v-if="item.rank === 1">
            <Medal color="#FFD700" />
          </el-icon>
          <el-icon v-else-if="item.rank === 2">
            <Medal color="#C0C0C0" />
          </el-icon>
          <el-icon v-else-if="item.rank === 3">
            <Medal color="#CD7F32" />
          </el-icon>
          <span v-else>{{ item.rank }}</span>
        </div>
        <div class="rank-name">{{ item.name }}</div>
        <div class="rank-score">{{ item.score }} </div>
      </div>
    </div>
  </div>
  <div class="contest">
    <div class="rank-header">竞赛时间表</div>
    <div class="schedule-list">
      <div v-for="item in schedules" :key="item.id" class="schedule-item" :class="{
        'ended': item.status === '已结束',
        'active': item.status === '报名中'
      }">
        <div class="schedule-date">
          <div class="date-day">{{ dayjs(item.date).format('DD') }}</div>
          <div class="date-month">{{ dayjs(item.date).format('MMM') }}</div>
        </div>
        <div class="schedule-info">
          <div class="schedule-title">{{ item.title }}</div>
          <div class="schedule-time">
            <el-icon>
              <Clock />
            </el-icon>
            <span>{{ item.time }}</span>
          </div>
        </div>
        <div class="schedule-status">
          <el-tag :type="{
            '已结束': 'info',
            '报名中': 'primary',
            '即将开始': 'warning',
            '未开放': 'danger'
          }[item.status]" effect="dark" size="small">
            {{ item.status }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 430px;
  height: 270px;
  position: relative;
  margin-top: -60px;
  margin-left: 130px;
  border-radius: 20px;
  float: left;
  background-color: rgb(0, 179, 255);
  cursor: pointer;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  transition: .4s all;
  background-image: url(/src/assets/card1.jpg);

  .coming {
    width: 495px;
    height: 240px;

    margin-top: 15px;
    margin-left: 15px;
    text-align: left;

    .intro {
      width: 455px;
      height: 18px;
      padding-top: 10px;
      color: white;
    }

    .title {
      width: 455px;
      height: 40px;
      padding-top: 10px;
      color: white;
      font-size: 25px;
      font-weight: 500;
    }

    .time {
      width: 455px;
      height: 21px;
      padding-top: 10px;
      color: white
    }

    .add {
      width: 455px;
      height: 21px;
      padding-top: 10px;
      color: white;
      font-size: 18px;

      span {
        padding-left: 10px;

        a {
          color: white;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }

    .start {
      width: 248.42px;
      height: 21px;
      margin-top: 40px;
      color: white;
      font-size: 12px;
    }

  }
}

.card_tow {
  cursor: pointer;
  width: 430px;
  height: 270px;
  position: relative;
  margin-top: -60px;
  margin-right: 110px;
  float: right;
  border-radius: 20px;
  background-color: rgb(0, 179, 255);
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  background-image: url(/src/assets/card3.jpg);

  .coming {
    width: 345px;
    height: 240px;

    margin-top: 15px;
    margin-left: 15px;
    text-align: left;

    .title {
      width: 455px;
      height: 40px;
      padding-top: 10px;
      color: white;
      font-size: 25px;
      font-weight: 500;
    }

    .time {
      width: 455px;
      height: 21px;
      padding-top: 10px;
      color: white
    }

    .add {
      width: 455px;
      height: 21px;
      padding-top: 10px;
      color: white;
      font-size: 18px;

      span {
        padding-left: 10px;

        a {
          color: white;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      }
    }

    .start {
      width: 248.42px;
      height: 21px;
      margin-top: 66px;
      color: white;
      font-size: 12px;
    }
  }
}

.rank {
  width: 380px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 20px auto;
  float: left;
  position: relative;
  left: 130px;
  top: 10px;

  &-header {
    font-size: 22px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: "";
      width: 4px;
      height: 24px;
      background: #409eff;
      border-radius: 2px;
    }
  }

  &-list {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 8px;

    /* 美化滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    padding: 14px 20px;
    margin: 8px 0;
    border-radius: 12px;
    background: #f8faff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background: #ecf5ff;
      transform: translateX(8px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &.top-three {
      background: linear-gradient(135deg,
          rgba(64, 158, 255, 0.15) 0%,
          rgba(255, 255, 255, 1) 80%);
    }
  }

  &-number {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #606266;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    .el-icon {
      font-size: 24px;
    }
  }

  &-name {
    flex: 1;
    margin: 0 20px;
    font-size: 15px;
    color: #303133;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  &-score {
    width: 80px;
    text-align: right;
    color: #67c23a;
    font-weight: 600;
    font-size: 15px;

    &::after {
      content: "分";
      font-size: 12px;
      color: #909399;
      margin-left: 2px;
    }
  }
}

.contest {
  width: 380px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 25px;
  float: left;
  position: relative;
  left: 200px;
  top: 10px;
  margin-top: 20px;

  .schedule-list {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 8px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
  }

  .schedule-item {
    display: flex;
    align-items: center;
    padding: 16px;
    margin: 12px 0;
    background: #f8f9fa;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    &.active {
      border-left: 4px solid #67c23a;
    }

    &.ended {
      opacity: 0.6;

      .schedule-status {
        filter: grayscale(1);
      }
    }
  }

  .schedule-date {
    width: 60px;
    text-align: center;
    padding-right: 16px;
    border-right: 1px solid #ebeef5;

    .date-day {
      font-size: 24px;
      font-weight: 700;
      color: #409eff;
      line-height: 1.2;
    }

    .date-month {
      font-size: 12px;
      color: #909399;
      text-transform: uppercase;
    }
  }

  .schedule-info {
    flex: 1;
    padding: 0 20px;

    .schedule-title {
      font-size: 15px;
      font-weight: 500;
      color: #303133;
      margin-bottom: 6px;
    }

    .schedule-time {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #606266;

      .el-icon {
        margin-right: 6px;
        font-size: 14px;
      }
    }
  }

  .schedule-status {
    width: 80px;
    text-align: center;
  }
}
</style>
