<script setup lang="ts">
import conMenu from "@/components/ContestMain/ConMenu.vue";
import TeamMainList from "@/views/TeamMain/TeamMainList.vue"


</script>



<template>
<div class="default-layout">
    <div class="header">
      <div class="contest-menu">
        <conMenu></conMenu>
      </div>
    </div>
     <div class="mainlayout">
        <div class="main">
            <TeamMainList></TeamMainList>
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
  height: 100%; 
  text-align: center;
  background-color: #ffffff;
  .main {
    margin: 0 auto;
    width: 1000px;
    height:100% ;
    background-color: #ffffff;
    text-align: left;
  }
}
</style>