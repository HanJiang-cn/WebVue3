<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { bannerCommunity, deleteBanner, editBanner, addBanner } from '@/api/admin'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import moment from 'moment'

const loading = ref(false)
const addBannerVisible = ref(false)

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
// 获取Banner列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await bannerCommunity({ ...pageInfo })
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

// 添加Banner
const form = ref({
  banner: '',
})
const handleSubmit = async () => {
  const res = await addBanner(form.value)
  if (res.code === 0) {
    ElNotification({
      title: '成功',
      message: 'Banner 添加成功',
      type: 'success',
    })
    addBannerVisible.value = false
    loadData()
  }
}

// 编辑 Banner

// 删除 Banner
const handleDelete = (id) => {
  ElMessageBox.confirm('确认删除该 Banner 吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteBanner({ id: id })
    if (res.code === 0) {
      ElNotification({
        title: '成功',
        message: 'Banner 删除成功',
        type: 'success',
      })
      loadData()
    }
  })
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
      <el-col :span="12">
        <el-button class="fr" type="primary" @click="addBannerVisible = true">添加 Banner</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="Banner ID" width="100" />
      <el-table-column prop="userAccount" label="Banner 预览">
        <template #default="{ row }">
          <el-image :src="row.banner" alt="Banner 预览" width="100" height="100" preview-src-list
            show-progress></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="banner" label="Banner Url" />
      <el-table-column label="创建时间" width="180">
        <template #default="{ row }">
          {{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="warning" size="small" @click="handlePreview(row.id)">推荐</el-button>
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
  <!-- 添加Banner -->
  <el-dialog v-model="addBannerVisible" title="添加Banner" width="800" @close="addBannerVisible = false">
    <el-from :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="Banner Url" prop="banner">
        <el-input v-model="form.banner" placeholder="请输入 Banner Url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-from>
  </el-dialog>
</template>
