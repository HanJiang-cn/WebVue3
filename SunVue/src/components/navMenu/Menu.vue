<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-menu :router="true" :default-active="$route.path" >
        <el-sub-menu index="oneone" class="demo-tabs">
          <template #title>
            <el-icon><location /></el-icon>
            <span>第一</span>
          </template>
          <el-menu-item index="/one"><span>1</span></el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="towtow" class="demo-tabs">
             <template #title>
            <el-icon><location /></el-icon>
            <span>第二</span>
          </template>
           <el-menu-item index="/tow" ><span>2</span></el-menu-item>
        </el-sub-menu>
         <el-sub-menu index="three" class="demo-tabs" >
             <template #title>
            <el-icon><location /></el-icon>
            <span>第三</span>
          </template>
           <el-menu-item index="/three"><span>3</span></el-menu-item>
        </el-sub-menu>
         <el-sub-menu index="four" class="demo-tabs" >
             <template #title>
            <el-icon><location /></el-icon>
            <span>第四</span>
          </template>
           <el-menu-item index="/four" ><span>4</span></el-menu-item>
        </el-sub-menu>
         <el-sub-menu index="five"  class="demo-tabs">
             <template #title>
            <el-icon><location /></el-icon>
            <span>第五</span>
          </template>
           <el-menu-item index="/five"><span>5</span></el-menu-item>
        </el-sub-menu>
   </el-menu>
</template>
<script lang="ts">
 

</script>
<style lang="less" scoped>
 .demo-tabs {
  ::v-deep  .is-active{color: white !important;background-color: #409EFF;}
  }
</style>
<!-- <template>
    <el-menu >
        <menu-item v-for="item in menuItems" :key="item.url" :item="item"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/auth';
import MenuItem from './MenuItem.vue';
const userStore = useUserStore();
const menuItems=userStore.menu

</script> -->