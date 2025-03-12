<script lang="ts" setup>
import navMenu from '@/components/navMenu/navMenu.vue';
import SubmitMain1 from '@/views/CompileMain/SubmitMain.vue';
</script>
<template>
   <div class="default-layout">
    <div class="header">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
 <div class="create">
<div class="title">新建试题</div>
  <div class="main-layout">
    <div class="main">
      <SubmitMain1 />
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
.create {
  max-width: 1700px;
  width: 100%;
  height: 100%;

  .title {
    color: #000;
    font-size: 22px;
    font-weight: 700;
    margin-top: 12px;
    margin-left: 130px;
  }

.main-layout {
  margin-left: 100px;
  max-width: 1500px;
  width: 85%;
  height: 100%;
}
}

</style>
