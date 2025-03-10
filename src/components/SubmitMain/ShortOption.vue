<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
     <el-form-item label="科目" prop="regionS">
      <el-select v-model="ruleForm.regionS" placeholder="请选择科目">
        <el-option label="Java" value="Java" />
        <el-option label="C++" value="C++" />
      </el-select>
    </el-form-item>
        <el-form-item label="难度" prop="locationS">
      <el-segmented v-model="ruleForm.locationS" :options="locationSOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="questionS">
      <el-input v-model="ruleForm.questionS" type="textarea" />
    </el-form-item>
     <el-form-item label="答案" prop="answerS">
      <el-input v-model="ruleForm.answerS" type="textarea" />
    </el-form-item>
    <el-form-item label="解析" prop="descS">
      <el-input v-model="ruleForm.descS" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
         创建
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  regionS: string
  locationS: string
   questionS:string
  descS: string
  answerS: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  regionS: '',
  locationS: '',
    questionS: '',
  descS: '',
  answerS: '',
})

const locationSOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({
  regionS: [
    {
      required: true,
      message: '请选择科目',
      trigger: 'change',
    },
  ],

  locationS: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    },
  ],
  questionS: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ],
  descS: [
    { required: true, message: '请填写解析', trigger: 'blur' },
  ],
    answerS: [
    { required: true, message: '请填写答案', trigger: 'blur' },
  ],

})
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      formEl.resetFields()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
