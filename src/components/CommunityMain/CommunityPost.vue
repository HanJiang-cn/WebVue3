<!-- eslint-disable vue/block-lang -->
<script setup>

</script>

<template>
  <div class="card">
    <div class="top">
      <!-- 头像 -->
      <div class="right">
        <el-avatar :size="30" />
      </div>
      <!-- 内容 -->
      <div class="center">
        <p>LeetCode</p>
        <p>七周算法特训</p>
        <el-text truncated line-clamp="2">七周掌握高频算法考点，学-练-测全方位夯实，剑指大厂 Offer！剑指大厂 Offer！剑指大厂 Offer！剑指大厂
          Offer！剑指大厂 Offer！剑指大厂 Offer！剑指大厂 Offer！</el-text>
      </div>
      <div class="left">
        <img :src="tp" alt="" />
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <el-row>
        <el-text>
          <EyeOutlined />
          123
        </el-text>
        <el-text>
          <MessageOutlined />
          123
        </el-text>
      </el-row>
    </div>
  </div>
</template>

<style lang="less">
.card {
  padding-top: 16px;
  padding-right: 25px;
  padding-bottom: 20px;
  cursor: pointer;

  .top {
    display: flex;
    justify-content: space-between;

    .center {
      width: 100%;
      height: 80px;
      margin-left: 20px;
      margin-right: 20px;

      .el-text {
        white-space: pre-wrap;
        line-height: 1.5;
      }

      p {
        &:first-child {
          font-size: 14px;
          color: #0000008c;
          margin-bottom: 8px;
        }

        &:nth-child(2) {
          font-size: 16px;
          font-weight: bolder;
          color: #1a1a1a;
          margin-bottom: 5px;
        }
      }
    }

    img {
      width: 146px;
      height: 88px;
      border-radius: 5px;
    }
  }

  .bottom {
    width: 98%;
    height: 20px;
    // float: right;
    margin-left: 50px;
    border-bottom: 1px solid #0000001a;
    padding: 10px 0;

    .el-text {
      margin-right: 10px;
    }
  }
}
</style>
