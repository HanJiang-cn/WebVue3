<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getFavourSolutionListApi, favourSolutionApi } from '@/api/solution'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification } from 'element-plus'
import moment from 'moment'

// 收藏数据
const loading = ref(false)
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getFavourSolutionListApi({ ...pageInfo, title: title.value })
  loading.value = false
  collections.value = records
  setTotals(Number(total))
  collections.value = records.map((records) => ({
    ...records,
    time: moment(records.createTime).format('YYYY-MM-DD HH:mm')
  }))
  // 将页面的滚动条位置重置为顶部
  window.scrollTo(0, 0)
}
onMounted(() => {
  loadData()
})

const { totals, pageInfo, handleCurrentChange, setTotals } = usePagination(loadData)

// 收藏列表
const collections = ref([])
const title = ref('')

// 取消收藏
const handleCancelFavour = async (id) => {
  try {
    const res = await favourSolutionApi({ postId: id })
    if (res.code === 0) {
      ElNotification({
        title: '取消收藏成功',
        message: '文章已从收藏列表中移除',
        type: 'success'
      })
    }
    loadData()
  } catch (error) {
    ElNotification({
      title: '取消收藏失败',
      message: error.message || '请检查网络连接后重试',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="collection-header">
    <h2>题解</h2>
    <el-input v-model="title" placeholder="搜索收藏内容" class="search-input" suffix-icon="Search" @change="loadData" />
  </div>

  <el-divider />

  <div class="collection-list" v-loading="loading">
    <div v-if="collections.length === 0" class="empty-tip">
      <el-empty :image-size="200" />
    </div>
    <el-card v-for="item in collections" :key="item.id" class="collection-item" shadow="hover">
      <div class="item-content">
        <h3>{{ item.title }}</h3>
        <div class="item-meta">
          <span v-if="item.type" class="item-type">{{ item.type }}</span>
          <span class="item-time">{{ item.time }}</span>
        </div>
      </div>
      <div class="item-actions">
        <el-button type="danger" size="small" icon="Delete" @click="handleCancelFavour(item.id)">取消收藏</el-button>
      </div>
    </el-card>
  </div>

  <el-pagination class="pagination" v-model:current-page="pageInfo.current" layout="prev, pager, next, total"
    :total="totals" background @current-change="handleCurrentChange" />
</template>

<style lang="less" scoped>
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
</style>
