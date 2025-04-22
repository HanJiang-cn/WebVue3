<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { solutionList, solutionDelete } from '@/api/admin'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import moment from 'moment'
import PreviewOnly from '@/components/PreviewOnly.vue'

const router = useRouter()
const loading = ref(false)
const previewVisible = ref(false)
const previewContent = ref('')

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
// 获取列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await solutionList({ ...pageInfo, ...searchParams.value })
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

// 新增
const handleAdd = () => {
  router.push({ path: '/post/solutioncreate' })
}

// 编辑
const handleEdit = (id) => {
  router.push({ path: '/post/solutionedit', query: { id: id } })
}

// 删除
const handleDelete = (id) => {
  ElMessageBox.confirm('确认删除该题解吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      const res = await solutionDelete({ id: id })
      if (res.code === 0) {
        ElNotification({
          title: '成功',
          message: '删除成功',
          type: 'success',
        })
      }
    } catch (error) {
      ElNotification({
        title: '错误',
        message: '删除失败',
        type: 'error',
      })
    } finally {
      loadData()
    }
  })
}
</script>

<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-input placeholder="请输入题解ID" v-model="searchParams.id"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入题解标题" v-model="searchParams.title"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-col>
      <el-col :span="6">
        <el-button class="fr" type="primary" @click="handleAdd">新增题解</el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="mt">
    <el-alert title="单击帖子标题即可查看题解内容" type="info" show-icon />
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="ID" width="230">
        <template #default="{ row }">
          <p>题解ID: {{ row.id }}</p>
          <p>题目ID: {{ row.questionId ? row.questionId : '未绑定' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="题解标题">
        <template #default="{ row }">
          <span class="title-text" @click="previewVisible = true; previewContent = row.context">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userAccount" label="发表用户">
        <template #default="{ row }">
          <template v-if="row.userId">
            <el-tag type="success" @click="getIdUserInfo(row.userId)">{{ row.userId }}</el-tag>
          </template>
          <template v-else>
            <el-tag type="info">系统</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="题解状态">
        <template #default="{ row }">
          <el-tag :type="row.status === 0 ? 'warning' : row.status === 1 ? 'success' : 'info'">{{ row.status === 0 ? '待审核' : row.status === 1 ? '已审核' : '草稿' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="180">
        <template #default="{ row }">
          <p>创建时间: {{ moment(row.createTime).format('YYYY-MM-DD') }}</p>
          <p>更新时间: {{ moment(row.updateTime).format('YYYY-MM-DD') }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
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

  <!-- 题解内容 -->
  <el-dialog v-model="previewVisible" title="题解内容" width="800" @close="previewVisible = false">
    <PreviewOnly :content="previewContent" />
  </el-dialog>
</template>

<style lang="less" scoped>
.edit-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
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
</style>
