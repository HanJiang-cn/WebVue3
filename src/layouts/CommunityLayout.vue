<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import CommunityMain from '@/views/CommunityMain/CommunityMain.vue'
import CommunityAside from '@/views/CommunityMain/CommunityAside.vue'

</script>

<template>
  <div class="default-layout">
    <div class="header">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
    <div class="banner">
      <el-carousel height="280px" motion-blur>
        <el-carousel-item v-for="item in 4" :key="item">
          <p style="width: 100%; height: 100%; background: rgba(59, 130, 246, 0.2);">{{ item }}</p>
        </el-carousel-item>
      </el-carousel>
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
.header {
  height: 50px;
  border-bottom: #EBEBEB 1px solid;
  overflow: hidden;

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
  max-width: 2000px;
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
