<!-- eslint-disable vue/block-lang -->

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { editApi, getDetailApi } from '@/api/question'
import MdEditor from '@/components/MdEditor.vue'

const router = useRouter()
const questionId = ref(router.currentRoute.value.query.id)

const form = reactive({
  answer: '',
  content: '',
  judgeCase: [{
    input: '',
    output: ''
  }],
  question_example: [
    {
      explain: '',
      input: '',
      output: ''
    }
  ],
  question_prompt: [],
  tags: [],
  title: '',
  difficulty: '',
})
//获取题目详情方法
const fetchQuestionDetail = async () => {
  try {
    const { code, data } = await getDetailApi({ id: questionId.value })
    if (code === 0) {
      // 解析字符串类型的数据
      data.judgeCase = typeof data.judgeCase === 'string' ? JSON.parse(data.judgeCase) : data.judgeCase
      data.question_example = typeof data.question_example === 'string' ? JSON.parse(data.question_example) : []
      data.question_prompt = typeof data.question_prompt === 'string' ? JSON.parse(data.question_prompt) : []

      // 确保至少有1个示例
      if (data.question_example.length === 0) {
        data.question_example.push({ input: '', output: '', explain: '' })
      }

      Object.assign(form, {
        ...data,
        tags: data.tags || []
      })
    }
  } catch (error) {
    ElMessage.error('数据解析失败: ' + error.message)
  }
}
function uploadContent(data) {
  form.content = data
  console.log(data)
}
// 添加测试用例（编程题）
const addJudgeCase= () => {
  form.judgeCase.push({
    input: '',
    output: ''
  })
}

// 删除测试用例
const removeJudgeCase = (index) => {
  form.judgeCase.splice(index, 1)
}
// 添加示例输入输出
const addSample = () => {
  form.question_example.push({
    input: '',
    output: '',
    explain: ''
  })
}
// 删除示例输入输出
const removeSample = (index) => {
  form.question_example.splice(index, 1)
}
// 添加提示
const addPrompt = () => {
  form.question_prompt.push('')
}
// 删除提示
const removePrompt = (index) => {
  form.question_prompt.splice(index, 1)
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
  }
  catch (error) {
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
    <div class="title">修改试题</div>
    <el-form label-width="120px">
      <el-form-item label="题目名称">
        <el-input v-model="form.title" placeholder="请输入题目名称" />
      </el-form-item>
      <el-form-item label="难度">
        <el-radio-group v-model="form.difficulty" size="large">
          <el-radio-button label="简单" value="简单" />
          <el-radio-button label="适中" value="适中" />
          <el-radio-button label="困难" value="困难" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <MdEditor :constEdit="form.content" @modelValue="uploadContent" style="width: 100%;" />
      </el-form-item>
  <div class="ex">
    <div v-for="(judgeCase, index) in form.judgeCase" :key="index" class="sample-io">
        <el-form-item :label="`输入用例 ${index + 1}`">
          <el-input v-model="judgeCase.input" type="textarea" />
        </el-form-item>
        <el-form-item :label="`输出用例 ${index + 1}`">
          <el-input v-model="judgeCase.output" type="textarea" />
        </el-form-item>
        <el-button class="but" type="danger" @click="removeJudgeCase(index)">删除</el-button>
      </div>
      <el-button class="but" @click="addJudgeCase">添加测试用例</el-button>
  </div>
 <div class="ex">
  <div v-for="(example, index) in form.question_example" :key="index" class="sample-io">
    <el-form-item :label="`示例 ${index + 1}`">
        <el-input v-model="example.input" placeholder="示例输入" />
    </el-form-item>
    <el-form-item :label="`示例 ${index + 1}`">
        <el-input v-model="example.output" placeholder="示例输出" />
    </el-form-item>
    <el-form-item :label="`示例 ${index + 1}`">
        <el-input v-model="example.explain" placeholder="示例解释" />
    </el-form-item>
    <el-button class="but" type="danger" @click="removeSample(index)">删除</el-button>
  </div>
  <el-button class="but" @click="addSample">添加示例</el-button>
 </div>

  <!-- 提示渲染 -->
<div class="ex">
  <div v-for="(prompt, index) in form.question_prompt" :key="'prompt'+index" class="sample-io">
    <el-form-item :label="`提示 ${index + 1}`">
      <el-input v-model="form.question_prompt[index]" type="textarea" />
    </el-form-item>
    <el-button class="but" type="danger" @click="removePrompt(index)">删除提示</el-button>
  </div>
  <el-button class="but" @click="addPrompt">添加提示</el-button>
</div>
      <el-form-item label="正确答案">
        <el-input v-model="form.answer" type="textarea" :rows="3" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.question-edit-container {
  min-width: 1000px;
  margin: 20px auto;
  padding: 30px;
  padding-right: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
.but{
  margin-bottom: 10px;
}
.sample-io {
  margin-bottom: 20px;
  border-bottom: 1px dashed #c0c4cc;
  padding-bottom: 20px;
}
.ex{
  margin: 40px 0;
  border-bottom: 1px solid #a7c4fd;
}
</style>
