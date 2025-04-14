<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import {getCompetitionAdminListApi,isApprovedCompetition } from '@/api/competition'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'


const router = useRouter()
const loading = ref(false)

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
// 获取竞赛列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getCompetitionAdminListApi({ ...pageInfo, name: searchParams.value.name})
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

// 编辑
const handleEdit = () =>{
  window.open(router.resolve({
  path: '/competition/create',
  }).href, '_blank')
}

// // 删除逻辑
// const handleDelete = async (competitionId) => {
//   try {
//     await ElMessageBox.confirm('确定要删除该竞赛吗？', '提示', {  // 修改提示文案为"竞赛"
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning'
//     })
//     // 使用 competitionId 作为参数名调用接口
//     await deleteCompetition({ competitionId })
//     ElNotification({
//       title: '成功',
//       message: '删除成功',
//       type: 'success'
//     })
//     loadData()
//   } catch (error) {
//     // 增加错误处理（可选）
//     if (error !== 'cancel') { // 排除取消操作的情况
//       ElNotification({
//         title: '错误',
//         message: '删除失败',
//         type: 'error'
//       })
//     }
//   }
// }
// 审核逻辑
const handleApproved = async (competitionId) => {
  try {
    await ElMessageBox.confirm('确定要审核该竞赛吗？', '提示', {  // 修改提示文案为"竞赛"
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    // 使用 competitionId 作为参数名调用接口
    await isApprovedCompetition({ competitionId })
    ElNotification({
      title: '成功',
      message: '审核成功',
      type:'success'
    })
    loadData()
  }
  catch (error) {
    // 增加错误处理（可选）
    if (error!== 'cancel') { // 排除取消操作的情况
      ElNotification({
        title: '错误',
        message: '审核失败',
        type: 'error'
      })
    }
  }
}
</script>

<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input placeholder="请输入竞赛昵称" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入竞赛ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="竞赛ID" width="180" />
      <el-table-column prop="name" label="竞赛名称" />
      <el-table-column prop="organizer" label="主办方" />
      <el-table-column prop="type" label="竞赛类型">
        <template #default="{ row }">
          <el-tag :type="row ? '0' : '1'">
            {{ row ? '团队赛' : '个人赛' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="时间" width="190">
        <template #default="{ row }">
          <span style="font-size: 12px;">发布：{{ moment(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <br />
          <span style="font-size: 12px;">更新：{{ moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleApproved(row.id)">审核</el-button>
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

<style lang="less" scoped></style>
