<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { getSolutionListApi } from '@/api/solution'
import { usePagination } from '@/hooks/usePagination'
import SolutionCard from '@/components/ProblemsMain/SolutionCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleAddSolution = () => {
  router.push({
    path: '/post/solutioncreate',
    query: {
      ...router.currentRoute.value.query,
    }
  })
}

const handleSolution = (id) => {
  router.push({
    path: '/problems/solution/content',
    query: {
      // 保留所有现有参数
      ...router.currentRoute.value.query,
      // 添加新的参数
      solutionId: id
    }
  })
}

// 题解获取
const loading = ref(false)
const solutionList = ref([])

// 获取题解列表
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getSolutionListApi({ ...pageInfo, questionId: router.currentRoute.value.query.id })
  loading.value = false
  solutionList.value = records
  setTotals(Number(total))
  solutionList.value = records.map((records) => ({
    ...records,
  }))
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
</script>

<template>
  <div class="solution-header">
    <el-button type="primary" @click="handleAddSolution">添加题解</el-button>
  </div>
  <div class="solution-list" v-if="solutionList.length > 0">
    <SolutionCard style="cursor: pointer;" @click="handleSolution(item.id)" v-for="item in solutionList" :key="item.id"
      :item="item"></SolutionCard>
  </div>
  <div v-else><el-empty :image-size="200" description="暂无题解" /></div>

  <div class="pagination">
    <el-pagination class="mr mt" v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next, total" :total="totals" background
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<style lang="less" scoped>
.solution-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
}

.solution-list {
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
