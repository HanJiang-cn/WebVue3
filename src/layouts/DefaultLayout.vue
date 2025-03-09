<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import IndexMain from '@/views/IndexMain/IndexMain.vue'
import IndexAside from '@/views/IndexMain/IndexAside.vue';

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
        <IndexMain />
      </div>
      <div class="aside">
        <div class="aside-content">
          <el-affix :offset="20" target=".aside-content">
            <IndexAside />
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

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  width: 65%;
  height: 100%;
  display: flex;

  .main {
    height: 100%;
    float: left;
    text-align: left;
    color: #333;
    margin-top: 40px;
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
