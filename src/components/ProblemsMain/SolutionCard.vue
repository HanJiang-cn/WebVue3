<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps } from 'vue'
import { getIdInfoApi } from '@/api/user'
import moment from 'moment'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
})

// 作者信息
const userData = ref({})
const getUserInfo = async () => {
  const { data } = await getIdInfoApi({ id: props.item.userId })
  userData.value = data
}
getUserInfo()
</script>

<template>
  <div class="card">
    <div class="left">
      <div class="top-time-name">
        <el-avatar :src="userData.userAvatar" :size="30" style="margin-left: 3px;" />
        <p>{{ userData.userName }}</p>
      </div>
      <p>{{ moment(props.item.createTime).format('YYYY-MM-DD HH:mm') }}</p>
    </div>
    <div class="right">
      <div class="top">
        <p>{{ props.item.title }}</p>
        <el-text truncated line-clamp="3">
          {{ props.item.context }}
        </el-text>
      </div>
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
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 100%;
  height: 100%;
  /* 新增 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 新增 */

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;

    >p {
      font-size: 14px;
      color: #666;
    }

    .top-time-name {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .right {
    flex: 1;
    /* 新增 */
    display: flex;
    flex-direction: column;
    /* 新增 */
    padding: 12px;

    .top {

      margin-bottom: 10px;

      >p:first-of-type {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #333;
      }

      .el-text {
        font-size: 14px;
        line-height: 1.5;
        color: #666;
        display: -webkit-box;
        white-space: pre-wrap;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .bottom {
      padding: 12px 0 0;
      border-top: 1px solid #f0f0f0;
      margin-top: auto;
      /* 新增 */

      .el-row {
        display: flex;
        align-items: center;
        gap: 20px;

        .el-text {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #999;
          font-size: 14px;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
