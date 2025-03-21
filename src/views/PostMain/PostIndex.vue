<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElLoading, ElButton } from 'element-plus'
import { getPostApi } from '@/api/post'
import CommentComponent from '@/components/CommentComponent.vue'
import LinkCard from '@/components/PostMain/LinkCard.vue'
import AuthorInfo from '@/components/PostMain/AuthorInfo.vue'
import PostActions from '@/components/PostMain/PostActions.vue'
import ShareComponent from '@/components/PostMain/ShareComponent.vue'
import PostTOC from '@/components/PostMain/PostTOC.vue'

const router = useRouter()
const qrCodeValue = ref(window.location.href)
const postId = router.currentRoute.value.query.id
const postData = ref(null)
const loading = ref(false)
const currentUser = ref({ id: 123 }) // 从store获取真实用户信息
const headings = ref([])

// 获取文章详情
const fetchPostDetail = async () => {
  try {
    loading.value = true
    const { data } = await getPostApi({ id: postId })
    if (data.code === 0) {
      postData.value = data.data
    } else {
      ElMessage.error('获取文章详情失败')
    }
  } catch (error) {
    ElMessage.error('网络请求失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 权限判断
// const isAuthor = computed(() => {
//   return postData.value?.user?.id === currentUser.value.id
// })

// 删除文章
const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '警告', {
      type: 'warning',
      confirmButtonText: '确定删除',
      cancelButtonText: '取消'
    })

    const res = await deletePostApi({ id: postId })
    if (res.code === 0) {
      ElMessage.success('文章已删除')
      router.push('/')
    }
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 生成目录
const generateTOC = () => {
  const contentElement = document.querySelector('.content-html')
  if (!contentElement) return

  const headingsArray = Array.from(contentElement.querySelectorAll('h2, h3'))
  headings.value = headingsArray.map(heading => ({
    id: heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-'),
    text: heading.textContent,
    level: parseInt(heading.tagName.substring(1), 10)
  }))
}

// 观察内容变化更新目录
const observer = new MutationObserver(generateTOC)
onMounted(() => {
  const contentElement = document.querySelector('.content-html')
  if (contentElement) {
    observer.observe(contentElement, {
      childList: true,
      subtree: true
    })
  }
})

// 初始化加载
onMounted(() => {
  if (!postId) {
    ElMessage.error('无效的文章ID')
    router.back()
    return
  }
  fetchPostDetail()
})

// 处理复制链接
const handleCopyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    ElMessage.success('链接已复制')
  } catch (error) {
    ElMessage.error('复制失败，请手动复制地址栏链接')
  }
}
</script>

<template>
  <div class="post-container">
    <!-- 返回按钮 -->
    <el-button class="back-btn" @click="router.back()" size="small">
      <el-icon>
        <ArrowLeft />
      </el-icon>
      返回
    </el-button>

    <!-- 操作栏 -->
    <div class="post-actions-bar" v-if="isAuthor">
      <el-button type="primary" @click="$router.push(`/edit?id=${postId}`)">
        编辑文章
      </el-button>
      <el-button type="danger" @click="handleDelete">
        删除文章
      </el-button>
    </div>

    <!-- 目录导航 -->
    <post-tOC :headings="headings" class="toc-container" />

    <!-- 加载状态 -->
    <el-skeleton v-if="loading" :rows="6" animated />

    <!-- 内容展示 -->
    <template v-else-if="postData">
      <!-- 头部信息 -->
      <header class="post-header">
        <author-info :avatar="postData.author.avatar" :name="postData.author.name" :publish-time="postData.createTime"
          :tags="postData.tags" />

        <h1 class="post-title">{{ postData.title }}</h1>

        <div class="post-meta">
          <time class="publish-time">{{ postData.createTime }}</time>
          <span class="views">阅读 {{ postData.views }}</span>
        </div>
      </header>

      <!-- 正文内容 -->
      <article class="post-content">
        <div v-html="postData.content" class="content-html"></div>
        <link-card v-for="link in postData.links" :key="link.url" v-bind="link" />
      </article>

      <!-- 互动操作栏 -->
      <post-actions :likes="postData.likes" :collections="postData.collections" :comments="postData.comments"
        :shares="postData.shares" @share="handleCopyLink" />

      <!-- 分享组件 -->
      <share-component :url="qrCodeValue" :title="postData?.title" class="share-container" />

      <!-- 评论区域 -->
      <section class="comment-section">
        <h3 class="section-title">评论（{{ postData.commentCount }}）</h3>
        <comment-component :comments="postData.comments" />
      </section>
    </template>

    <!-- 数据为空状态 -->
    <el-empty v-else description="文章不存在或已被删除" />
  </div>
</template>

<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 32px;
  background: var(--el-bg-color);
  border-radius: 12px;
  box-shadow: var(--el-box-shadow-light);
}

.back-btn {
  margin-bottom: 24px;
  color: var(--el-text-color-secondary);

  &:hover {
    color: var(--el-color-primary);
  }
}

.post-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.post-title {
  font-size: 32px;
  line-height: 1.3;
  color: var(--el-text-color-primary);
  margin: 24px 0 16px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  .publish-time::before {
    content: '∙';
    margin: 0 8px;
  }
}

.post-actions-bar {
  position: absolute;
  top: -50px;
  right: 0;
  z-index: 10;
}

.toc-container {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.main-content {
  position: relative;
}

.share-container {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;
}

.post-content {
  margin: 40px 0;
  line-height: 1.8;
  font-size: 16px;
  color: var(--el-text-color-regular);

  :deep(.content-html) {

    h2,
    h3 {
      margin: 1.5em 0 1em;
      color: var(--el-text-color-primary);
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    pre {
      padding: 16px;
      background: var(--el-fill-color-light);
      border-radius: 8px;
      overflow-x: auto;
    }

    blockquote {
      border-left: 4px solid var(--el-border-color);
      padding-left: 16px;
      margin: 16px 0;
      color: var(--el-text-color-secondary);
    }
  }
}

.comment-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--el-border-color-light);

  .section-title {
    font-size: 20px;
    margin-bottom: 24px;
    color: var(--el-text-color-primary);
  }
}

@media (max-width: 768px) {
  .post-container {
    padding: 24px 16px;
    margin: 12px;
  }

  .post-title {
    font-size: 24px;
  }

  .post-content {
    font-size: 15px;
    margin: 32px 0;
  }
}
</style>
