<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import CommunityMain from '@/views/CommunityMain/CommunityMain.vue'
import CommunityAside from '@/views/CommunityMain/CommunityAside.vue'

import { ref, onMounted } from 'vue'
import { getRecommendBannerListApi } from '@/api/community'

const visable = ref(true)
const bannerList = ref([])

const getBannerList = async () => {
  const res = await getRecommendBannerListApi()
  if (res.code === 0) {
    bannerList.value = res.data
  }
}
onMounted(() => {
  getBannerList()
})
const handleChangeBg = (val: number) => {
  // 背景图片切换
  const bannerBg = document.querySelector('.banner-bg') as HTMLElement
  bannerBg.style.backgroundImage = `url(${bannerList.value[val]})`
  // 获取所有轮播项元素
  const carouselItem = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>
  // 遍历轮播项设置背景图
  carouselItem.forEach((item) => {
    // 动态设置背景图片路径，使用传入的val参数拼接图片名
    item.style.backgroundImage = `url(${bannerList.value[val]})`
  })
}
</script>

<template>
  <div class="default-layout">
    <div class="banner-bg">
      <div class="header">
        <div class="nav-menu">
          <navMenu style="border-bottom: none;" />
        </div>
      </div>
      <div class="banner">
        <el-carousel height="280px" motion-blur @change="handleChangeBg">
          <el-carousel-item v-for="item in 3" :key="item">
            <p class="carousel-item">
            </p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="main-layout">
      <div class="main">
        <CommunityMain :visable="visable" />
      </div>
      <div class="aside">
        <div class="aside-content">
          <el-affix :offset="20" target=".aside-content">
            <CommunityAside @switch="visable = !visable" />
          </el-affix>
        </div>
      </div>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>


<style lang="less" scoped>
.banner-bg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-image: url(${bannerList.value[0]});
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;

  .header {
    height: 50px;
    overflow: hidden;
    backdrop-filter: blur(5px);

    .nav-menu {
      max-width: 1700px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }

  .banner {
    margin: 0 auto;
    width: 100%;
    height: 280px;
    max-width: 2000px;
    backdrop-filter: blur(5px);

    .el-carousel {
      position: absolute;
      width: 70%;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      // margin: 0 -50%;
      box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.5);

      .carousel-item {
        width: 100%;
        height: 100%;
        background-image: url(${bannerList.value[0]});
        background-size: cover;
        background-position: center;
      }
    }
  }
}

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  width: 75%;
  height: 100%;
  display: flex;

  .main {
    width: 100%;
    height: 100%;
    float: left;
    text-align: left;
    color: #333;
    margin-top: 40px;
    margin-right: 30px;
  }

  .aside {
    width: 350px;
    padding-top: 50px;
    color: #333;
    text-align: right;

    .aside-content {
      text-align: left;
      height: 100%;
    }
  }
}
</style>
