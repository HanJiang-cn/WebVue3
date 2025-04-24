<!-- eslint-disable @typescript-eslint/no-unused-vars -->
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
  title: '',
})

// 搜索帖子
const fetchPosts = () => {
  loadData()
}
// 获取帖子列表
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getPostListApi({ ...pageInfo, title: filter.title })
  loading.value = false
  postList.value = records
  setTotals(Number(total))
  postList.value = records.map((records) => ({
    ...records,
  }))
}

// 浏览帖子
const handleBrowse = (id) => {
  window.open(router.resolve({
    path: '/post',
    query: {
      id: id
    }
  }).href, '_blank')
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
      <el-input v-model="filter.title" placeholder="搜索帖子标题..." clearable style="width: 300px" @change="fetchPosts">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 帖子列表 -->
    <el-table :data="postList" v-loading="loading" style="width: 100%"
      :header-cell-style="{ background: '#409EFF', color: 'white' }">
      <el-table-column prop="title" label="标题" min-width="250">
        <template #default="{ row }">
          <span class="title-text" @click="handleBrowse(row.id)">{{ row.title }}</span>
          <el-tag v-if="row.isTop" effect="dark" type="info" size="small" style="margin-left: 8px">
            置顶
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === 0" type="success" size="small">已发布</el-tag>
          <el-tag v-if="row.status === 1" type="warning" size="small">草稿</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="category" label="分类" width="120">
        <template #default="{ row }">
          <el-tag type="info" size="small">{{ row.post_classes }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="tags" label="标签" width="150">
        <template #default="{ row }">
          <span v-for="(tag, index) in row.tagList" :key="index" class="tag-item">
            <el-tag type="success" size="small" style="margin-right: 5px;">{{ tag }}</el-tag>
          </span>
        </template>
      </el-table-column>

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
.my-posts-container {
  padding: 24px;

  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.08);

    h1 {
      color: darken(#409EFF, 10%);
      font-size: 26px;
      font-weight: 600;
      margin: 0;
      position: relative;
      padding-left: 36px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 28px;
        height: 28px;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23409EFF" d="M3 3h18v2H3V3m0 4h12v2H3V7m0 4h18v2H3v-2m0 4h12v2H3v-2m0 4h18v2H3v-2"/></svg>');
      }
    }

    .el-button {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  .filter-bar {
    margin-bottom: 24px;
    padding: 16px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.08);

    .el-input {
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        padding: 0 16px;
        transition: box-shadow 0.3s;

        &:hover {
          box-shadow: 0 0 0 2px fade(#409EFF, 20%);
        }
      }
    }

    .el-select {
      margin-left: 12px;

      :deep(.el-input__wrapper) {
        border-radius: 8px;
      }
    }
  }

  .title-text {
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      color: #409EFF;

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: #409EFF;
      transition: width 0.3s;
    }
  }

  :deep(.el-table) {
    border-collapse: separate;
    border-spacing: 0 8px;
    background: transparent;

    th.el-table__cell {
      font-weight: 600;
      letter-spacing: 0.5px;

      &:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }

    tr {
      transition: transform 0.3s, box-shadow 0.3s;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    padding: 16px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(64, 158, 255, 0.08);

    :deep(.btn-prev),
    :deep(.btn-next),
    :deep(.el-pager li) {
      border-radius: 8px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(64, 158, 255, 0.08);
      }
    }
  }
}

@media (max-width: 768px) {
  .my-posts-container {
    padding: 16px;

    .page-title {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;

      h1 {
        font-size: 22px;
        padding-left: 28px;

        &::before {
          width: 24px;
          height: 24px;
        }
      }
    }

    :deep(.el-table) {

      th,
      td {
        padding: 12px 0;
      }
    }
  }
}
</style>
