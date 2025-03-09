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
    <!-- <div id="text"><TinymceEdit></TinymceEdit></div> -->
     <el-form-item label="题目" prop="question">
<TinymceEdit></TinymceEdit>
    </el-form-item>
    <!-- <div class="test">
        <el-form-item label="样本输入" prop="inp">
      <el-input v-model="ruleForm.inp" type="textarea" />
    </el-form-item>
     <el-form-item label="样本输出" prop="exp">
      <el-input v-model="ruleForm.exp" type="textarea" />
    </el-form-item>
    </div> -->
  <div v-for="(sample, index) in ruleForm.samples" :key="index" class="sample-io">
      <el-form-item :label="`样本输入 ${index + 1}`" :prop="`samples[${index}].inp`" :rules="rules.inp">
        <el-input v-model="sample.inp" type="textarea" />
      </el-form-item>
      <el-form-item :label="`样本输出 ${index + 1}`" :prop="`samples[${index}].exp`" :rules="rules.exp">
        <el-input v-model="sample.exp" type="textarea" />
      </el-form-item>
      <el-button type="danger" @click="removeSample(index)">删除</el-button>
    </div>
    <el-form-item>
      <el-button type="primary" @click="addSample">添加样例输入输出</el-button>
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
import TinymceEdit from '@/components/TinymceEdit.vue'
interface Sample {
  inp: string
  exp: string
}
interface RuleForm {
  region: string
  location: string
   question:string
  desc: string
  inp: string
  exp:string
   samples: Sample[]
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: '',
  location: '',
  question: '',
  desc: '',
  samples: [{ inp: '', exp: '' }],
  inp: '',
  exp: ''
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
 inp: [
    { required: true, message: '请填写样本输入', trigger: 'blur' },
  ],
  exp: [
    { required: true, message: '请填写样本输出', trigger: 'blur' },
  ],
})
const addSample = () => {
  ruleForm.samples.push({ inp: '', exp: '' })
}

const removeSample = (index: number) => {
  ruleForm.samples.splice(index, 1)
}

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
</style>
