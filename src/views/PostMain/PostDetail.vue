<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification, ElMessageBox } from 'element-plus'
// import { getMyPostsApi, deletePostApi } from '@/api/post'

// 帖子列表数据
const posts = ref([])
const loading = ref(false)
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 筛选条件
const filters = reactive({
  category: '',
  status: ''
})

// 获取帖子列表
const fetchPosts = async () => {
  loading.value = true
  try {
    const res = await getMyPostsApi({
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters
    })

    if (res.code === 0) {
      posts.value = res.data.list
      pagination.total = res.data.total
    }
  } finally {
    loading.value = false
  }
}

// 删除帖子
const handleDelete = async (postId) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    const res = await deletePostApi(postId)
    if (res.code === 0) {
      ElNotification.success({ title: '删除成功' })
      fetchPosts()
    }
  } catch (error) {
    console.error('删除失败:', error)
  }
}

// 分页变化
const handlePageChange = (newPage) => {
  pagination.current = newPage
  fetchPosts()
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="post-container">
    <!-- 头部 -->
    <div class="post-header">
      <h1 class="post-title">我的帖子</h1>
      <div class="post-tips">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <span>共发布 {{ pagination.total }} 篇内容</span>
      </div>
    </div>

    <!-- 筛选条件 -->
    <el-row :gutter="24" class="filter-section">
      <el-col :span="8">
        <el-select v-model="filters.category" placeholder="按分类筛选" clearable>
          <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filters.status" placeholder="按状态筛选" clearable>
          <el-option label="已发布" value="published" />
          <el-option label="草稿" value="draft" />
        </el-select>
      </el-col>
    </el-row>

    <!-- 帖子表格 -->
    <el-table :data="posts" v-loading="loading" class="post-table">
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="category" label="分类" width="120">
        <template #default="{ row }">
          {{categories.find(c => c.value === row.category)?.label || '-'}}
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签" width="180">
        <template #default="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" size="small" class="tag-margin">
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="180" />
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="$router.push(`/edit-post/${row.id}`)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination class="pagination" background layout="prev, pager, next" :current-page="pagination.current"
      :page-size="pagination.pageSize" :total="pagination.total" @current-change="handlePageChange" />
  </div>
</template>

<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  .post-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--el-border-color-light);

    .post-title {
      font-size: 24px;
      color: var(--el-text-color-primary);
      margin-bottom: 8px;
    }

    .post-tips {
      display: flex;
      align-items: center;
      color: var(--el-text-color-secondary);
      font-size: 14px;

      .el-icon {
        margin-right: 8px;
        color: var(--el-color-info);
      }
    }
  }

  .filter-section {
    margin-bottom: 24px;
  }

  .post-table {
    margin-top: 24px;

    .tag-margin {
      margin: 2px;
    }
  }

  .pagination {
    margin-top: 24px;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin: 12px;

    .post-table {
      overflow-x: auto;
    }
  }
}
</style>
