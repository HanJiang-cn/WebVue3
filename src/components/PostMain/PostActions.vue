<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  likes: {
    type: Number,
    default: 0
  },
  collections: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  isCollected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['like', 'collect', 'comment', 'share'])

const localLikes = ref(props.likes)
const isLiked = ref(props.isLiked)
const localCollections = ref(props.collections)
const isCollected = ref(props.isCollected)

const handleLike = () => {
  isLiked.value = !isLiked.value
  localLikes.value += isLiked.value ? 1 : -1
  emit('like', isLiked.value)
  ElMessage.success(isLiked.value ? '已点赞' : '已取消点赞')
}

const handleCollect = () => {
  isCollected.value = !isCollected.value
  localCollections.value += isCollected.value ? 1 : -1
  emit('collect', isCollected.value)
  ElMessage.success(isCollected.value ? '已收藏' : '已取消收藏')
}

const likeColor = computed(() => isLiked.value ? '#eb4d4b' : '')
const collectColor = computed(() => isCollected.value ? '#f0932b' : '')
</script>

<template>
  <div class="actions-container">
    <el-tooltip content="点赞文章" placement="top">
      <el-button :style="{ color: likeColor }" @click="handleLike">
        <el-icon :size="18">
          <Pointer />
        </el-icon>
        {{ localLikes }}
      </el-button>
    </el-tooltip>

    <el-tooltip content="收藏文章" placement="top">
      <el-button :style="{ color: collectColor }" @click="handleCollect">
        <el-icon :size="18">
          <Star />
        </el-icon>
        {{ localCollections }}
      </el-button>
    </el-tooltip>

    <el-tooltip content="查看评论" placement="top">
      <el-button @click="$emit('comment')">
        <el-icon :size="18">
          <ChatDotRound />
        </el-icon>
        {{ comments }}
      </el-button>
    </el-tooltip>

    <el-tooltip content="分享文章" placement="top">
      <el-button @click="$emit('share')">
        <el-icon :size="18">
          <Share />
        </el-icon>
        {{ shares }}
      </el-button>
    </el-tooltip>
  </div>
</template>

<style lang="less" scoped>
.actions-container {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid var(--el-border-color-light);
  border-bottom: 1px solid var(--el-border-color-light);
  margin: 24px 0;

  .el-button {
    padding: 8px 16px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .el-icon {
      margin-right: 6px;
    }
  }

  @media (max-width: 768px) {
    gap: 8px;

    .el-button {
      padding: 6px 12px;
      font-size: 0.9em;

      .el-icon {
        margin-right: 4px;
      }
    }
  }
}
</style>
