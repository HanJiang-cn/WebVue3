<script lang="ts" setup>

import { ref } from 'vue'

const input3 = ref('')
</script>

<template>
  <div class="search">
    <el-input v-model="input3" style="max-width: 600px" placeholder="搜索">
      <template #suffix>
        <el-button icon="Search" />
      </template>
    </el-input>
  </div>
  <div class="post">
    <span>发布帖子</span>
  </div>
  <div class="post">
    <span>我的帖子</span>
  </div>
  <el-card>
    <div>AsideCard</div>
  </el-card>
</template>

<style lang="less" scoped>
// 搜索框
.search {
  margin: 20px 0;

  :deep(.el-input) {
    .el-input__wrapper {
      border-radius: 15px;

      .el-button {
        // background-color: transparent;
        border: none;
        border-radius: 15px;
        margin-right: -10px;

        &:hover {
          background-color: transparent;
          color: #000;
        }
      }
    }
  }
}

// 卡片
.el-card {
  height: 450px;
  border-radius: 15px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0px 0px 1px 0px #0000001a,
    0px 0.5px 5px 0px #0000001a;
}

// 发布帖子
.post {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border: #EBEBEB 1px solid;
  border-radius: 15px;
  cursor: pointer;

  span {
    color: #999;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      color: #000;
      font-size: 18px;
    }
  }
}
</style>
