<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getPostList } from '@/api/admin'
import { deletePostApi } from '@/api/post'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'

const loading = ref(false)

// 查询条件
const searchParams = ref({
  name: '',
  id: '',
  content: '',
})
// 重置查询条件
const handleReset = () => {
  searchParams.value = {
    name: '',
    id: '',
    content: '',
  }
  loadData()
}
// 获取用户列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await getPostList({ ...pageInfo, userName: searchParams.value.name })
  loading.value = false
  dataList.value = records
  setTotals(Number(total))
  dataList.value = records.map((records) => ({
    ...records,
  }))
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm('确认删除该用户吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteUser({ id: id })
    if (res.code === 0) {
      ElNotification({
        title: '成功',
        message: '用户删除成功',
        type: 'success',
      })
    }
    loadData()
  })
}

</script>

<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input placeholder="请输入标题" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchParams.content"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入帖子ID" v-model="searchParams.id"></el-input>
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
      <el-table-column label="时间" width="190">
        <template #default="{ row }">
          <span style="font-size: 12px;">发布：{{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <br />
          <span style="font-size: 12px;">更新：{{ moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
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
