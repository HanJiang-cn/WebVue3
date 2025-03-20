<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'

</script>

<template>
  <div class="default-layout">
    <div class="header">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
    <div class="main-layout">
      <div class="main">
        <RouterView />
      </div>
    </div>
    <div class="footer">
      页脚相关信息
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

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  width: 68%;
  height: 100%;
  display: flex;

  .main {
    height: 100%;
    width: 100%;
    float: left;
    text-align: left;
    color: #333;
    // margin-top: 40px;
  }

  // .aside {
  //   width: 350px;
  //   padding-top: 50px;
  //   color: #333;
  //   text-align: right;

  //   .aside-content {
  //     text-align: left;
  //     height: 100%;
  //   }
  // }
}

.footer {
  // 固定在底部
  position: fixed;
  // bottom: 0;
  width: 100%;
  color: #fff;
  height: 200px;
  border-top: #EBEBEB 1px solid;
  margin-top: 20px;
  background-color: #333;
}
</style>
