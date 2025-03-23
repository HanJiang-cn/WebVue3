<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getPostListApi, deletePostApi } from '@/api/post'
import { usePagination } from '@/hooks/usePagination'
import moment from 'moment'

const router = useRouter()
// 数据相关
const loading = ref(false)
const postList = ref([])
// 筛选条件
const filter = reactive({
  search: '',
  sort: 'newest'
})

// 搜索帖子
const fetchPosts = () => {
  loadData()
}
// 获取帖子列表
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getPostListApi({ ...pageInfo, searchText: filter.search })
  loading.value = false
  postList.value = records
  setTotals(Number(total))
  postList.value = records.map((records) => ({
    ...records,
  }))
}

// 编辑帖子
const handleEdit = (id) => {
  window.open(router.resolve({
    path: '/post/edit',
    query: {
      id: id
    }
  }).href, '_self')
}
// 删除帖子
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deletePostApi({ id: id })
    ElMessage.success('删除成功')
    fetchPosts()
  } catch (error) {
    // 取消删除不处理
  }
}

onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
</script>

<template>
  <div class="my-posts-container">
    <!-- 标题 -->
    <div class="page-title">
      <h1>我的帖子</h1>
      <el-button type="primary" @click="$router.push('/post/create')">
        <el-icon>
          <Plus />
        </el-icon>
        发布新帖
      </el-button>
    </div>
    <!-- 筛选工具栏 -->
    <div class="filter-bar">
      <el-input v-model="filter.search" placeholder="搜索帖子标题..." clearable style="width: 300px" @change="fetchPosts">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>

      <el-select v-model="filter.sort" placeholder="排序方式" style="width: 150px; margin-left: 15px" @change="fetchPosts">
        <el-option label="最新发布" value="newest" />
        <el-option label="最近更新" value="updated" />
      </el-select>
    </div>

    <!-- 帖子列表 -->
    <el-table :data="postList" v-loading="loading" style="width: 100%"
      :header-cell-style="{ background: '#409EFF', color: 'white' }">
      <el-table-column prop="title" label="标题" min-width="250">
        <template #default="{ row }">
          <span class="title-text">{{ row.title }}</span>
          <el-tag v-if="row.isTop" effect="dark" type="info" size="small" style="margin-left: 8px">
            置顶
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="category" label="分类" width="120" />

      <el-table-column label="时间" width="180">
        <template #default="{ row }">
          <div class="time-cell">
            <div>发布：{{ moment(row.createTime).format('YYYY-MM-DD HH:mm') }}</div>
            <div v-if="row.updateTime">更新：{{ moment(row.updateTime).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="viewCount" label="阅读量" width="100" align="center" />

      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row.id)">
            编辑
          </el-button>

          <el-button type="danger" link @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination class="mr mt" v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals" background
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@primary-color: #409EFF;
@hover-color: #66b1ff;
@background-start: #f8fafe;
@background-end: #e3f2fd;
@text-color: #2c3e50;
@subtext-color: #7f8c8d;
@border-color: #ebeef5;
@shadow-color: rgba(0, 0, 0, 0.04);

.my-posts-container {
  padding: 24px;

  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      color: @text-color;
      font-size: 24px;
    }

    .el-button {
      padding: 8px 16px;
      font-size: 14px;
      background: @primary-color;
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background 0.3s ease;

      &:hover {
        background: @hover-color;
      }

      .el-icon {
        font-size: 16px;
        margin-right: 8px;
      }
    }
  }

  .filter-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px @shadow-color;
  }

  .title-text {
    color: @text-color;
    font-weight: 500;

    &:hover {
      color: @primary-color;
      cursor: pointer;
    }
  }

  .time-cell {
    font-size: 12px;
    color: @subtext-color;
    line-height: 1.5;
  }

  // 表格样式
  :deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px @shadow-color;

    th.el-table__cell {
      background: @primary-color !important;
      color: #fff;
    }

    tr:hover td {
      background-color: lighten(@primary-color, 38%) !important;
    }
  }

  // 分页样式
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px @shadow-color;
  }
}

// 全局样式覆盖
.el-button {
  &--primary {
    color: @primary-color;

    &:hover {
      color: @hover-color;
    }
  }
}

.el-tag {
  &--info {
    background-color: lighten(@primary-color, 33%);
    border-color: lighten(@primary-color, 20%);
    color: @primary-color;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .my-posts-container {
    padding: 12px;

    .filter-bar {
      flex-direction: column;
      gap: 10px;

      .el-input,
      .el-select {
        width: 100% !important;
        margin-left: 0 !important;
      }
    }

    :deep(.el-table) {

      td,
      th {
        padding: 8px 0;
      }

      .cell {
        font-size: 14px;
      }
    }
  }
}
</style>
