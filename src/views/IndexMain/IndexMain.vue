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
  <el-row>
    <el-row style="width: 100%;">
      <el-link :underline="false">
        <span class="title-text">学习计划</span>
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </el-link>
    </el-row>
    <el-row style="margin-top: 10px;">
      <MainCard v-for="item in 3" :key="item" />
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
.title-text {
  color: #000;
  font-size: 16px;
  font-weight: bolder;
  margin-right: 5px;
}

.el-link:hover {
  color: #737373 !important;
}

.content {
  margin-top: 40px;
  text-align: center;
  height: 100%;
  border-radius: 4px;
  // background: var(--el-color-primary-light-9);
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
    --el-radio-button-checked-bg-color: #F5F5F5 !important;
    --el-radio-button-checked-border-color: transparent !important;
  }
}
</style>
