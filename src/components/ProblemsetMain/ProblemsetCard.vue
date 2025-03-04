<script setup lang="ts">
import cover from '@/assets/cover.png'
</script>

<template>
  <div class="card" style="width: 275px; height: 88px;">
    <div class="left">
      <img :src="cover" alt="" />
    </div>
    <div class="right">
      <p>面试经典 150 题</p>
      <el-text truncated>最经典 150 题，掌握面试所有知识点</el-text>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // border: 1px solid #e5e5e5;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow:
    0px 2px 6px #0000000a,
    0px 4px 8px #00000005,
    0px 6px 12px #00000005;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow:
      0px 4px 16px #0000000a,
      0px 8px 32px #0000000a,
      0px 12px 48px #0000000a
  }

  .left {
    img {
      margin: 0 8px;
      width: 72px;
      height: 72px;
      border-radius: 5px;
    }
  }

  .right {
    margin-right: 10px;
    margin-right: 5px;

    p {
      font-size: 14px;
      color: #1a1a1a;
    }

    .el-text {
      max-width: 180px;
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>
