<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
const value2 = ref(dayjs().add(1, 'month').startOf('month'))
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl } = toRefs(state)
function add() {
  console.log('添加到计划表中')
}
const allTableData = ref([
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
  {
    contest: '第439场周赛',
    time: '1小时30分钟',

  },
])
let tableData: { contest: string; time: string; }[] = []
const total = ref(1000)
// 当前页码，初始值为1
const currentPage = ref(1);
// 每页显示的条目数，初始值为14
onMounted(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  tableData = allTableData.value.slice(startIndex, endIndex);
  console.log(tableData)
})
const pageSize = ref(14);
watch([currentPage, pageSize], () => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  tableData = allTableData.value.slice(startIndex, endIndex);
});
const yes = ref(true)
const yes2 = ref(false)
function agree() {
  console.log('显示更多')
  if (yes.value == true) {
    yes.value = false
    yes2.value = true
    return
  }
  if (yes2.value == true) {
    yes2.value = false
    yes.value = true
    return
  }
}
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
        <el-countdown format="DD [天] HH:mm:ss" :value="value2">
          <template #title>
            <div style="display: inline-flex; align-items: center">
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
        <el-countdown format="DD [天] HH:mm:ss" :value="value2">
          <template #title>
            <div style="display: inline-flex; align-items: center">
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
  <div class="contest_body">
    <div class="card_four">
      <div class="list">
        <div class="head">
          <div class="title"> 精彩竞赛回顾 </div>
          <div class="info">参加虚拟竞赛，为你的排位赛做好充足准备</div>
          <a href="#"> 竞赛合作</a>
        </div>
        <div class="table">
          <el-table class="custom_table" :data="tableData" style="width: 100%;">
            <el-table-column prop="contest" label="竞赛场次" width="180" />
            <el-table-column prop="time" label="比赛时长" width="180" />
            <el-table-column prop="address" label="" />
          </el-table>
        </div>
        <div class="Result">
          <el-pagination background layout="prev, pager, next" :total="total" size="small"
            v-model:current-page="currentPage" v-model:page-size="pageSize" @current-change="() => { }"
            @size-change="() => { }" />
        </div>
      </div>
    </div>
    <div class="card_three">
      <div class="title">
        <div class="img"><img src="/src/assets/qi.jpg" alt="china map"></div>
        <div class="rank"><span>全省排名</span></div>
        <div class="check"><label><input type="checkbox" @click="agree"> 全国排名</label> </div>
      </div>
      <div class="list" v-if="yes">
        <div class="list_item">
          <div class="ranking">4</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">5</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">6</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">7</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">8</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">9</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">10</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="button">
          <el-button plain>显示更多</el-button>
        </div>
      </div>
      <div class="list" v-if="yes2">
        <div class="list_item">
          <div class="ranking">5</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">5</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">6</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">7</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">8</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">9</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="list_item">
          <div class="ranking">10</div>
          <div class="user">
            <el-avatar class="one" :size="50" :src="circleUrl" />
          </div>
          <div class="name">
            <div>jiete</div>
            <div>参加比赛51次</div>
          </div>
        </div>
        <div class="button">
          <el-button plain>显示更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 525px;
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
  width: 375px;
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

.contest_body {
  width: 900px;
  height: 820px;
  position: relative;
  top: 220px;
  left: 130px;

  .card_three {
    position: relative;
    top: -560px;
    left: 550px;
    width: 375px;
    height: 819px;

    .title {
      width: 345px;
      height: 65px;

      .img {
        width: 62px;
        height: 65px;
        margin-top: -210px;
        float: left;

        img {

          width: 62px;
          height: 55px;
        }
      }

      .rank {
        width: 179px;
        height: 65px;
        float: left;
        text-align: left;
        margin-top: -210px;
        margin-left: 62px;

        span {
          font-weight: 500;
          font-size: 25px;
          padding-left: 10px;
          line-height: 65px;
          color: #bdc3c7;
        }
      }

      .check {
        width: 80px;
        height: 65px;
        float: right;
        margin-top: -210px;
        text-align: left;

        label {
          font-size: 12px;
          color: #bdc3c7;
          line-height: 65px;
        }
      }
    }

    .list {
      position: relative;
      top: -180px;
      left: 0px;
      width: 345px;
      height: 489px;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);
      margin-top: 10px;

      .list_item {
        cursor: pointer;
        margin-top: 5px;
        width: 345px;
        height: 62px;
        text-align: left;
        border-bottom: 1px solid #f0f0f0;

        .ranking {
          width: 25px;
          height: 62px;
          line-height: 62px;
          float: left;
          margin-left: 10px;

        }

        .user {
          width: 30px;
          height: 47px;
          float: left;
          line-height: 47px;
          padding-left: 10px;
        }

        .name {
          width: 94.76px;
          height: 62px;
          float: left;
          margin-left: 40px;

          div {
            width: 120.76px;
            font-size: 16px;
          }
        }
      }

      .button {
        width: 345px;
        height: 62px;

        .el-button {
          width: 345px;
          height: 62px;
          border: 0;
          border-radius: 20px;
        }
      }

    }
  }

  .card_four {
    width: 525px;
    height: 780px;

    .list {
      width: 495px;
      height: 780px;
      margin-left: 15px;
      border-radius: 20px;
      background-color: white;
      box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);

      .head {
        width: 495px;
        height: 130.67px;
        border-bottom: 1px solid #f0f0f0;

        .title {
          position: relative;
          top: -180px;
          left: 20px;
          width: 495px;
          height: 42px;
          text-align: left;
          font-size: 30px;
          font-weight: 600;
          line-height: 42px;
          margin-top: 5px;
        }

        .info {
          position: relative;
          top: -120px;
          left: 0px;
          text-align: left;
          width: 495px;
          height: 18px;
          color: #afafaf;
          line-height: 18px;
          font-weight: 500;
          font-size: 13px;
          padding-left: 20px;
        }

        a {
          position: relative;
          top: -130px;
          left: 200px;
          width: 70px;
          height: 21px;
          color: #007bff;
          text-decoration: none;

          a:hover {
            color: #83bfff;
          }
        }
      }

      .table {
        position: relative;
        top: -70px;
        left: 0px;
        width: 495px;
        height: 600px;
      }

      .Result {
        width: 495px;
        height: 52px;

        .el-pagination {
          position: relative;
          top: 16px;
          left: 50px
        }
      }
    }
  }
}
</style>
