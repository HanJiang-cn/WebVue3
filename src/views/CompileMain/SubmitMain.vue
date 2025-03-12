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
  region: string[]
  question: string
  location: string
  type: string[]
  resource: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  region: [],
  question: '',
  location: '',
  type: [],
  resource: '',
  desc: '',
})
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout'
          },
          {
            value: 'color',
            label: 'Color'
          },
          {
            value: 'typography',
            label: 'Typography'
          },
          {
            value: 'icon',
            label: 'Icon'
          },
          {
            value: 'button',
            label: 'Button'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio'
          },
          {
            value: 'checkbox',
            label: 'Checkbox'
          },
          {
            value: 'input',
            label: 'Input'
          },
          {
            value: 'input-number',
            label: 'InputNumber'
          },
          {
            value: 'select',
            label: 'Select'
          },
          {
            value: 'cascader',
            label: 'Cascader'
          },
          {
            value: 'switch',
            label: 'Switch'
          },
          {
            value: 'slider',
            label: 'Slider'
          },
          {
            value: 'time-picker',
            label: 'TimePicker'
          },
          {
            value: 'date-picker',
            label: 'DatePicker'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          },
          {
            value: 'upload',
            label: 'Upload'
          },
          {
            value: 'rate',
            label: 'Rate'
          },
          {
            value: 'form',
            label: 'Form'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table'
          },
          {
            value: 'tag',
            label: 'Tag'
          },
          {
            value: 'progress',
            label: 'Progress'
          },
          {
            value: 'tree',
            label: 'Tree'
          },
          {
            value: 'pagination',
            label: 'Pagination'
          },
          {
            value: 'badge',
            label: 'Badge'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert'
          },
          {
            value: 'loading',
            label: 'Loading'
          },
          {
            value: 'message',
            label: 'Message'
          },
          {
            value: 'message-box',
            label: 'MessageBox'
          },
          {
            value: 'notification',
            label: 'Notification'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu'
          },
          {
            value: 'tabs',
            label: 'Tabs'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          },
          {
            value: 'dropdown',
            label: 'Dropdown'
          },
          {
            value: 'steps',
            label: 'Steps'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog'
          },
          {
            value: 'tooltip',
            label: 'Tooltip'
          },
          {
            value: 'popover',
            label: 'Popover'
          },
          {
            value: 'card',
            label: 'Card'
          },
          {
            value: 'carousel',
            label: 'Carousel'
          },
          {
            value: 'collapse',
            label: 'Collapse'
          }
        ]
      }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'docs',
        label: 'Design Documentation'
      }
    ]
  }
]
const locationOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({

  region: [
    {
      required: true,
      message: '请选择分类',
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

const handleChange = (value: unknown) => {
  console.log(value)
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // 提交成功后清空表单
      resetForm(formEl)
       ruleForm.region = [] // 清空 regionB 的选择状态
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
 <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="单选题" name="first">
     <el-form
    ref="ruleFormRef"
    style="max-width: 100%"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item prop="region" label="分类">
      <div class="m-4">
    <el-cascader :show-all-levels="false"  v-model="ruleForm.region" :options="options" @change="handleChange" />
  </div>
    </el-form-item>

    <el-form-item label="难度"  prop="location">
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
    <el-tab-pane label="多选题" name="second"><MoreOptions></MoreOptions></el-tab-pane>
    <el-tab-pane label="判断题" name="third"><JudgeOption></JudgeOption></el-tab-pane>
    <el-tab-pane label="填空题" name="fourth"><BlanksOptions></BlanksOptions></el-tab-pane>
    <el-tab-pane label="编程题" name="five"><ProgramOption></ProgramOption></el-tab-pane>
    <el-tab-pane label="简答题" name="six"><ShortOption></ShortOption></el-tab-pane>
  </el-tabs>
</div>
</template>
<style lang="less" scoped>
.create{
  max-width: 1500px;
  .el-tabs{
    width: 100%;
    padding-left: 30px;
  }
}
.el-form-item--default{
  margin-bottom: 25px;
}
 .inp{
    display: inline-block;
    height: 30px;
    margin-top: 6px;
 .A {
    width: 1100px;
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
.el-tabs{
  --el-tabs-header-height: 50px;
}
</style>
