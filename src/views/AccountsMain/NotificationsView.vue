<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'

// 定义当前激活的标签页
const activeTab = ref('notice')

// 通知数据
const notices = ref([
  {
    id: 1,
    title: '系统维护通知',
    content: '系统将于2023-12-01 00:00至06:00进行维护升级，期间将无法访问。',
    time: '2023-11-28 10:30',
    read: false
  },
  {
    id: 2,
    title: '新功能上线',
    content: '新增数据分析模块，欢迎体验并提供宝贵意见。',
    time: '2023-11-25 14:15',
    read: true
  },
  {
    id: 3,
    title: '安全提醒',
    content: '请及时修改您的密码以确保账户安全。',
    time: '2023-11-20 09:00',
    read: false
  }
])

// 动态数据
const activities = ref([
  {
    id: 1,
    type: 'update',
    content: '用户张三更新了项目文档',
    time: '2023-11-28 15:20'
  },
  {
    id: 2,
    type: 'comment',
    content: '李四评论了你的分享: "这个想法很有创意！"',
    time: '2023-11-27 11:05'
  },
  {
    id: 3,
    type: 'like',
    content: '王五等10人点赞了你的动态',
    time: '2023-11-26 18:30'
  }
])

// 标记通知为已读
const markAsRead = (id) => {
  const notice = notices.value.find(item => item.id === id)
  if (notice) {
    notice.read = true
  }
}

// 标记所有通知为已读
const markAllAsRead = () => {
  notices.value.forEach(notice => {
    notice.read = true
  })
}
</script>

<template>
  <div class="notification-container">
    <el-card class="notification-card">
      <template #header>
        <div class="card-header">
          <h2>消息中心</h2>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="card" class="notification-tabs">
        <!-- 通知标签页 -->
        <el-tab-pane label="通知" name="notice">
          <div class="tab-header">
            <span class="unread-count">
              未读通知: {{notices.filter(n => !n.read).length}} 条
            </span>
            <el-button type="text" @click="markAllAsRead" :disabled="notices.every(n => n.read)">
              全部标记为已读
            </el-button>
          </div>

          <el-scrollbar height="400px">
            <div v-for="notice in notices" :key="notice.id" class="notice-item" :class="{ 'unread': !notice.read }"
              @click="markAsRead(notice.id)">
              <div class="notice-content">
                <h3>{{ notice.title }}</h3>
                <p>{{ notice.content }}</p>
                <div class="notice-time">{{ notice.time }}</div>
              </div>
              <el-tag v-if="!notice.read" type="danger" size="small">未读</el-tag>
            </div>

            <el-empty v-if="notices.length === 0" description="暂无通知" />
          </el-scrollbar>
        </el-tab-pane>

        <!-- 动态标签页 -->
        <el-tab-pane label="动态" name="activity">
          <el-scrollbar height="400px">
            <div v-for="activity in activities" :key="activity.id" class="activity-item">
              <div class="activity-icon">
                <el-icon v-if="activity.type === 'update'" color="#409EFF">
                  <Edit />
                </el-icon>
                <el-icon v-if="activity.type === 'comment'" color="#67C23A">
                  <ChatLineRound />
                </el-icon>
                <el-icon v-if="activity.type === 'like'" color="#F56C6C">
                  <Star />
                </el-icon>
              </div>
              <div class="activity-content">
                <p>{{ activity.content }}</p>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>

            <el-empty v-if="activities.length === 0" description="暂无动态" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.notification-container {
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;

  .notification-card {
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin: 5px;
        color: #303133;
      }
    }

    .notification-tabs {
      :deep(.el-tabs__header) {
        border-bottom: none;
        transition: border-color 0.3s ease;

        .el-tabs__nav {
          border: none;
          gap: 8px; // 使用gap控制间距
          margin-bottom: -1px; // 对齐底部边框

          .el-tabs__item {
            position: relative;
            padding: 15px 20px;
            margin-right: 10px;
            border: none !important;
            font-size: 16px;
            color: #64748b; // 现代中性色
            border-radius: 8px; // 更柔和的圆角
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

            // 悬停状态
            &:hover {
              color: #3b82f6; // 品牌蓝色
              background: rgba(59, 130, 246, 0.05);
              transform: translateY(-2px);
            }

            // 激活状态
            &.is-active {
              color: #3b82f6;
              background: rgba(59, 130, 246, 0.1);

              // 底部指示条
              &::after {
                content: '';
                position: absolute;
                left: 20px;
                right: 20px;
                bottom: -1px;
                height: 2px;
                background: #3b82f6;
                border-radius: 2px;
              }
            }
          }
        }
      }

      .tab-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-bottom: 1px solid #e5e7eb; // 更浅的分割线

        .unread-count {
          font-size: 13px;
          color: #EF4444;
          font-weight: 500;
        }

        .el-button {
          font-weight: 500;
          padding: 4px 8px;

          &:hover {
            color: #3B82F6;
            background: rgba(#3B82F6, 0.06);
          }
        }
      }

      .notice-item {
        padding: 20px 24px;
        border-radius: 8px;
        margin: 8px 16px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background: rgba(#3B82F6, 0.04);
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        &.unread {
          background: rgba(#3B82F6, 0.04);
          border-left: 3px solid #3B82F6;
        }

        .notice-content {
          h3 {
            font-size: 15px;
            margin-bottom: 6px;
            color: #1F2937;
          }

          p {
            line-height: 1.6;
            color: #6B7280;
          }

          .notice-time {
            font-size: 12px;
            color: #6B7280;
            opacity: 0.8;
          }
        }

        .el-tag {
          align-self: flex-start;
          border-radius: 6px;
          font-size: 12px;
          padding: 0 8px;
        }
      }

      // 动态样式优化
      .activity-item {
        padding: 16px 24px;
        margin: 8px 16px;
        border-radius: 8px;
        background: white;
        transition: all 0.2s ease;

        &:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          margin-bottom: 10px;
          align-items: center;
          justify-content: center;
          background: rgba(#3B82F6, 0.1);

          .el-icon {
            font-size: 18px;
          }

          &[data-type="update"] {
            background: rgba(#3B82F6, 0.1);
          }

          &[data-type="comment"] {
            background: rgba(#10B981, 0.1);
          }

          &[data-type="like"] {
            background: rgba(#EF4444, 0.1);
          }
        }

        .activity-content {
          p {
            color: #1F2937;
            font-weight: 500;
          }

          .activity-time {
            font-size: 12px;
            color: #6B7280;
            margin-top: 4px;
          }
        }
      }

      // 空状态样式
      .el-empty {
        padding: 48px 0;

        :deep(.el-empty__description) {
          color: #6B7280;
        }
      }
    }
  }
}
</style>
