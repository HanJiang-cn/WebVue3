<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import ContestMain from "@/views/ContestMain/ContestMain.vue"
import ContestMainTow from "@/views/ContestMain/ContestMainTow.vue"
</script>

<template>
  <div class="default-layout">
    <div class="header">
      <div class="contest-menu">
        <navMenu></navMenu>
      </div>
    </div>
    <div class="main-layout">
      <div class="main_one">
        <ContestMain></ContestMain>
      </div>
      <div class="main_tow">
        <ContestMainTow></ContestMainTow>
      </div>
    </div>

    <div class="footer">
      <el-divider />
      <div class="container">
        <div class="row">
          <span>xxxxxxxxxxxx</span>
        </div>
        <div class="row_tow">
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
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

  .contest-menu {
    max-width: 1700px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}

.main-layout {
  width: 100%;
  height: 1600px;
  text-align: center;
  overflow: hidden;
  background-color: #fafafa;

  .main_one {
    width: 100%;
    height: 489px;
    background-image: linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%);
    display: flex;
    justify-content: center;
  }

  .main_tow {
    width: 1170px;
    height: 1040px;
    text-align: center;
    margin: 0 auto;
  }
}

.footer {
  height: 140px;
  overflow: hidden;
  background-color: #fafafa;

  .container {
    width: 1170px;
    height: 120px;
    margin: 0 auto;
    text-align: left;

    .row {
      width: 1170px;
      height: 21px;
      margin-left: 130px;
    }

    .row_tow {
      width: 1170px;
      height: 21px;
      margin-top: 20px;
      margin-left: 130px;
    }
  }
}
</style>
