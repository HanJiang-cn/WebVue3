<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { updateCompetition,deleteCompetition,getCompetition } from '@/api/admin'
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
})
// 重置查询条件
const handleReset = () => {
  searchParams.value = {
    title: '',
    id: '',
  }
  loadData()
}
// 获取竞赛列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getCompetition({ ...pageInfo, title: searchParams.value.title})
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

// 删除
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteCompetition({ id: id })
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
        <el-input placeholder="请输入竞赛昵称" v-model="searchParams.name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入竞赛ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col :span="3">
        <el-button class="fr" type="primary" @click="handleEdit">新增竞赛</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="竞赛ID" width="180" />
      <el-table-column prop="name" label="竞赛名称" />
      <el-table-column prop="userName" label="发表竞赛" />
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

<style lang="less" scoped></style>
