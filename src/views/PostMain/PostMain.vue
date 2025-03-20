<!-- eslint-disable vue/block-lang -->
<script setup>
import CommentComponent from '@/components/CommentComponent.vue'
import LinkCard from '@/components/PostMain/LinkCard.vue'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getPostApi } from '@/api/post'

const qrCodeValue = ref(window.location.href)

// 返回上一页
const goBack = () => {
  window.history.back()
}

// 复制链接
const handleCopyLink = () => {
  const url = window.location.href // 当前页面链接
  navigator.clipboard.writeText(url)
  ElMessage.success('链接已复制到剪贴板')
}

</script>

<template>
  <div class="post-container">
    <el-button style="margin-bottom: 20px;" @click="goBack">
      <el-icon>
        <ArrowLeft />
      </el-icon>
    </el-button>
    <!-- 头部信息 -->
    <div class="post-header">
      <div class="author-info">
        <el-avatar :size="48" />
        <div class="meta">
          <h2>前端达人</h2>
          <div class="sub-meta">
            <span>2023/1/4</span>
            <el-tag v-for="tag in 2" :key="tag" size="small">123</el-tag>
          </div>
        </div>
      </div>
      <h1 class="post-title">Vue3 组合式API最佳实践</h1>
    </div>

    <!-- 正文内容 -->
    <div class="post-content">
      <div class="content">
        115615618561561561561<br>
        <LinkCard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/"
          logo="https://vitepress.yiov.top/logo.png" />
      </div>
    </div>

    <!-- 互动数据 -->
    <div class="action-bar">
      <div class="left">
        <el-button>
          <el-icon>
            <Pointer />
          </el-icon>
          123
        </el-button>
        <el-button>
          <el-icon>
            <Star />
          </el-icon>
          123
        </el-button>
        <el-button>
          <el-icon>
            <ChatDotRound />
          </el-icon>
          123
        </el-button>
        <!-- 转发 -->
        <el-popover placement="bottom" :width="200" trigger="click">
          <template #reference>
            <el-button>
              <el-icon>
                <ImportOutlined />
              </el-icon>
              转发
            </el-button>
          </template>
          <template #default>
            <vue-qrcode :value="qrCodeValue" width="180"></vue-qrcode>
            <div style="text-align: center;">
              <el-button @click="handleCopyLink">
                <el-icon>
                  <Link />
                </el-icon>
                复制链接
              </el-button>
            </div>
          </template>
        </el-popover>
      </div>
      <!-- 浏览数据 -->
      <div class="right">
        <span>浏览 123</span>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comment-section">
      <CommentComponent />
    </div>
  </div>
</template>



<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 32px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.meta h2 {
  margin: 0;
  font-size: 1.2em;
}

.sub-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  margin-top: 4px;
}

.post-title {
  font-size: 2em;
  color: #1a1a1a;
}

.post-content {
  margin: 32px 0;
  line-height: 1.8;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: 24px 0;

  .el-icon {
    margin-right: 5px;
  }

  :deep(.el-popover) {
    display: flex;
    justify-content: flex-end;
  }
}

.comment-item {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-item .content {
  flex: 1;
}

.comment-item .header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.comment-item .name {
  font-weight: 500;
}

.comment-item .time {
  color: #999;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .post-container {
    padding: 16px;
    margin: 12px;
  }

  .post-title {
    font-size: 1.5em;
  }
}
</style>
