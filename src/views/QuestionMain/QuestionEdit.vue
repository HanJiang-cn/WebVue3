<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { editApi, getDetailApi } from '@/api/question'

const router = useRouter()
const questionId = ref(router.currentRoute.value.query.id)
const form = reactive({
  title: '',
  difficulty: 1,
  tags: [],
  questionType: 'single', // 新增题型标识（根据实际数据初始化）
  // options: [],           // 选择题选项
  //   // options: [
//   //   { label: 'A', content: '', correct: false },
//   //   { label: 'B', content: '', correct: false },
//   //   { label: 'C', content: '', correct: false },
//   //   { label: 'D', content: '', correct: false }
//   // ],
  answer: '',            // 填空题答案
  judgeCase: []          // 编程题用例
})
// 在获取题目详情时初始化题型
const fetchQuestionDetail = async () => {
  try {
    const { code, data } = await getDetailApi({ id: questionId.value })
    if (code === 0) {
      Object.assign(form, {
        title: data.title,
        difficulty: data.difficulty,
        tags: data.tags,
        // 根据 tags 判断题型
        questionType: getQuestionType(data.tags)
      })

      // 根据题型初始化数据
      switch(form.questionType) {
        case 'single':
          form.options = data.options || []
          break
        case 'fill':
          form.answer = data.answer || ''
          break
        case 'program':
          form.judgeCase = data.judgeCase || []
          break
      }
    }
  } catch (error) {
    // ...错误处理
  }
}

// 根据 tags 判断题型类型的方法
const getQuestionType = (tags) => {
  if (tags.includes('1')) return 'single'
  if (tags.includes('2')) return 'fill'
  if (tags.includes('3')) return 'program'
  return 'single' // 默认类型
}
// // 添加选项（选择题）
// const addOption = () => {
//   form.options.push({
//     label: String.fromCharCode(65 + form.options.length),
//     content: '',
//     correct: false
//   })
// }

// 添加测试用例（编程题）
const addSample = () => {
  form.judgeCase.push({
    input: '',
    output: ''
  })
}

// 删除测试用例
const removeSample = (index) => {
  form.judgeCase.splice(index, 1)
}
// 修改后的 handleSubmit
const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      id: questionId.value,
    }

    const { code, message } = await editApi(payload)

    // 明确处理所有 code 情况
    if (code === 0) {
      ElMessage.success('修改成功')
      router.push({ name: 'QuestionCompile', params: { id: questionId.value } })
    } else {
      ElMessage.warning(message || '修改未完全生效') // 差异化提示
    }
  } catch (error) {
    // 显示具体错误信息
    ElMessage.error(error.message || '请求发送失败')
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
    <div class="title">新建试题</div>
    <el-form label-width="120px">
      <!-- 公共部分 -->
      <el-form-item label="题目名称">
        <el-input v-model="form.title" placeholder="请输入题目名称" />
      </el-form-item>

      <!-- 动态部分 -->
      <!-- <template v-if="form.questionType === 'single'">
        <el-form-item label="题目选项">
          <div v-for="(option, index) in form.options" :key="index" class="option-item">
            <el-checkbox v-model="option.correct">正确答案</el-checkbox>
            <el-input
              v-model="option.content"
              :placeholder="`选项 ${String.fromCharCode(65 + index)} 内容`"
              style="width: 300px; margin-left: 20px;"
            />
          </div>
          <el-button @click="addOption">添加选项</el-button>
        </el-form-item>
      </template> -->

      <template v-if="form.questionType === 'fill'">
        <el-form-item label="正确答案">
          <el-input v-model="form.answer" type="textarea" :rows="3" />
        </el-form-item>
      </template>

      <template v-else-if="form.questionType === 'program'">
        <div v-for="(judgeCase, index) in form.judgeCase" :key="index" class="sample-io">
          <el-form-item :label="`输入用例 ${index + 1}`">
            <el-input v-model="judgeCase.input" type="textarea" />
          </el-form-item>
          <el-form-item :label="`输出用例 ${index + 1}`">
            <el-input v-model="judgeCase.output" type="textarea" />
          </el-form-item>
          <el-button type="danger" @click="removeSample(index)">删除</el-button>
        </div>
        <el-button @click="addSample">添加测试用例</el-button>
        <el-form-item label="正确答案">
          <el-input v-model="form.answer" type="textarea" :rows="3" />
        </el-form-item>
      </template>

      <!-- 公共提交部分 -->
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
.title {
    color: #000;
    font-size: 22px;
    font-weight: 700;
    margin-top: 12px;
    margin-left: 50px;
    margin-bottom: 20px;
  }
</style>
