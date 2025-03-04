<script setup lang="ts">
import cover from '@/assets/cover.png'
</script>

<template>
  <el-button>
    <img :src="cover" />
    <div class="text">
      <p>
        面试经典 150 题
      </p>
      <p>
        最经典 150 题，掌握面试所有知识点
      </p>
    </div>
  </el-button>
</template>

<style lang="less" scoped>
.el-button {
  padding: 0;
  width: 243px;
  height: 88px;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: none;
  transition: all .3s;
  text-align: left;

  &:hover {
    background-color: #F0F0F0 !important;
  }

  img {
    width: 72px;
    height: 72px;
    border-radius: 5px;
  }

  p {
    color: #52525299;
    margin-left: 10px;
    white-space: normal;
    width: 145px;
    font-size: 12px;
    line-height: 17px;

    &:first-child {
      margin-bottom: 10px;
      font-size: 14px;
      color: #1a1a1a;
    }
  }
}
</style>
