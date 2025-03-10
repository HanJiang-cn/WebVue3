<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import MoreOptions from '@/components/SubmitMain/MoreOptions.vue'
import JudgeOption from '@/components/SubmitMain/JudgeOption.vue'
import BlanksOptions from '@/components/SubmitMain/BlanksOptions.vue'
import ProgramOption from '@/components/SubmitMain/ProgramOption.vue'
import ShortOption from '@/components/SubmitMain/ShortOption.vue'
const activeName = ref(localStorage.getItem('activeTab') || 'first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  // 保存当前选中的标签页
  localStorage.setItem('activeTab', activeName.value)
}

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  region: string
  question: string
  location: string
  type: string[]
  resource: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: '',
  question: '',
  location: '',
  type: [],
  resource: '',
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

  resource: [
    {
      required: true,
      message: '请选择答案',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: '请输入解析', trigger: 'blur' },
  ],
  question: [
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
  activeName.value = localStorage.getItem('activeTab') || 'first'
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
      // 提交成功后清空表单
      resetForm(formEl)
      // 清空 LocalStorage 中的表单数据
      localStorage.removeItem('ruleForm')
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
<div class="create">
  <div class="title">新建试题</div>
  <div><el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="单选题" name="first">
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
    <el-form-item label="选项" prop="resource" inline="false">
      <el-radio-group v-model="ruleForm.resource" inline="false">
        <div><el-radio value="Sponsorship" border >
          <span class="opt">A</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-radio></div>
        <div><el-radio value="Venue" border>
          <span class="opt">B</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-radio></div>
        <div><el-radio value="OptionC" border>
          <span class="opt">C</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-radio></div>
        <div><el-radio value="OpotionD" border>
          <span class="opt">D</span>
          <span class="inp"><input type="text" class="A"></span>
        </el-radio></div>
      </el-radio-group>
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
    </el-tab-pane>
    <el-tab-pane label="多选题" name="second">
<MoreOptions></MoreOptions>
  </el-tab-pane>
    <el-tab-pane label="判断题" name="third"><JudgeOption></JudgeOption></el-tab-pane>
    <el-tab-pane label="填空题" name="fourth"><BlanksOptions></BlanksOptions></el-tab-pane>
     <el-tab-pane label="编程题" name="five"><ProgramOption></ProgramOption></el-tab-pane>
      <el-tab-pane label="简答题" name="six"><ShortOption></ShortOption></el-tab-pane>
  </el-tabs></div>
</div>
</template>
<style lang="less" scoped>
.create {
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  padding: 25px;
  height: 100%;
  border: #eee 1px solid;
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .inp{
    display: inline-block;
    height: 30px;
    margin-top: 6px;
 .A {
    width: 485px;
    height: 25px;
    border: none;
    outline: none;
    margin-left: 10px;
    vertical-align: top;
  }
  }
    .opt{
    float: left;
    margin-top: 3px;
   }

}
.demo-tabs > .el-tabs__question {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
