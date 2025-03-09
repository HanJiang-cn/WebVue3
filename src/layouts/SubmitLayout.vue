<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import submitMain from '@/views/CompileMain/SubmitMain.vue'

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
<submitMain></submitMain>

    </div></div>

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

}
</style>
