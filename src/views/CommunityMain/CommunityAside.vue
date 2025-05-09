<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecommendUserListApi } from '@/api/community'

const emits = defineEmits(['switch'])
const search = ref('')
const switchIndex = ref(1)
const router = useRouter()

const handleSwitch = () => {
  emits('switch')
  switchIndex.value++
}

const handlePost = () => {
  // 在当前标签页中打开
  if (switchIndex.value % 2 === 0) {
    window.open(router.resolve({
      path: '/post/solutioncreate',
    }).href, '_blank')
  } else {
    window.open(router.resolve({
      path: '/post/create',
    }).href, '_blank')
  }
}
const handleMyPost = () => {
  if (switchIndex.value % 2 === 0) {
    window.open(router.resolve({
      path: '/post/solutiondetail',
    }).href, '_blank')
  } else {
    window.open(router.resolve({
      path: '/post/detail',
    }).href, '_blank')
  }
}

interface UserInfo {
  userAvatar: string
  userName: string
  userProfile: string
}

// 获取推荐用户列表
const recommendUserList = ref<UserInfo[]>([])
const getRecommendUserList = async () => {
  const res = await getRecommendUserListApi()
  recommendUserList.value = res.data
}
onMounted(() => {
  getRecommendUserList()
})

// 搜索功能
const handleSearch = () => {
  if (search.value.trim() === '') {
    return
  }
  // 路由跳转到搜索结果页面
  window.open(
    router.resolve({
      path: '/search',
      query: {
        search: search.value,
        type: switchIndex.value % 2 === 0 ? 'solution' : 'post'
      }
    }).href, '_self')
}
</script>

<template>
  <div class="search">
    <el-input v-model="search" style="max-width: 600px" placeholder="搜索" @keyup.enter="handleSearch">
      <template #suffix>
        <el-button icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
  <div class="switch" @click="handleSwitch">
    <span>{{ switchIndex % 2 === 0 ? '前往讨论板块' : '前往题解板块' }}</span>
  </div>
  <div class="post" @click="handlePost">
    <span>{{ switchIndex % 2 === 0 ? '发表题解' : '发表帖子' }}</span>
  </div>
  <div class="my-post" @click="handleMyPost">
    <span>{{ switchIndex % 2 === 0 ? '我的题解' : '我的帖子' }}</span>
  </div>
  <el-card>
    <div class="writer">
      <div class="title">
        <span>推荐作者</span>
      </div>
      <div class="content">
        <div class="writer-item" v-for="item in recommendUserList" :key="item.userName">
          <el-avatar :size="40" class="avatar" :src="item.userAvatar" />
          <div class="info">
            <div class="name">
              <span>{{ item.userName }}</span>
            </div>
            <div class="desc">
              <el-text size="small" truncated>{{ item.userProfile }}</el-text>
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
.post,
.my-post,
.switch {
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

.my-post::before {
  content: "📄" !important; // 可用SVG图标替换
}

.switch::before {
  content: "🪧" !important; // 可用SVG图标替换
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
