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
    <span>发布帖子/题目</span>
  </div>
  <div class="my-post">
    <span>我的帖子</span>
  </div>
  <el-card>
    <div class="writer">
      <div class="title">
        <span>推荐作者</span>
      </div>
      <div class="content">
        <div class="writer-item" v-for="item in 5" :key="item">
          <el-avatar :size="40" class="avatar" />
          <div class="info">
            <div class="name">
              <span>Han_Jiang-cn</span>
            </div>
            <div class="desc">
              <el-text size="small" truncated>一个小小的一个小小的一个小小的一个小小的一个小小的一个小小的一个小小的</el-text>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  height: 540px;
  border-radius: 15px;
  box-shadow: none;
}

// 发布帖子
.post {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px; // 更紧凑的横向间距
  // width: 80%;
  height: 48px; // 更适合导航类按钮的高度
  background: rgba(59, 130, 246, 0.08); // 浅蓝基底
  border: 1px solid rgba(191, 219, 254, 0.3); // 浅蓝边框
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 10px;

  &:hover {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(147, 197, 253, 0.5);
    box-shadow: 0 1px 2px rgba(59, 130, 246, 0.05),
      0 2px 4px rgba(59, 130, 246, 0.02);

    span {
      color: #1d4ed8; // 深蓝文字
    }

    &::before {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: scale(0.98);
    background: rgba(59, 130, 246, 0.15);
  }

  span {
    color: #1e40af; // 品牌蓝
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  // 更换为文档图标
  &::before {
    content: "📝"; // 可用SVG图标替换
    display: block;
    font-size: 18px;
    transition: transform 0.2s ease;
  }
}

.my-post {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px; // 更紧凑的横向间距
  // width: 80%;
  height: 48px; // 更适合导航类按钮的高度
  background: rgba(59, 130, 246, 0.08); // 浅蓝基底
  border: 1px solid rgba(191, 219, 254, 0.3); // 浅蓝边框
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 10px;

  &:hover {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(147, 197, 253, 0.5);
    box-shadow: 0 1px 2px rgba(59, 130, 246, 0.05),
      0 2px 4px rgba(59, 130, 246, 0.02);

    span {
      color: #1d4ed8; // 深蓝文字
    }

    &::before {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: scale(0.98);
    background: rgba(59, 130, 246, 0.15);
  }

  span {
    color: #1e40af; // 品牌蓝
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  // 更换为文档图标
  &::before {
    content: "📄"; // 可用SVG图标替换
    display: block;
    font-size: 18px;
    transition: transform 0.2s ease;
  }
}

// 推荐作者
.writer {
  .title {
    margin-bottom: 20px;
    border-bottom: 1px solid #EBEBEB;
    padding-bottom: 10px;

    span {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }

  .content {
    .writer-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 16px;
      border-radius: 12px;
      // background: #fff;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      gap: 16px; // 使用gap替代margin-left

      &:hover {
        cursor: pointer;
        background: rgba(59, 130, 246, 0.05);

        .name span {
          color: #3b82f6; // 品牌色激活
        }

        .avatar {
          transform: scale(1.05);
          border-color: rgba(59, 130, 246, 0.2);
        }
      }

      .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        overflow: hidden;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .info {
        flex: 1;
        min-width: 0; // 防止内容溢出

        .name {
          display: flex;
          align-items: center;
          gap: 8px;

          span {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937; // 更深的文本颜色
            transition: color 0.2s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .desc .el-text {
          margin-top: 6px;
          font-size: 14px;
          line-height: 1.5;
          color: #6b7280; // 更柔和的副文本颜色
          width: 100%;
          max-width: 320px; // 响应式限制
        }
      }
    }
  }
}
</style>
