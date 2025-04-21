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
  tags: [],
  title: '',
})
//获取题目详情方法
const fetchQuestionDetail = async () => {
  try {
    const { code, data } = await getDetailApi({ id: questionId.value })
    if (code === 0) {
      // 转换测试用例格式
      if (typeof data.judgeCase === 'string') {
        data.judgeCase = JSON.parse(data.judgeCase)
      }

      // 保留原有judgeCase结构
      form.judgeCase.splice(0, form.judgeCase.length, ...(data.judgeCase || []))

      // 使用Object.assign需要排除judgeCase字段
      const { judgeCase, ...rest } = data
      Object.assign(form, rest)
    }
    console.log(data)
  } catch (error) {
    ElMessage.error('获取题目详情失败: ' + error.message)
  }
}
function uploadContent(data) {
  form.content = data
  console.log(data)
}
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
        <el-radio-group v-model="form.difficult" size="large">
          <el-radio-button label="简单" value="1" />
          <el-radio-button label="适中" value="2" />
          <el-radio-button label="困难" value="3" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <MdEditor :constEdit="form.content" @modelValue="uploadContent" style="width: 100%;" />
      </el-form-item>
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
</style>
