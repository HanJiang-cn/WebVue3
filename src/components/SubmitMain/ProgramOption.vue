<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
     <el-form-item label="分类" prop="regionP">
      <div class="m-4">
    <el-cascader :show-all-levels="false"  v-model="ruleForm.regionP" :options="options" @change="handleChange" />
  </div>
    </el-form-item>
        <el-form-item label="难度" prop="locationP">
      <el-segmented v-model="ruleForm.locationP" :options="locationPOptions" />
    </el-form-item>
    <!-- <div id="text"><TinymceEdit></TinymceEdit></div> -->
     <el-form-item label="题目" prop="question">
<TinymceEdit style="width: 85%;"></TinymceEdit>
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
    <el-form-item label="解析" prop="descP">
      <el-input v-model="ruleForm.descP" type="textarea" />
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
import TinymceEdit from '@/components/TinymceEdit.vue'
interface Sample {
  inp: string
  exp: string
}
interface RuleForm {
  regionP: string[]
  locationP: string
   question:string
  descP: string
  inp: string
  exp:string
   samples: Sample[]
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  regionP: [],
  locationP: '',
  question: '',
  descP: '',
  samples: [{ inp: '', exp: '' }],
  inp: '',
  exp: ''
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
const locationPOptions = ['简单', '适中', '困难']

const rules = reactive<FormRules<RuleForm>>({
  regionP: [
    {
      required: true,
      message: '请选择分类',
      trigger: 'change',
    },
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
  descP: [
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
      ruleForm.regionP = []
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  ruleForm.regionP = []
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
.el-form-item--default{
  margin-bottom: 25px;
}

</style>
