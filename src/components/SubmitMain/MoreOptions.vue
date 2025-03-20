<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  regionM: string[]
  locationM: string
  typeM: string[]
  descM: string
  questionM: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  regionM: [],
  locationM: '',
  typeM: [],
  descM: '',
  questionM: '',
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
const locationMOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({

  regionM: [
    {
      required: true,
      message: '请选择分类',
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
const handleChange = (value: unknown) => {
  console.log(value)
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      formEl.resetFields()
      ruleForm.regionM = []
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  ruleForm.regionM = []
}

</script>

<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="分类" prop="regionM">
        <div class="m-4">
          <el-cascader :show-all-levels="false" v-model="ruleForm.regionM" :options="options" @change="handleChange" />
        </div>
      </el-form-item>
      <el-form-item label="难度" prop="locationM">
        <el-segmented v-model="ruleForm.locationM" :options="locationMOptions" />
      </el-form-item>
      <el-form-item label="题目" prop="questionM">
        <el-input v-model="ruleForm.questionM" type="textarea" />
      </el-form-item>
      <el-form-item label="选项" prop="typeM">
        <el-checkbox-group v-model="ruleForm.typeM">
          <div class="more"><el-checkbox value="Online activities" name="type">
              <span class="opt">A</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"> <el-checkbox value="Promotion activities" name="type">
              <span class="opt">B</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"><el-checkbox value="Offline activities" name="type">
              <span class="opt">C</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"> <el-checkbox value="Simple brand exposure" name="type">
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
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.inp {
  display: inline-block;
  height: 30px;
  margin-bottom: 6px;

  .A {
    width: 1100px;
    height: 35px;
    outline: none;
    margin-left: 10px;
    vertical-align: top;
    border: 1px solid #c0c4cc;
    border-radius: 3px;
  }
}

.opt {
  float: left;
  margin-top: 11px;
}

.el-form-item--default {
  margin-bottom: 25px;
}

.more {
  height: 50px;
}
</style>
