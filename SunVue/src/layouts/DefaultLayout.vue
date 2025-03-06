<template>
    <el-container>
      <el-header>
       <TopHeader></TopHeader>
      </el-header>
      <el-container>
        <el-aside width="200px"> 
          <Menu></Menu>
         </el-aside>
        <el-main>
          <TabsLayout></TabsLayout>
        </el-main>
      </el-container>
    </el-container>
</template>
<script lang="ts"  setup>
import Menu from '../components/navMenu/Menu.vue'
import TopHeader from "../components/TopHeader/TopHeader.vue"
import TabsLayout from "../layouts/TabsLayout.vue"

</script>
<style lang="less" scoped>
  .el-aside{
    height: 100vh;
    box-shadow: 10px 0px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    z-index: 999;
  }
  .el-header{
    padding: 0 !important;
    box-shadow:0px 5px 0px -4px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }
  .el-main{
    height: 100vh;
    overflow: auto;
    background-color: #f1f2f6;
  }
  .el-aside {
  height: 100vh;

  box-shadow:5px 0 4px -4px rgba(0, 0, 0, 0.2);
  background-color: white
}


</style>