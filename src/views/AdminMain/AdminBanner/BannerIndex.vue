<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getPostList, getUserInfo } from '@/api/admin'
import { deletePostApi } from '@/api/post'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'

const router = useRouter()
const loading = ref(false)

// 查询条件
const searchParams = ref({
  title: '',
  id: '',
  content: '',
})
// 重置查询条件
const handleReset = () => {
  searchParams.value = {
    title: '',
    id: '',
    content: '',
  }
  loadData()
}
// 获取帖子列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getPostList({ ...pageInfo, title: searchParams.value.title, id: searchParams.value.id, content: searchParams.value.content })

  // 并行请求用户信息
  const userRequests = records.map(record =>
    getUserInfo({ id: record.userId })
      .then(res => res.code === 0 ? res.data.userName : '未知用户')
      .catch(() => '获取失败')
  )
  const userNames = await Promise.all(userRequests)

  // 合并数据时直接添加用户名
  dataList.value = records.map((record, index) => ({
    ...record,
    userName: userNames[index]
  }))

  setTotals(Number(total))
  loading.value = false
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

// 编辑
const handleEdit = (id) => {
  window.open(router.resolve({
    path: '/post/edit',
    query: {
      id: id
    }
  }).href, '_blank')
}

// 删除
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deletePostApi({ id: id })
    ElNotification({
      title: '成功',
      message: '删除成功',
      type: 'success'
    })
    loadData()
  } catch (error) {
    // 取消删除不处理
  }
}

</script>

<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input placeholder="请输入 Banner ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="帖子ID" width="180" />
      <el-table-column prop="title" label="帖子标题" />
      <el-table-column prop="userName" label="发表用户" />
      <el-table-column prop="userRole" label="帖子状态">
        <template #default="{ row }">
          <el-tag :type="row ? 'success' : 'danger'">
            {{ row ? '已发布' : '违规' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="帖子数据" width="100">
        <template #default="{ row }">
          <span style="font-size: 12px;">阅读：{{ row.readCount }}</span>
          <br />
          <span style="font-size: 12px;">点赞：{{ row.likeCount }}</span>
          <br />
          <span style="font-size: 12px;">评论：{{ row.commentCount }}</span>
          <br />
          <span style="font-size: 12px;">收藏：{{ row.collectCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="190">
        <template #default="{ row }">
          <span style="font-size: 12px;">发布：{{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <br />
          <span style="font-size: 12px;">更新：{{ moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fr mt mb">
      <el-pagination v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals" background
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-card>
</template>
