<script lang="ts" setup>
import MainCard from '@/components/IndexMain/MainCard.vue'
import tp from '@/assets/tp.webp'
import { ref } from 'vue'

const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 2000)

const radio1 = ref('1')
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
          <MainCard v-for="item in 3" :key="item" />
        </el-row>
      </div>
    </el-row>
  </el-row>
  <div class="content">
    <el-affix target=".content" :offset="0">
      <div style="width: 100%; text-align: left;">
        <el-radio-group v-model="radio1" size="large">
          <el-radio-button label="New York" value="1" />
          <el-radio-button label="Washington" value="Washington" />
          <el-radio-button label="Los Angeles" value="Los Angeles" />
          <el-radio-button label="Chicago" value="Chicago" />
        </el-radio-group>
      </div>
    </el-affix>
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
    <el-skeleton class="content-card" :loading="loading" animated
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
    </el-skeleton>
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
  text-align: center;
  height: 100%;
  border-radius: 4px;
}

.content-card {
  padding-top: 16px;
  padding-right: 25px;
  padding-bottom: 20px;
  height: 90px;
  cursor: pointer;

  .top {
    display: flex;
    justify-content: space-between;

    .center {
      width: 100%;
      height: 80px;
      margin-left: 20px;
      text-align: left;

      .el-skeleton-item {
        margin-left: 30px;
        margin-bottom: 10px;
      }

      p {
        &:first-child {
          font-size: 14px;
          color: #0000008c;
          padding-bottom: 10px;
        }

        &:nth-child(2) {
          font-size: 16px;
          font-weight: bolder;
          color: #1a1a1a;
          padding-bottom: 10px;
        }

        &:last-child {
          font-size: 14px;
          color: #0000008c;
        }
      }
    }

    img {
      width: 146px;
      height: 88px;
      border-radius: 5px;
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
