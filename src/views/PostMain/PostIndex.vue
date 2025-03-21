<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/component-tags-order -->
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import LinkCard from '@/components/PostMain/LinkCard.vue'
import CommentComponent from '@/components/CommentComponent.vue'

const post = ref({
  id: 1,
  title: 'Vue3 最佳实践指南',
  author: {
    id: 1,
    name: '技术达人',
    avatar: 'https://example.com/avatar.jpg',
    bio: '前端开发专家 | Vue技术爱好者',
    followers: 1234
  },
  content: '<p>这里是详细的帖子内容...</p>',
  category: 'tech',
  tags: ['前端', 'Vue3', '最佳实践'],
  cover: 'https://example.com/cover.jpg',
  views: 2560,
  likes: 345,
  comments: 42,
  publishTime: '2023-08-15 10:24:36'
})

const currentUrl = ref(window.location.href)

// 模拟数据加载
onMounted(() => {
  // 这里可以添加获取帖子详情的API调用
})

const handleLike = () => {
  post.value.likes++
  ElMessage.success('点赞成功')
}

const handleFollow = () => {
  ElMessage.info('已关注作者')
}
</script>

<template>
  <div class="post-container">
    <!-- 作者信息 -->
    <div class="author-section">
      <div class="author-info">
        <el-avatar :size="60" :src="post.author.avatar" />
        <div class="author-details">
          <h3>{{ post.author.name }}</h3>
          <p class="bio">{{ post.author.bio }}</p>
          <div class="meta">
            <span>粉丝 {{ post.author.followers }}</span>
            <span>·</span>
            <span>{{ post.publishTime }}</span>
          </div>
        </div>
      </div>
      <div class="author-actions">
        <el-button type="primary" @click="handleFollow">关注</el-button>
        <vue3-social-share :url="currentUrl" :title="post.title" class="share-buttons" />
      </div>
    </div>

    <!-- 帖子内容 -->
    <div class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>

      <div class="post-meta">
        <el-tag type="info">{{ post.category }}</el-tag>
        <el-tag v-for="(tag, index) in post.tags" :key="index" class="post-tag">
          {{ tag }}
        </el-tag>
        <span class="views">阅读 {{ post.views }}</span>
      </div>

      <img v-if="post.cover" :src="post.cover" class="post-cover">

      <div class="content" v-html="post.content"></div>
      <LinkCard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/"
        logo="https://vitepress.yiov.top/logo.png" />

      <div class="post-actions">
        <el-button type="danger" @click="handleLike">
          <el-icon>
            <Star />
          </el-icon> 点赞 {{ post.likes }}
        </el-button>
      </div>
    </div>

    <!-- 评论区域 -->
    <div class="comment-section">
      <h3>评论（{{ post.comments }}）</h3>
      <CommentComponent />
    </div>
  </div>
</template>

<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  .author-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #eee;

    .author-info {
      display: flex;
      align-items: center;
      gap: 16px;

      .author-details {
        h3 {
          margin: 0;
          font-size: 1.2em;
        }

        .bio {
          margin: 4px 0;
          color: #666;
          font-size: 0.9em;
        }

        .meta {
          display: flex;
          gap: 8px;
          color: #999;
          font-size: 0.8em;
        }
      }
    }

    .share-buttons {
      margin-left: 16px;
    }
  }

  .post-content {
    .post-title {
      font-size: 2em;
      margin: 0 0 16px;
    }

    .post-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      color: #666;

      .post-tag {
        margin-right: 8px;
      }

      .views {
        margin-left: auto;
        font-size: 0.9em;
      }
    }

    .post-cover {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .content {
      line-height: 1.8;
      font-size: 16px;

      :deep(img) {
        max-width: 100%;
        height: auto;
      }
    }

    .post-actions {
      margin: 32px 0;
      text-align: center;
    }
  }

  .comment-section {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid #eee;

    .comment-input {
      margin-bottom: 32px;

      .submit-btn {
        margin-top: 12px;
      }
    }

    .comment-item {
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid #f5f5f5;

      .comment-content {
        flex: 1;

        .comment-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          .username {
            font-weight: 500;
            margin-right: 8px;
          }

          .time {
            color: #999;
            font-size: 0.8em;
          }
        }

        .comment-text {
          margin: 0;
          line-height: 1.6;
        }

        .comment-actions {
          margin-top: 8px;
        }
      }

      .reply-item {
        display: flex;
        gap: 12px;
        margin-top: 16px;
        padding: 12px;
        background: #f9f9f9;
        border-radius: 6px;

        .reply-content {
          .reply-header {
            display: flex;
            align-items: center;

            .username {
              font-size: 0.9em;
              margin-right: 8px;
            }

            .time {
              color: #999;
              font-size: 0.8em;
            }
          }

          .reply-text {
            margin: 4px 0 0;
            font-size: 0.9em;
            color: #666;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px;

    .author-section {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      .share-buttons {
        margin-left: 0;
      }
    }

    .post-title {
      font-size: 1.5em !important;
    }
  }
}
</style>
