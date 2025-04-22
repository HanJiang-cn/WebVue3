<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getProblemList } from '@/api/admin'
import { deleteApi } from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'
import router from '@/router'

const loading = ref(false)
const userInforVisible = ref(false)
const userId = ref('')

// 查询条件
const searchParams = ref({
  name: '',
  id: '',
  userRole: '',
})
// 重置查询条件
const handleReset = () => {
  searchParams.value = {
    name: '',
    id: '',
  }
  loadData()
}
// 获取用户列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await getProblemList({ ...pageInfo, title: searchParams.value.name, id: searchParams.value.id })
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

// 新增题目
const handleSubmit = () => {
  router.push({
    path: '/question/submit',
  })
}
// 编辑题目
const handleEdit = (id) => {
  router.push({
    path: '/question/edit',
    query: { id: id }
  })
}
// 查看题目
const handleShow = (id) => {
  router.push({
    path: '/problems/question',
    query: { id: id }
  })
}
// 删除用户
const handleDelete = (id) => {
  ElMessageBox.confirm('确认删除该题目吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteApi({ id: id })
    if (res.code === 0) {
      ElNotification({
        title: '成功',
        message: '题目删除成功',
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
        <el-input placeholder="请输入题目标题" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入题目ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col :span="7">
        <el-button class="fr" type="primary" @click="handleSubmit">新增题目</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="题目ID" width="180" />
      <el-table-column prop="title" label="题目标题">
        <template #default="{ row }">
          <span class="title-text" @click="handleShow(row.id)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布人">
        <template #default="{ row }">
          {{ row.userId }}
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="难度">
        <template #default="{ row }">
          <el-tag :type="row.difficulty === '简单' ? 'success' : row.difficulty === '适中' ? 'warning' : 'danger'">
            {{ row.difficulty === '简单'?'简单' : row.difficulty === '适中'? '适中' : '困难' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="180">
        <template #default="{ row }">
          {{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
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

<style lang="less" scoped>
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
</style>
