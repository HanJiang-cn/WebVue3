<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import TeamMainTow from "@/views/TeamMain/TeamMainTow.vue"
</script>

<template>
  <div class="default-layout">
    <div class="header">
      <div class="contest-menu">
        <navMenu></navMenu>
      </div>
    </div>
    <div class="mainlayout">
      <div class="main">
        <TeamMainTow></TeamMainTow>
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

.mainlayout {
  width: 100%;
  height: 1600px;
  text-align: center;
  background-color: #fafafa;

  .main {
    margin: 0 auto;
    width: 1000px;
    height: 1600px;
    background-color: #fafafa;
    text-align: left;
  }
}
</style>
