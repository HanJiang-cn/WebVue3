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
  tags: [],
  title: '',
  diffcult: '',
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
  diffcult: [
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
      { required: true, message: '请填写内存限制', trigger: 'blur' }
    ],
    stackLimit: [
      { required: true, message: '请填写栈限制', trigger: 'blur' }
    ],
    timeLimit: [
      { required: true, message: '请填写时间限制', trigger: 'blur' }
    ]
  }
}

const addSample = () => {
  addData.judgeCase.push({ input: '', output: '' })
  console.log(addData.judgeCase)
}

const removeSample = (index) => {
  addData.judgeCase.splice(index, 1)
  console.log(addData.judgeCase)
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
      // 提交成功后删除表单本地存储
      addDataRef.value.resetFields()
      localStorage.removeItem('addData')
      router.push('/question/compile')
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
    <el-form-item label="难度" prop="diffcult">
      <el-segmented v-model="addData.diffcult" :options="locationPOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="title">
      <el-input v-model="addData.title" type="textarea" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <MdEditor v-model="addData.content" @modelValue="uploadContent" style="width: 100%;" />
    </el-form-item>
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
      <el-button type="primary" @click="addSample">添加样例输入输出</el-button>
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
</style>
