<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getSolutionReviewList, solutionReview, getUserInfo } from '@/api/admin'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification, ElMessageBox } from 'element-plus'
import PreviewOnly from '@/components/PreviewOnly.vue'
import moment from 'moment'

const loading = ref(false)
const previewVisible = ref(false)
const previewContent = ref('')

// 获取列表
const dataList = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total }, } = await getSolutionReviewList({ ...pageInfo })
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

// 获取发布人信息
const getIdUserInfo = async (userId) => {
  const { data } = await getUserInfo(userId)
  return data
}

// 通过
const handlePass = (id, questionId) => {
  ElMessageBox.confirm('确认通过该题解吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await solutionReview(id, true)
    if (res.code === 0) {
      ElNotification({
        title: '成功',
        message: '题解审核通过',
        type: 'success',
      })
      loadData()
    } else {
      ElNotification({
        title: '失败',
        message: res.msg,
        type: 'error',
      })
    }
  })
}

</script>

<template>
  <el-alert title="单击帖子标题即可查看题解内容" type="info" show-icon />
  <el-card class="mt">
    <el-table :data="dataList" v-loading="loading">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="id" label="ID" width="230">
        <template #default="{ row }">
          <p>题解ID: {{ row.id }}</p>
          <p>题目ID: {{ row.questionId }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="帖子标题">
        <template #default="{ row }">
          <span class="title-text" @click="previewVisible = true; previewContent = row.context">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userRole" label="帖子状态">
        <el-tag type="warning">待审核</el-tag>
      </el-table-column>
      <el-table-column prop="userRole" label="发布用户">
        <template #default="{ row }">
          <template v-if="row.userId">
            <el-tag type="success" @click="getIdUserInfo(row.userId)">{{ row.userId }}</el-tag>
          </template>
          <template v-else>
            <el-tag type="info">系统</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="上传时间" width="150">
        <template #default="{ row }">
          {{ moment(row.updatedTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handlePass(row.id, row.questionId)">通过</el-button>
          <el-button type="danger" size="small" @click="handleNoPass(row.id, row.questionId)">不通过</el-button>
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
