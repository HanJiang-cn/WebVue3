<!-- eslint-disable vue/block-lang -->
<script setup>
import { computed } from 'vue'
import { ElTag } from 'element-plus'
// import { formatDateTime } from '@/utils/date'

const props = defineProps({
  avatar: {
    type: String,
    default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  },
  name: {
    type: String,
    required: true
  },
  publishTime: {
    type: [String, Date],
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  showFollow: {
    type: Boolean,
    default: true
  }
})

const formattedTime = computed(() => {
  return formatDateTime(props.publishTime, 'YYYY-MM-DD HH:mm')
})
</script>

<template>
  <div class="author-container">
    <div class="main-info">
      <el-avatar :size="48" :src="avatar" />
      <div class="meta">
        <div class="name-row">
          <h2 class="name">{{ name }}</h2>
          <el-button v-if="showFollow" size="small" type="info" plain class="follow-btn">
            关注
          </el-button>
        </div>
        <div class="sub-meta">
          <time class="publish-time">{{ formattedTime }}</time>
          <div class="tags">
            <el-tag v-for="(tag, index) in tags" :key="index" size="small" effect="plain" class="tag-item">
              {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.author-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  .main-info {
    display: flex;
    gap: 16px;
  }

  .meta {
    flex: 1;

    .name-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 4px;
    }

    .name {
      margin: 0;
      font-size: 1.1em;
      color: var(--el-text-color-primary);
    }

    .sub-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--el-text-color-secondary);
      font-size: 0.9em;

      .tags {
        display: flex;
        gap: 6px;

        .tag-item {
          border-radius: 4px;
          padding: 0 8px;
        }
      }
    }
  }

  .follow-btn {
    padding: 4px 12px;
    font-size: 0.85em;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;

    .sub-meta {
      flex-wrap: wrap;

      .publish-time {
        width: 100%;
      }
    }
  }
}
</style>
