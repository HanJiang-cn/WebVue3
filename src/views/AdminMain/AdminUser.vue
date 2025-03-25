<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getUserList, deleteUser } from '@/api/admin'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import UserInfor from '@/components/AdminMain/UserInfor.vue'
import moment from 'moment'

const loading = ref(false)
const userInforVisible = ref(false)
const userId = ref('')

// 查询条件
const searchParams = ref({
  name: '',
  id: '',
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
  const { data: { records, total }, } = await getUserList({ ...pageInfo, userName: searchParams.value.name })
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

// 编辑用户
const handleEdit = (id) => {
  userInforVisible.value = true
  userId.value = id
}
// 删除用户
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
        <el-input placeholder="请输入用户昵称" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入用户ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col :span="6">
        <el-button class="fr" type="primary" @click="handleEdit(0)">新增用户</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="用户ID" width="180" />
      <el-table-column prop="userAccount" label="用户名称" />
      <el-table-column prop="userName" label="用户昵称" />
      <el-table-column prop="userRole" label="用户角色">
        <template #default="{ row }">
          <el-tag :type="row.userRole === 'admin' ? 'success' : 'info'">
            {{ row.userRole === 'user' ? '普通用户' : '管理员' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="180">
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
  <UserInfor :userInforVisible="userInforVisible" :id="userId" @close="userInforVisible = false" @loadData="loadData" />
</template>
