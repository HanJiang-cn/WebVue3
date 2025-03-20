<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { addApi } from '@/api/question'
import TinymceEdit from '@/components/TinymceEdit.vue'
const ruleFormRef = ref()
const ruleForm = reactive({
  answer: '',
  content: '',
  judgeCase:[{
    input: '',
    output: ''
  }],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  tags: [],
  title: '',
})
const switchOptions = ref([])

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
            value: '3',
            label: '3'
          },
        ]
      },
    ]
  },
]
const locationPOptions = ['简单', '适中', '困难']

const rules ={
  tags: [
    {
      required: true,
      message: '请选择分类',
      trigger: 'change',
    }
  ],

  locationP: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    },
  ],
  question: [
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
}

const addSample = () => {
  ruleForm.judgeCase.push({ input: '', output: '' })
  console.log(ruleForm.judgeCase)
}

const removeSample = (index: number) => {
  ruleForm.judgeCase.splice(index, 1)
  console.log(ruleForm.judgeCase)
}

// 保存表单数据到 LocalStorage
const saveFormToLocalStorage = () => {
  localStorage.setItem('ruleForm', JSON.stringify(ruleForm))
}
// 从 LocalStorage 恢复表单数据
const loadFormFromLocalStorage = () => {
  const savedForm = localStorage.getItem('ruleForm')
  if (savedForm) {
    Object.assign(ruleForm, JSON.parse(savedForm))
  }
}
// 在组件挂载时加载表单数据和选中的标签页
onMounted(() => {
  loadFormFromLocalStorage()
})
// 在表单数据变化时保存到 LocalStorage
watch(ruleForm, () => {
  saveFormToLocalStorage()
}, { deep: true })
const submitForm = () => {
  ruleForm.tags = ruleForm.tags.concat(switchOptions.value)
  console.log(ruleForm)

  // 验证表单
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 提交表单数据
      const res = await addApi(ruleForm)
      console.log(res)
      // 提交成功后删除表单本地存储
      ruleFormRef.value.resetFields()
      localStorage.removeItem('ruleForm')
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
  ruleFormRef.value.resetFields()
}
</script>
<template>
  <el-form
  ref="ruleFormRef"
  :model="ruleForm"
  :rules="rules"
  label-width="auto"
  class="demo-ruleForm"
  size="default"
    status-icon
  >
     <el-form-item label="分类" prop="tags">
      <div class="m-4">
    <el-cascader v-model="ruleForm.tags" :options="options" />
  </div>
    </el-form-item>
    <el-form-item label="难度" prop="locationP">
      <el-segmented v-model="switchOptions" :options="locationPOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="question">
      <el-input v-model="ruleForm.title" type="textarea" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <TinymceEdit v-model="ruleForm.content" />
    </el-form-item>
  <div v-for="(judgeCase, index) in ruleForm.judgeCase" :key="index" class="sample-io">
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
    <!-- <el-form-item label="解析" prop="descP">
      <el-input v-model="ruleForm.descP" type="textarea" />
    </el-form-item> -->
    <el-form-item label="答案" prop="answer">
      <el-input v-model="ruleForm.answer" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        创建
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="less" scoped>
#text{
  margin-bottom: 20px;
  margin-left: 35px;
}
.test{
  margin-bottom: 20px;
  border-bottom: 1px dashed #c0c4cc;
}
.sample-io {
  margin-bottom: 20px;
  border-bottom: 1px dashed #c0c4cc;
  padding-bottom: 20px;
}
.el-form-item--default{
  margin-bottom: 25px;
}

</style>
