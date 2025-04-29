<!-- eslint-disable vue/block-lang -->
<script setup>
import { getPlanListApi } from '@/api/user'
import { onMounted, ref } from 'vue'
import MainCard from '@/components/IndexMain/MainCard.vue'
import tp from '@/assets/tp.webp'
import { useRouter } from 'vue-router'
import CommunityPost from '@/components/CommunityMain/CommunityPost.vue'
import { getAllPostListApi } from '@/api/post'

const tagsClick = ref('')

const router = useRouter()
const plans = ref([])
const loadData = async () => {
  const { data } = await getPlanListApi()
  plans.value = data
}
// 处理子组件事件
const handleBrowse = (id) => {
  router.push({
    path: '/problems/question',
    query: { id }
  })
}
onMounted(() => {
  loadData()
})
// const loading = ref(true)
// setTimeout(() => {
//   loading.value = false
// }, 2000)

// 滚动加载
const size = ref(10)
const listtotal = ref(10)
const scrollDisabled = ref(false)
const footerdiv = ref(false)
const loading = ref(false)

const recommendPostList = ref([])
const getRecommendPostList = async (size, tags) => {
  const res = await getAllPostListApi({
    current: 1,
    pageSize: size,
    tags: tags
  })
  recommendPostList.value = res.data.records
  listtotal.value = res.data.total
}
onMounted(() => {
  getRecommendPostList()
})
const infiniteHandler = () => {
  size.value += 5
  console.log('加载成功');
  if (recommendPostList.value.length < +listtotal.value) {
    getRecommendPostList(size.value)
  } else {
    scrollDisabled.value = true
    footerdiv.value = true
  }
}
</script>

<template>
  <el-carousel height="360px" class="main-carousel">
    <el-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-item" :style="{ background: `url(${tp}) center/cover` }">
        <div class="carousel-content">
          <h2>2023 算法大师班</h2>
          <p>全球顶级算法竞赛选手亲授</p>
          <el-button type="primary" size="large">立即报名</el-button>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <el-row>
    <el-row style="margin-top: 10px;">
      <div class="learning-plan">
        <div class="section-header">
          <h2><el-icon>
              <DocumentChecked />
            </el-icon> 我的学习计划</h2>
          <el-link type="primary">查看全部计划</el-link>
        </div>
        <el-row :gutter="20">
          <MainCard v-for="item in plans" :key="item.id" :plan-data="item" @browse="handleBrowse" />
          <MainCard v-for="item in plans" :key="item.id" :plan-data="item" @browse="handleBrowse" />
          <MainCard v-for="item in plans" :key="item.id" :plan-data="item" @browse="handleBrowse" />
        </el-row>
      </div>
    </el-row>
  </el-row>
  <div class="content">
    <el-affix target=".content" :offset="0">
      <div style="width: 100%; text-align: left;">
        <el-radio-group v-model="tagsClick" size="large">
          <el-radio-button label="全部" value="" @click="getRecommendPostList(10, [])" />
          <el-radio-button label="题目交流" value="题目交流" @click="getRecommendPostList(10, ['题目交流'])" />
          <el-radio-button label="职业发展" value="职业发展" @click="getRecommendPostList(10, ['职业发展'])" />
          <el-radio-button label="前端" value="前端" @click="getRecommendPostList(10, ['前端'])" />
          <el-radio-button label="数据结构" value="数据结构" @click="getRecommendPostList(10, ['数据结构'])" />
          <el-radio-button label="面试经验" value="面试经验" @click="getRecommendPostList(10, ['面试经验'])" />
          <el-radio-button label="学习方法" value="学习方法" @click="getRecommendPostList(10, ['学习方法'])" />
        </el-radio-group>
      </div>
    </el-affix>
    <div class="content-card" v-infinite-scroll="infiniteHandler" :infinite-scroll-disabled="scrollDisabled"
      infinite-scroll-distance="10">
      <div v-loading="loading">
        <CommunityPost v-for="item in recommendPostList" :key="item.id" @click="handlePost(item.id)" :item="item">
        </CommunityPost>
        <div v-if="footerdiv" class="loading-message">
          <el-icon :size="16" color="#64748b" class="icon-check">
            <Check />
          </el-icon>
          <span class="text">已经到底啦~</span>
        </div>
      </div>
      <!-- <div class="top">
        <div class="right">
          <el-avatar :size="30" />
        </div>
        <div class="center">
          <p>LeetCode</p>
          <p>七周算法特训</p>
          <p>七周掌握高频算法考点，学-练-测全方位夯实，剑指大厂 Offer！</p>
        </div>
        <div class="left">
          <img :src="tp" alt="" />
        </div>
      </div>
      <div class="bottom">
      </div>
    </div> -->
      <!-- <el-skeleton class="content-card" :loading="loading" animated
      :throttle="{ leading: 500, trailing: 500, initVal: true }" v-for="item in 15" :key="item">
      <template #template>
        <div class="content-card">
          <div class="top">
            <div class="right">
              <el-skeleton-item variant="circle" style="width: 30px; height: 30px" />
            </div>
            <div class="center" style="width: 60%; ">
              <el-skeleton-item variant="text" style="margin-left: 30px; margin-bottom: 10px; width: 20%" />
              <el-skeleton-item variant="text" style="margin-left: 30px; margin-bottom: 10px; margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-left: 30px; margin-bottom: 10px; margin-right: 16px" />
              <el-skeleton-item variant="text" style="margin-left: 30px; width: 100%" />
            </div>
            <div class="left">
              <el-skeleton-item variant="image" style="width: 146px; height: 88px" />
            </div>
          </div>
          <div class="bottom">
          </div>
        </div>

      </template>
<template #default>
        <div class="content-card">
          <div class="top">
            <div class="right">
              <el-avatar :size="30" />
            </div>
            <div class="center">
              <p>LeetCode</p>
              <p>七周算法特训</p>
              <p>七周掌握高频算法考点，学-练-测全方位夯实，剑指大厂 Offer！</p>
            </div>
            <div class="left">
              <img :src="tp" alt="" />
            </div>
          </div>
          <div class="bottom">
          </div>
        </div>
      </template>
</el-skeleton> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
// 轮播图样式
.main-carousel {
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;

  .carousel-item {
    height: 100%;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.6), transparent);
    }
  }

  .carousel-content {
    position: relative;
    z-index: 1;
    color: white;
    padding: 80px 5%;
    text-align: left;

    h2 {
      font-size: 2.5em;
      margin-bottom: 16px;
    }

    p {
      font-size: 1.2em;
      margin-bottom: 32px;
    }
  }
}

// 学习计划
.learning-plan {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.4em;
    }
  }
}

.el-link:hover {
  color: #737373 !important;
}

.content {
  margin-top: 40px;
  // text-align: center;
  height: 100%;
  border-radius: 4px;
}

.content-card {
  // padding-top: 16px;
  // padding-right: 25px;
  // padding-bottom: 20px;
  // // height: 90px;
  // cursor: pointer;

  // .top {
  //   display: flex;
  //   justify-content: space-between;

  //   .center {
  //     width: 100%;
  //     height: 80px;
  //     margin-left: 20px;
  //     text-align: left;

  //     .el-skeleton-item {
  //       margin-left: 30px;
  //       margin-bottom: 10px;
  //     }

  //     p {
  //       &:first-child {
  //         font-size: 14px;
  //         color: #0000008c;
  //         padding-bottom: 10px;
  //       }

  //       &:nth-child(2) {
  //         font-size: 16px;
  //         font-weight: bolder;
  //         color: #1a1a1a;
  //         padding-bottom: 10px;
  //       }

  //       &:last-child {
  //         font-size: 14px;
  //         color: #0000008c;
  //       }
  //     }
  //   }

  //   img {
  //     width: 146px;
  //     height: 88px;
  //     border-radius: 5px;
  //   }
  // }

  .loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    margin: 16px 0 32px;
    color: #64748b;
    background: rgba(241, 245, 249, 0.6);
    border-radius: 8px;
    animation: fadeIn 0.5s ease;

    .icon-check {
      margin-right: 8px;
      transform: translateY(1px);
    }

    .text {
      font-size: 14px;
      letter-spacing: 0.5px;
    }
  }

  .bottom {
    width: 94%;
    height: 20px;
    float: right;
    border-bottom: 1px solid #e6e6e6;
  }
}

:deep(.el-radio-group) {
  width: 100%;
  background-color: #fff;
  padding: 10px 0;

  .el-radio-button__inner {
    margin-right: 20px;
    border-radius: 5px;
    border: none;

    &:hover {
      color: #000 !important;
    }
  }

  .el-radio-button {
    --el-radio-button-checked-text-color: #000 !important;
    --el-radio-button-checked-bg-color: rgba(59, 130, 246, 0.05) !important;
    --el-radio-button-checked-border-color: transparent !important;
  }
}
</style>
