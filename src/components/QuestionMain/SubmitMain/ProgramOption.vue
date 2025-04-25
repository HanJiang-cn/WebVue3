<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { addApi } from '@/api/question'
import MdEditor from '@/components/MdEditor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const addDataRef = ref()
const addData = reactive({
  answer: '',
  content: '',
  judgeCase: [{
    input: '',
    output: ''
  }],
  judgeConfig: {
    memoryLimit: '',
    stackLimit: '',
    timeLimit: ''
  },
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
function uploadContent(data) {
  addData.content = data
  console.log(data)
}
const options = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '2',
        label: '2',
        children: [
          {
            value: 'JAVA',
            label: 'JAVA'
          },
        ]
      },
    ]
  },
]
const locationPOptions = ['简单', '适中', '困难']

const rules = {
  tags: [
    {
      required: true,
      message: '请选择分类',
      trigger: 'change',
    }
  ],
  difficulty: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    }
  ],
  title: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请填写内容', trigger: 'blur' },
  ],
  input: [
    { required: true, message: '请填写样本输入', trigger: 'blur' },
  ],
  output: [
    { required: true, message: '请填写样本输出', trigger: 'blur' },
  ],
  answer: [
    { required: true, message: '请填写答案', trigger: 'blur' },
  ],

  judgeConfig: {
  memoryLimit: [
    { required: true, message: '请填写内存限制', trigger: 'blur' },
    { min: 0, message: '内存限制不能小于0', trigger: 'blur' }
  ],
    stackLimit: [
      { required: true, message: '请填写栈限制', trigger: 'blur' }
    ],
    timeLimit: [
      { required: true, message: '请填写时间限制', trigger: 'blur' },
      { min: 0, message: '时间限制不能小于0', trigger: 'blur' }
    ]
  },
  question_example: [
    {
      explain: [
        { required: true, message: '请填写解释', trigger: 'blur' }
      ],
      input: [
        { required: true, message: '请填写输入', trigger: 'blur' }
      ],
      output: [
        { required: true, message: '请填写输出', trigger: 'blur' }
      ]
    }
  ],
  question_prompt: [
  {required: true, message: '请填写提示', trigger: 'blur'}
  ]
}

const addSample = () => {
  addData.judgeCase.push({ input: '', output: '' })
  console.log(addData.judgeCase)
}

const removeSample = (index) => {
  addData.judgeCase.splice(index, 1)
  console.log(addData.judgeCase)
}
const addQuestionExample = () => {
  addData.question_example.push({ explain: '', input: '', output: '' })
  console.log(addData.question_example)
}
const removeQuestionExample = (index) => {
  addData.question_example.splice(index, 1)
}
// 保存表单数据到 LocalStorage
const saveFormToLocalStorage = () => {
  localStorage.setItem('addData', JSON.stringify(addData))
}
// 从 LocalStorage 恢复表单数据
const loadFormFromLocalStorage = () => {
  const savedForm = localStorage.getItem('addData')
  if (savedForm) {
    Object.assign(addData, JSON.parse(savedForm))
  }
}
// 在组件挂载时加载表单数据和选中的标签页
onMounted(() => {
  loadFormFromLocalStorage()
})
// 在表单数据变化时保存到 LocalStorage
watch(addData, () => {
  saveFormToLocalStorage()
}, { deep: true })

const submitForm = () => {
  console.log(addData)
  // 验证表单
  addDataRef.value.validate(async (valid) => {
    if (valid) {
      // 提交表单数据
      const res = await addApi(addData)
      console.log(res)
      ElMessage({
        message: '提交成功',
        type: 'success',
      })
      console.log(res)
      // 提交成功后删除表单本地存储
      addDataRef.value.resetFields()
      localStorage.removeItem('addData')
      // router.push('/question/compile')
    } else {
      ElMessage({
        message: '请填写完整信息',
        type: 'warning',
      })
    }
  }
  )

}

const resetForm = () => {
  addDataRef.value.resetFields()
  //手动清空judgeCase
  addData.judgeCase = [{ input: '', output: '' }]
  window.location.reload()
}

const handelBack = () => {
  router.push('/question/compile')
}
</script>
<template>
  <el-form ref="addDataRef" :model="addData" :rules="rules" label-width="auto" class="demo-addData" size="default"
    status-icon>
    <el-form-item label="分类" prop="tags">
      <div class="m-4">
        <el-cascader v-model="addData.tags" :options="options" />
      </div>
    </el-form-item>
    <el-form-item label="难度" prop="difficulty">
      <el-segmented v-model="addData.difficulty" :options="locationPOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="title">
      <el-input v-model="addData.title" type="textarea" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <MdEditor v-model="addData.content" @modelValue="uploadContent" style="width: 100%;" />
    </el-form-item>
 <div class="ex">
  <div v-for="(judgeCase, index) in addData.judgeCase" :key="index" class="sample-io">
      <el-form-item :label="`样本输入 ${index + 1}`" :prop="`judgeCase.${index}.input`" :rules="rules.input">
        <el-input v-model="judgeCase.input" type="textarea" />
      </el-form-item>
      <el-form-item :label="`样本输出 ${index + 1}`" :prop="`judgeCase.${index}.output`" :rules="rules.output">
        <el-input v-model="judgeCase.output" type="textarea" />
      </el-form-item>
      <el-button type="danger" @click="removeSample(index)">删除</el-button>
    </div>
    <el-form-item>
      <el-button type="primary" @click="addSample" style="margin-bottom: 15px;">添加样例输入输出</el-button>
    </el-form-item>
 </div>
<div class="ex">
<div v-for="(question_example, index) in addData.question_example" :key="index" class="test">
      <el-form-item :label="`示例输入 ${index + 1}`" :prop="`question_example.${index}.input`" :rules="rules.question_example.input">
        <el-input v-model="question_example.input" type="textarea" />
      </el-form-item>
      <el-form-item :label="`示例输出 ${index + 1}`" :prop="`question_example.${index}.output`" :rules="rules.question_example.output">
        <el-input v-model="question_example.output" type="textarea" />
      </el-form-item>
      <el-form-item :label="`示例解释 ${index + 1}`" :prop="`question_example.${index}.explain`" :rules="rules.question_example.explain">
        <el-input v-model="question_example.explain" type="textarea" />
      </el-form-item>
      <el-button type="danger" @click="removeQuestionExample(index)" style="margin-bottom: 20px;">删除</el-button>
    </div>
    <el-form-item>
      <el-button type="success" @click="addQuestionExample" style="margin-bottom: 15px;">添加示例输入输出</el-button>
    </el-form-item>
  </div>
    <el-form-item label="提示" prop="question_prompt">
      <el-input v-model="addData.question_prompt" type="textarea" />
    </el-form-item>
    <el-form-item label="内存限制" prop="judgeConfig.memoryLimit">
      <el-input v-model="addData.judgeConfig.memoryLimit" type="number" />
    </el-form-item>
    <el-form-item label="栈限制" prop="judgeConfig.stackLimit">
      <el-input v-model="addData.judgeConfig.stackLimit" type="number" />
    </el-form-item>
    <el-form-item label="时间限制" prop="judgeConfig.timeLimit">
      <el-input v-model="addData.judgeConfig.timeLimit" type="number" />
    </el-form-item>
    <el-form-item label="答案" prop="answer">
      <el-input v-model="addData.answer" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        创建
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
      <el-button @click="handelBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="less" scoped>
#text {
  margin-bottom: 20px;
  margin-left: 35px;
}

.test {
  margin-bottom: 20px;
  border-bottom: 1px dashed #c0c4cc;
}

.sample-io {
  margin-bottom: 20px;
  border-bottom: 1px dashed #c0c4cc;
  padding-bottom: 20px;
}

.el-form-item--default {
  margin-bottom: 25px;
}
.ex{
  margin: 40px 0;
  border-bottom: 1px solid #a7c4fd;
}
</style>
