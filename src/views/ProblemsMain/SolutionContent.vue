<!-- eslint-disable vue/block-lang -->
<script setup>
import CommentComponent from '@/components/CommentComponent.vue'
</script>

<template>
  <el-row class="solution-card">
    <el-col :span="24" class="top">
      <div class="title">
        一个题解的答案
      </div>
      <div class="avatar-container">
        <div class="author-info">
          <el-avatar :size="40" class="avatar" />
          <div class="meta">
            <div class="name">
              <span>用户名</span>
            </div>
            <div class="time">
              <el-icon>
                <Clock />
              </el-icon>
              <span>2023-06-20 14:30</span>
            </div>
            <div class="ip">
              <span>来自于 山东</span>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="24" class="content">
      <div class="solution-content">
        题解内容
      </div>
      <div class="comment">
        <CommentComponent></CommentComponent>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.solution-card {
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;

  .top {
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 12px;
    }

    .avatar-container {
      margin: 16px 0;

      .author-info {
        display: flex;
        align-items: center;
        gap: 12px;


        .meta {
          div {
            margin-bottom: 2px;
          }

          .name {
            font-size: 14px;
            font-weight: 500;
            color: #34495e;
          }

          .time {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #7f8c8d;

            .el-icon {
              font-size: 14px;
            }
          }

          .ip {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #7f8c8d;

            .el-icon {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .content {
    .solution-content {
      font-size: 20px;
      color: #34495e;
      line-height: 1.5;
      font-weight: bold;
    }

    .comment {
      margin-top: 20px;

      .comment-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
