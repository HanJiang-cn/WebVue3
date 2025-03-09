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
     <el-form-item label="科目" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择科目">
        <el-option label="Java" value="Java" />
        <el-option label="C++" value="C++" />
      </el-select>
    </el-form-item>
        <el-form-item label="难度" prop="location">
      <el-segmented v-model="ruleForm.location" :options="locationOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="question">
      <el-input v-model="ruleForm.question" type="textarea" />
    </el-form-item>
    <el-form-item label="解析" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
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
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  region: string
  location: string
   question: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: '',
  location: '',
    question: '',
  desc: '',
})

const locationOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({
  region: [
    {
      required: true,
      message: '请选择科目',
      trigger: 'change',
    },
  ],

  location: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    },
  ],
  question: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ],
  desc: [
    { required: true, message: '请填写解析', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
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
