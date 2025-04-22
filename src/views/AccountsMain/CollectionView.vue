<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 当前选中的菜单项
const activeMenu = ref('all')
// 获取当前路由的路径
const currentPath = router.currentRoute.value.path

// 菜单项列表
const menuItems = [
  { key: 'all', label: '全部收藏' },
  { key: 'post', label: '帖子' },
  { key: 'solution', label: '题解' }
]

// 初始化菜单选中项
const clickedMenu = () => {
  if (currentPath === '/accounts/collection/all') {
    activeMenu.value = 'all'
  } else if (currentPath === '/accounts/collection/post') {
    activeMenu.value = 'post'
  }
}

// 切换菜单
const handleMenuChange = (key) => {
  activeMenu.value = key
  router.push(`/accounts/collection/${key}`)
}

onMounted(() => {
  clickedMenu()
})
</script>

<template>
  <div class="collection-container">
    <!-- 左侧菜单 -->
    <div class="menu-side">
      <el-menu :default-active="activeMenu" class="blue-menu" @select="handleMenuChange">
        <el-menu-item v-for="item in menuItems" :key="item.key" :index="item.key">
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧内容 -->
    <div class="content-side">
      <!-- <div class="collection-header">
        <h2>{{menuItems.find(item => item.key === activeMenu).label}}</h2>
        <el-input placeholder="搜索收藏内容" class="search-input" suffix-icon="Search" />
      </div>

      <el-divider /> -->

      <router-view />

      <!-- <div class="collection-list">
        <el-card v-for="item in currentCollections" :key="item.id" class="collection-item" shadow="hover">
          <div class="item-content">
            <h3>{{ item.title }}</h3>
            <div class="item-meta">
              <span v-if="item.type" class="item-type">{{ item.type }}</span>
              <span class="item-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="item-actions">
            <el-button type="danger" size="small" icon="Delete">取消收藏</el-button>
          </div>
        </el-card>
      </div>

      <el-pagination class="pagination" v-model:current-page="pageInfo.current" layout="prev, pager, next, total"
        :total="totals" background @current-change="handleCurrentChange" /> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.collection-container {
  display: flex;
  min-height: 100vh;

  .menu-side {
    width: 200px;
    background: transparent;
    border: none;
    box-shadow: none;

    :deep(.blue-menu) {
      background: transparent;
      border-right: none;

      .el-menu-item {
        color: #34495e;
        height: 50px;
        margin: 3px 0;
        transition: all 0.3s;
        border-radius: 6px;
        backdrop-filter: blur(2px);

        &:hover {
          background: rgba(64, 158, 255, 0.1) !important;
          color: #409EFF;
          transform: translateX(5px);
        }

        &.is-active {
          background: rgba(64, 158, 255, 0.2) !important;
          color: #409EFF !important;
          font-weight: 500;
        }

        .el-icon {
          margin-right: 8px;
          font-size: 1.1em;
        }
      }
    }
  }

  .content-side {
    flex: 1;
    padding: 24px 32px;

    .collection-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #303133;
        position: relative;
        padding-left: 12px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: #409eff;
          border-radius: 2px;
        }
      }

      .search-input {
        width: 280px;

        :deep(.el-input__wrapper) {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;

          &:hover {
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          }
        }
      }
    }

    .el-divider {
      margin: 16px 0;
      background-color: rgba(#e4e7ed, 0.4);
    }

    .collection-list {
      display: grid;
      gap: 16px;

      .collection-item {
        transition: all 0.25s ease;
        border-radius: 12px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(#e4e7ed, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.08);
        }

        :deep(.el-card__body) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
        }

        .item-content {
          flex: 1;
          min-width: 0;

          h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 500;
            color: #303133;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .item-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 12px;

            .item-type {
              display: inline-flex;
              align-items: center;
              padding: 4px 8px;
              background: rgba(#409eff, 0.1);
              color: #409eff;
              border-radius: 4px;
              font-weight: 500;
              letter-spacing: 0.5px;
            }

            .item-time {
              color: #606266;
              font-size: 12px;
            }
          }
        }

        .item-actions {
          flex-shrink: 0;
          margin-left: 20px;

          :deep(.el-button) {
            padding: 8px 12px;
            border-radius: 6px;
            font-weight: 500;

            .el-icon {
              margin-right: 6px;
            }
          }
        }
      }
    }

    .pagination {
      margin-top: 32px;
      display: flex;
      justify-content: center;

      :deep(.el-pagination.is-background .btn-prev),
      :deep(.el-pagination.is-background .btn-next),
      :deep(.el-pagination.is-background .el-pager li) {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(#e4e7ed, 0.4);
        border-radius: 8px;
        margin: 0 4px;
        transition: all 0.2s ease;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        &.is-active {
          border-color: #409eff;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .collection-container {
    flex-direction: column;

    .menu-side {
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .collection-menu {
        display: flex;
        overflow-x: auto;
        padding: 8px;

        :deep(.el-menu-item) {
          flex-shrink: 0;
          margin: 4px;
        }
      }
    }

    .content-side {
      padding: 20px;

      .collection-header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;

        .search-input {
          width: 100%;
        }
      }
    }
  }
}
</style>
