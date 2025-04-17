<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getApi,AddCompetitionPaper} from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'vue-router'

const router = useRouter()
const questions = ref([])
const selectedQuestions = ref(new Set()) // 改用Set提高查找效率
const loading = ref(false)
const competitionId = ref('')

// 筛选条件
const filter = reactive({
  title: '',
  tags:[],
  difficulty: '',
})

// 获取题目列表
const loadData = async () => {
  try {
    loading.value = true
    const params = {
      ...pageInfo,
      title: filter.title,
      subject: filter.subject,
      type: filter.type
    }
    const { data: { records, total } } = await getApi(params)
    questions.value = records
    setTotals(Number(total))
  } catch (error) {
    ElMessage.error('题目加载失败')
  } finally {
    loading.value = false
  }
}

// 题目选择操作
const toggleQuestion = (question) => {
  selectedQuestions.value.has(question.id)? selectedQuestions.value.delete(question.id): selectedQuestions.value.add(question.id)
}

const submitPaper = async () => {
  if (selectedQuestions.value.size === 0) {
    return ElMessage.warning('请至少选择一道题目')
  }
  if (!competitionId.value) {
    return ElMessage.error('缺少比赛ID参数')
  }

  try {
    const params = {
      competitionId: competitionId.value,
      questions: Array.from(selectedQuestions.value) // 转换为数组
    }

    await AddCompetitionPaper(params)
    console.log(params)

    ElMessage.success('试卷创建成功')
    // 可选：跳转到比赛页面

  } catch (error) {
    ElMessage.error(`试卷创建失败: ${error.message}`)
  }
}
onMounted(loadData)
const handleBrowse = (id) => {
  window.open(router.resolve({
    path: '/problems/question',
    query: {
      id: id
    }
  }).href, '_blank')
}

const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
</script>

<template>
  <div>
     <h1 style="margin-left: 16px;">试卷创建系统</h1>
     <div class="container">
    <!-- 题库区域 -->
    <div class="question-bank">
      <h2 style="margin-bottom: 15px;">题库</h2>
      <div class="filter-area">
        <el-input
          v-model="filter.title"
          placeholder="搜索题目..."
          clearable
          style="width: 300px"
          @change="loadData"
        />

        <div class="filter-group">
          <el-select v-model="filter.difficult" placeholder="选择难度" @change="loadData" style="width: 100%;">
            <el-option label="简单" value="简单" />
            <el-option label="适中" value="适中" />
            <el-option label="困难" value="困难" />
          </el-select>
        </div>
      </div>

      <el-table
        :data="questions"
        v-loading="loading"
        style="width: 100%"
        @row-click="(row) => toggleQuestion(row)"
      >
        <el-table-column prop="title" label="题目" min-width="300">
          <template #default="{ row }">
            <span class="title-text" @click.stop="handleBrowse(row.id)">
              {{ row.title }}
            </span>
            <el-tag v-if="selectedQuestions.has(row.id)" type="success" size="small" style="margin-left: 5px;">
                已选
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度" width="120" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              size="small"
              @click.stop="toggleQuestion(row)"
            >
              {{ selectedQuestions.has(row.id) ? '移除' : '添加' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageInfo.current"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 已选试题区域 -->
    <div class="selected-questions">
      <h2 style="margin-bottom: 15px;">已选题目（{{ selectedQuestions.size }}）</h2>
      <el-input v-model="competitionId" placeholder="请输入竞赛id" clearable />

      <div class="selected-list">
        <div v-for="(id, index) in selectedQuestions" :key="id" class="selected-item">
          <div class="question-order">{{ index + 1 }}.</div>
          <div class="question-title">
            {{ questions.find(q => q.id === id)?.title || '题目已移除' }}
          </div>
          <el-button
            size="small"
            circle
            @click="selectedQuestions.delete(id)"
          >x
          </el-button>
        </div>
        <el-empty v-if="selectedQuestions.size === 0" description="暂无已选题目" />
      </div>

      <div class="action-buttons">
        <el-button type="success" @click="submitPaper">提交试卷</el-button>
      </div>
    </div>
  </div></div>


</template>

<style lang="less" scoped>
.container {
  display: flex;
  gap: 24px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.question-bank {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);

  .filter-area {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .filter-group {
    width: 260px;
    display: flex;
    gap: 12px;
  }
}

.selected-questions {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);

  .selected-list {
    margin-top: 20px;
    max-height: 600px;
    overflow-y: auto;
  }

  .selected-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin: 8px 0;
    border-radius: 6px;
    background: #f8f9fa;
    transition: all 0.3s;

    &:hover {
      background: #e9ecef;
    }

    .question-order {
      color: #409EFF;
      font-weight: bold;
    }

    .question-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.title-text {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #409EFF;
    text-decoration: underline;
  }
}
</style>
