<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  regionJ: string
  locationJ: string
  resourceJ: string
  descJ: string
   questionJ: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  regionJ: '',
  locationJ: '',
  resourceJ: '',
  descJ: '',
   questionJ: '',
})

const locationJOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({
  regionJ: [
    {
      required: true,
      message: '请选择科目',
      trigger: 'change',
    },
  ],
  locationJ: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    },
  ],
  resourceJ: [
    {
      required: true,
      message: '请选择选项',
      trigger: 'change',
    },
  ],
  descJ: [
    { required: true, message: '请填写解析', trigger: 'blur' },
  ],
  questionJ: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ]
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
<template>
  <div>
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
   <el-form-item label="科目" prop="regionJ">
      <el-select v-model="ruleForm.regionJ" placeholder="请选择科目">
        <el-option label="Java" value="Java" />
        <el-option label="C++" value="C++" />
      </el-select>
    </el-form-item>
   <el-form-item label="难度" prop="locationJ">
      <el-segmented v-model="ruleForm.locationJ" :options="locationJOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="questionJ">
      <el-input v-model="ruleForm.questionJ" type="textarea" />
    </el-form-item>
    <el-form-item label="判断" prop="resourceJ">
      <el-radio-group v-model="ruleForm.resourceJ">
        <div><el-radio value="Sponsorship"><span class="opt">正确</span>
          <span><input type="text" class="A"></span></el-radio></div>
<div>  <el-radio value="Venue"><span class="opt">错误</span>
          <span><input type="text" class="A"></span></el-radio></div>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="解析" prop="descJ">
      <el-input v-model="ruleForm.descJ" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        创建
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<style lang="less" scoped>
.A{
  width: 450px;
  height: 25px;
  outline: none;
  border: 1px solid #c0c4cc;
}
.opt{
  margin-right: 10px;
}
</style>
