<!-- eslint-disable vue/block-lang -->
<script setup>
import CommentComponent from '@/components/CommentComponent.vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// import { thumbPostApi, favourPostApi } from '@/api/post'
import { getSolutionInfoApi } from '@/api/solution'
import { getIdInfoApi } from '@/api/user'
import { useRouter } from 'vue-router'
import moment from 'moment'
import PreviewOnly from '@/components/PreviewOnly.vue'

const handleBack = () => {
  window.history.back()
}

// 获取题解信息
const router = useRouter()
const postData = ref({})
const postUser = ref({})
const createTime = ref('')

const getPostInfor = async () => {
  try {
    const { data } = await getSolutionInfoApi({ id: router.currentRoute.value.query.solutionId })
    postData.value = data
    const res = await getIdInfoApi({ id: data.userId })
    postUser.value = res.data
    createTime.value = moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')
    likeCount.value = data.thumbNum
    favoriteCount.value = data.favourNum
    // console.log(postUser.value)
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
  <el-button type="text" @click="handleBack" class="back-button">
    <el-icon>
      <ArrowLeft />
    </el-icon>
    <span>返回</span>
  </el-button>
  <el-row class="solution-card">
    <el-col :span="24" class="top">
      <div class="title">
        {{ postData.title }}
      </div>
      <div class="avatar-container">
        <div class="author-info">
          <el-avatar :src="postUser.userAvatar" :size="40" class="avatar" />
          <div class="meta">
            <div class="name">
              <span>{{ postUser.userName }}</span>
            </div>
            <div class="time">
              <el-icon>
                <Clock />
              </el-icon>
              <span>{{ createTime }}</span>
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
        <PreviewOnly :content="postData.context" />
      </div>
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
      </div>
      <div class="comment">
        <CommentComponent></CommentComponent>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.back-button {
  gap: 8px;
  font-size: 16px;
  color: #34495e;

  .el-icon {
    font-size: 20px;
  }
}

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
</style>
