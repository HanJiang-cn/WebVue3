<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/component-tags-order -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPostApi, thumbPostApi, favourPostApi } from '@/api/post'
import moment from 'moment'
import PreviewOnly from '@/components/PreviewOnly.vue'
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
const postData = ref({})
const postUser = ref({})
const currentUrl = ref(window.location.href)
const createTime = ref('')
const router = useRouter()
const id = router.currentRoute.value.query.id

const getPostInfor = async () => {
  try {
    const { data } = await getPostApi({ id: id })
    postData.value = data
    postUser.value = data.user
    createTime.value = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
    likeCount.value = data.thumbNum
    favoriteCount.value = data.favourNum
  } catch (error) {
    console.error('获取帖子详情失败:', error)
  }
}
onMounted(() => {
  getPostInfor()
})

// 互动相关逻辑
const isLiked = ref(false)
const likeCount = ref(123)
const isFavorited = ref(false)
const favoriteCount = ref(123)
// 复制链接
const handleCopyLink = () => {
  const url = window.location.href // 当前页面链接
  navigator.clipboard.writeText(url)
  ElMessage.success('链接已复制到剪贴板')
}
// 点赞处理
const handleLike = async () => {
  try {
    const { data } = await thumbPostApi({
      postId: id,
    })
    if (data === 1) {
      isLiked.value = true
      getPostInfor()
      ElMessage.success('点赞成功')
    } else {
      isLiked.value = false
      getPostInfor()
      ElMessage.error('取消点赞')
    }
  } catch (error) {
    console.error('点赞失败:', error)
  }
}
// 收藏处理
const handleFavorite = async () => {
  try {
    const { data } = await favourPostApi({
      postId: id,
    })
    if (data === 1) {
      isFavorited.value = true
      getPostInfor()
      ElMessage.success('收藏成功')
    } else {
      isFavorited.value = false
      getPostInfor()
      ElMessage.error('取消收藏')
    }
  } catch (error) {
    console.error('收藏失败:', error)
  }
}
</script>

<template>
  <div class="post-container">
    <!-- 返回按钮 -->
    <div class="back-button">
      <el-button type="text" @click="$router.back()">
        <el-icon>
          <ArrowLeft />
        </el-icon>
        <span>返回</span>
      </el-button>
    </div>
    <!-- 作者信息 -->
    <div class="author-section">
      <div class="author-info">
        <el-avatar :size="60" :src="postUser.userAvatar" />
        <div class="author-details">
          <h3>{{ postUser.userName }}</h3>
          <p class="bio">{{ postUser.userProfile }}</p>
          <div class="meta">
            <span>粉丝 {{ post.author.followers }}</span>
            <span>·</span>
            <span>{{ createTime }}</span>
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
      <h1 class="post-title">{{ postData.title }}</h1>

      <div class="post-meta">
        <el-tag type="info">{{ post.category }}</el-tag>
        <el-tag v-for="(tag, index) in postData.tagList" :key="index" class="post-tag">
          {{ tag }}
        </el-tag>
        <span class="views">阅读 {{ post.views }}</span>
      </div>

      <img v-if="post.cover" :src="post.cover" class="post-cover">

      <PreviewOnly :content="postData.content" />
      <!-- <div class="content" v-html="postData.content">
    </div> -->
      <LinkCard url="https://vitepress.yiov.top/" title="Vitepress中文搭建教程" description="https://vitepress.yiov.top/"
        logo="https://vitepress.yiov.top/logo.png" />

      <div class="post-actions">
        <el-button @click="handleLike" :class="{ 'liked': isLiked }">
          <el-icon :color="isLiked ? '#f56c6c' : ''">
            <LikeOutlined />
          </el-icon>
          {{ likeCount }}
        </el-button>

        <el-button @click="handleFavorite" :class="{ 'favorited': isFavorited }">
          <el-icon :color="isFavorited ? '#e6a23c' : ''">
            <Star />
          </el-icon>
          {{ favoriteCount }}
        </el-button>

        <el-popover placement="bottom" :width="200" trigger="click" class="share-popover">
          <template #reference>
            <el-button class="share-btn">
              <el-icon>
                <ImportOutlined />
              </el-icon>
              转发
            </el-button>
          </template>
          <template #default>
            <div class="qrcode-container">
              <vue-qrcode :value="currentUrl" :width="180" class="qrcode" />
              <el-button @click="handleCopyLink" type="primary" style="width: 100%;">
                <el-icon>
                  <Link />
                </el-icon>
                复制链接
              </el-button>
            </div>
          </template>
        </el-popover>
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

  .back-button {
    margin-bottom: 24px;

    .el-button {
      .el-icon {
        font-size: 18px;
      }

      span {
        font-size: 16px;
      }
    }
  }

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
      display: flex;
      justify-content: center;
      gap: 24px;

      :deep(.el-button) {
        padding: 8px 20px;
        border-radius: 20px;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
        }

        .el-icon {
          margin-right: 6px;
          transition: color 0.3s ease;
        }
      }

      .liked {
        color: #f56c6c;
        border-color: #f56c6c;
      }

      .favorited {
        color: #e6a23c;
        border-color: #e6a23c;
      }

      .share-btn:hover {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }


      .qrcode-container {
        padding: 12px;
        // text-align: center;

        .qrcode {
          margin-bottom: 12px;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 8px;
          background: white;
        }
      }
    }
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
</style>
