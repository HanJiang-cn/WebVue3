<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { bannerCommunity, deleteUser } from '@/api/admin'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'

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
    userRole: '',
  }
  loadData()
}
// 获取用户列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await bannerCommunity({ ...pageInfo, userName: searchParams.value.name, id: searchParams.value.id, userRole: searchParams.value.userRole })
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
      <el-table-column prop="id" label="Banner ID" width="180" />
      <el-table-column prop="userAccount" label="Banner 预览">
        <template #default="{ row }">
          <el-image :src="row.userAccount" alt="Banner 预览" width="100" height="100"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="Banner Url" />
      <el-table-column label="创建时间" width="180">
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
