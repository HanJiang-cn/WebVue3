<template>
  <div ><el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="科目" prop="regionM">
      <el-select v-model="ruleForm.regionM" placeholder="请选择科目">
        <el-option label="Java" value="Java" />
        <el-option label="C++" value="C++" />
      </el-select>
    </el-form-item>
    <el-form-item label="难度" prop="locationM">
      <el-segmented v-model="ruleForm.locationM" :options="locationMOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="questionM">
      <el-input v-model="ruleForm.questionM" type="textarea" />
    </el-form-item>
    <el-form-item label="选项" prop="typeM">
      <el-checkbox-group v-model="ruleForm.typeM">
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
    <el-form-item label="解析" prop="descM">
      <el-input v-model="ruleForm.descM" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        创建
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form></div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  regionM: string
  locationM: string
  typeM: string[]
  descM: string
  questionM: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  regionM: '',
  locationM: '',
  typeM: [],
  descM: '',
  questionM: '',
})

const locationMOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({

  regionM: [
    {
      required: true,
      message: '请选择科目',
      trigger: 'change',
    },
  ],

  locationM: [
    {
      required: true,
      message: '请选择难度',
      trigger: 'change',
    },
  ],
  typeM: [
    {
      type: 'array',
      required: true,
      message: '请选择选项',
      trigger: 'change',
    },
  ],
  descM: [
    { required: true, message: '请填写解析', trigger: 'blur' },
  ],
    questionM: [
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
    border: 1px solid #c0c4cc;
  }
  }
    .opt{
    float: left;
    margin-top: 11px;
   }

</style>
