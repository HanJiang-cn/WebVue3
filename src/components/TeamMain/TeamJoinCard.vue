<!-- eslint-disable vue/block-lang -->
<script setup>
import { defineProps } from 'vue'

defineProps({
  team: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="team-card">
    <div class="content">
      <div class="meta">
        <el-tag size="small">{{ team.tag }}</el-tag>
        <span class="members">
          <el-icon>
            <User />
          </el-icon>
          {{ team.members.current }}/{{ team.members.max }}
        </span>
      </div>

      <h3 class="title">{{ team.name }}</h3>

      <p class="description">{{ team.description }}</p>

      <div class="footer">
        <time>{{ formatDate(team.createTime) }}</time>
        <el-button size="small" :type="team.joined ? 'success' : 'primary'" @click.stop="$emit('join', team.id)"
          :disabled="team.joined">
          {{ team.joined ? '已加入' : '加入队伍' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.team-card {
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);

    .title {
      color: var(--el-color-primary);
    }
  }

  .content {
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    :deep(.el-tag) {
      background-color: rgba(var(--el-color-primary-rgb), 0.1);
      border-color: rgba(var(--el-color-primary-rgb), 0.2);
      color: var(--el-color-primary);
      font-size: 12px;
    }

    .members {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--el-text-color-secondary);

      .el-icon {
        font-size: 14px;
      }
    }
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 8px 0;
    transition: color 0.3s;
  }

  .description {
    flex: 1;
    font-size: 13px;
    color: var(--el-text-color-secondary);
    line-height: 1.5;
    margin: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--el-border-color-light);

    time {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }

    :deep(.el-button) {
      padding: 8px 16px;
      font-size: 12px;
      transition: all 0.3s;

      &[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &:not([disabled]):hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(var(--el-color-primary-rgb), 0.3);
      }

      &.is-success {
        background-color: var(--el-color-success-light-9);
        border-color: var(--el-color-success-light-7);
        color: var(--el-color-success);
      }
    }
  }
}
</style>
