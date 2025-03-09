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
    <el-form-item label="选项" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <div><el-checkbox value="Online activities" name="type">
          <span class="opt">A</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-checkbox></div>
       <div> <el-checkbox value="Promotion activities" name="type">
          <span class="opt">B</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-checkbox></div>
        <div><el-checkbox value="Offline activities" name="type">
       <span class="opt">C</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-checkbox></div>
       <div> <el-checkbox value="Simple brand exposure" name="type">
          <span class="opt">D</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-checkbox></div>
      </el-checkbox-group>
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
  type: string[]
  desc: string
  question: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: '',
  location: '',
  type: [],
  desc: '',
  question: '',
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
  type: [
    {
      type: 'array',
      required: true,
      message: '请选择选项',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: '请填写解析', trigger: 'blur' },
  ],
    question: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ]
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
<style lang="less" scoped>
 .inp{
    display: inline-block;
    height: 30px;
    margin-top: 6px;
 .A {
    width: 485px;
    height: 25px;
    outline: none;
    margin-left: 10px;
    vertical-align: top;
  }
  }
    .opt{
    float: left;
    margin-top: 11px;
   }

</style>
