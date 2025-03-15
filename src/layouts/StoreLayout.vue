<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import StoreMain from '@/views/StoreMain/StoreMain.vue';
</script>
<template>
    <div class="default-layout">
    <div class="header">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
    <div>
      <StoreMain />
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
</style>
