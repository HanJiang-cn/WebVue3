<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import CommunityMain from '@/views/CommunityMain/CommunityMain.vue'
import CommunityAside from '@/views/CommunityMain/CommunityAside.vue'

const handleChangeBg = (val: number) => {
  // css 背景图片切换
  const bannerBg = document.querySelector('.banner-bg') as HTMLElement
  bannerBg.style.backgroundImage = `url(/src/assets/${val}.jpg)`

  // // css 背景颜色切换
  // const bannerBg = document.querySelector('.banner-bg') as HTMLElement
  // bannerBg.style.backgroundColor = `rgba(59, 130, 246, ${val / 4})`
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
          <el-carousel-item v-for="item in 4" :key="item">
            <p
              style="width: 100%; height: 100%; background-image: url(/src/assets/1.jpg); background-size: cover; background-position: center;">
            </p>
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>
    <div class="main-layout">
      <div class="main">
        <CommunityMain />
      </div>
      <div class="aside">
        <div class="aside-content">
          <el-affix :offset="20" target=".aside-content">
            <CommunityAside />
          </el-affix>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.banner-bg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-image: url(/src/assets/0.jpg);
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;

  .header {
    height: 50px;
    border-bottom: #EBEBEB 1px solid;
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
  }

  .el-carousel {
    width: 70%;
    margin: 0 auto;
    box-shadow: 10px 10px 12px rgba(0, 0, 0, 0.5);
  }
}

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  width: 65%;
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
