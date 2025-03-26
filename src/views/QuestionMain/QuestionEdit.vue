<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { editApi, getMyApi } from '@/api/question'

const router = useRouter()
const questionId = ref(router.currentRoute.value.query.id)

// 表单数据结构
const form = reactive({
  title: '',
  difficulty: 1,
  tags: [],
  options: [
    { label: 'A', content: '', correct: false },
    { label: 'B', content: '', correct: false },
    { label: 'C', content: '', correct: false },
    { label: 'D', content: '', correct: false }
  ],
  analysis: ''
})

// 获取题目详情
const fetchQuestionDetail = async () => {
  try {
    const { code, data } = await getMyApi(questionId.value)
    if (code === 0) {
      Object.assign(form, {
        title: data.title,
        difficulty: data.difficulty,
        tags: data.tags,
        analysis: data.analysis,
        options: data.options.map(opt => ({
          ...opt,
          correct: data.answer.includes(opt.label)
        }))
      })
    }
  } catch (error) {
    ElNotification.error({
      title: '加载失败',
      message: '获取题目详情失败，请刷新重试'
    })
  }
}

// 提交修改
const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      id: questionId.value,
      answer: form.options.filter(opt => opt.correct).map(opt => opt.label)
    }

    const { code } = await editApi(payload)
    if (code === 0) {
      ElMessage.success('修改成功')
      router.push({ name: 'QuestionDetail', params: { id: questionId.value } })
    }
  } catch (error) {
    ElMessage.error('修改失败')
  }
}

// 生命周期钩子
onMounted(() => {
  if (!questionId.value) {
    ElMessage.warning('无效的题目ID')
    router.go(-1)
    return
  }
  fetchQuestionDetail()
})
</script>

<template>
  <div class="question-edit-container">
    <el-form label-width="120px">
      <el-form-item label="题目名称">
        <el-input v-model="form.title" placeholder="请输入题目名称" />
      </el-form-item>

      <el-form-item label="难度等级">
        <el-select v-model="form.difficulty">
          <el-option :value="1" label="简单" />
          <el-option :value="2" label="中等" />
          <el-option :value="3" label="困难" />
        </el-select>
      </el-form-item>

      <el-form-item label="题目选项">
        <div v-for="(option, index) in form.options" :key="index" class="option-item">
          <el-checkbox v-model="option.correct">正确答案</el-checkbox>
          <el-input
            v-model="option.content"
            :placeholder="`选项 ${option.label} 内容`"
            style="width: 300px; margin-left: 20px;"
          />
        </div>
      </el-form-item>

      <el-form-item label="题目解析">
        <el-input
          v-model="form.analysis"
          type="textarea"
          :rows="4"
          placeholder="请输入题目解析"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
        <el-button @click="router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.question-edit-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.option-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
</style>
