<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'vue-router'
import { getCompetitionQuestionDetailApi } from '@/api/question'

const router = useRouter()
const id = ref(router.currentRoute.value.query.id)
// 删除不必要的 competitionQuestion 变量
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['colse'])
const huidao = () => {
  emits('colse')
}

const loading = ref(false)
const tableData = ref([])
const loadData = async () => {
  loading.value = true
  try {
    const { data } = await getCompetitionQuestionDetailApi(id.value)
    tableData.value = data  // 将获取的数据赋值给 tableData
    console.log('Loaded data:', data)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

const handleBrowse = (qId) => {
  router.push({
    path: '/competition/answer',
    query: {
      id: id.value,
      questionId: qId // 传递具体题目ID
    }
  })
  emits('close')
}
</script>

<template>
  <el-drawer :model-value="visible" direction="ltr" :show-close="false" @close="huidao">
    <template #header="{ close }">
      <div class="drawer-header">
        <span @click="close">每日一题</span>
        <CloseOutlined @click="close" />
      </div>
    </template>
    <el-table :data="tableData" v-loading="loading" stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="题目" prop="title">
        <template #default="scope">
          <div class="cell" @click="handleBrowse(scope.row.id)" style="cursor: pointer; color: var(--el-color-primary)">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="难度" prop="difficulty" width="120">
        <template #default="scope">
          <el-tag
            :type="scope.row.difficulty === '简单' ? 'success' : scope.row.difficulty === '中等' ? 'warning' : 'danger'"
          >
            {{ scope.row.difficulty }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<style lang="less" scoped>
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  span {
    font-size: 20px;
    color: black;
    cursor: pointer;
  }
}

.cell:hover {
  text-decoration: underline;
}
</style>
