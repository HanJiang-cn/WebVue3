<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(['item'])
const postData = ref({})
postData.value = props.item
const content = ref('')
content.value = props.item?.content?.replace(/[^\u4e00-\u9fa5\d]/g, '') || props.item?.context?.replace(/[^\u4e00-\u9fa5\d]/g, '')

</script>

<template>
  <div class="card">
    <div class="top">
      <!-- 头像 -->
      <div class="right">
        <el-avatar :src="props.item?.user.userAvatar" :size="30" />
      </div>
      <!-- 内容 -->
      <div class="center">
        <p>{{ props.item?.user.userName }}</p>
        <p>{{ props.item?.title }}</p>
        <el-text truncated line-clamp="2">{{ content }}</el-text>
      </div>
      <div class="left" v-if="props.item?.post_picture">
        <img :src="props.item?.post_picture" alt="" />
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

  .center {
    margin-bottom: 10px;
  }

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
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-text {
      margin-right: 10px;
    }
  }
}
</style>
