<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { addApi } from '@/api/question'
const ruleFormRef = ref()
const ruleForm = reactive({
  answer: '',
  content: '',
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000
  },
  tags: [],
  title: '',
})
const switchOptions = ref([])
const options = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '2',
        label: '2',
        children: [
          {
            value: '3',
            label: '3'
          },
        ]
      },
    ]
  },
]
const locationMOptions = ['简单', '适中', '困难']

const rules ={

  tags: [
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
  typeM: [
    {
      type: 'array',
      required: true,
      message: '请选择选项',
      trigger: 'change',
    },
  ],
  questionM: [
    { required: true, message: '请输入题目', trigger: 'blur' },
  ]
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
const submitForm = () => {
  ruleForm.tags = ruleForm.tags.concat(switchOptions.value)
  console.log(ruleForm)

  // 验证表单
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 提交表单数据
      const res = await addApi(ruleForm)
      console.log(res)
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
      // 提交成功后删除表单本地存储
      ruleFormRef.value.resetFields()
      localStorage.removeItem('ruleForm')
    } else {
      ElMessage({
        message: '请填写完整信息',
        type: 'warning',
      })
    }
  }
  )

}

const resetForm = () => {
  ruleFormRef.value.resetFields()
}

</script>

<template>
  <div>
    <el-form  ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" size="default" status-icon>
      <el-form-item label="分类" prop="tags">
      <div class="m-4">
        <el-cascader v-model="ruleForm.tags" :options="options" />
      </div>
    </el-form-item>
    <el-form-item label="难度" prop="tags">
      <el-segmented v-model="switchOptions" :options="locationMOptions" />
    </el-form-item>
    <el-form-item label="题目" prop="title">
      <el-input v-model="ruleForm.title" type="textarea" />
    </el-form-item>
      <el-form-item label="选项" prop="typeM">
        <el-checkbox-group v-model="ruleForm.tags">
          <div class="more"><el-checkbox value="A" name="type">
              <span class="opt">A</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"> <el-checkbox value="B" name="type">
              <span class="opt">B</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"><el-checkbox value="C" name="type">
              <span class="opt">C</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
          <div class="more"> <el-checkbox value="D" name="type">
              <span class="opt">D</span>
              <span class="inp"><input type="text" class="A"></span>
            </el-checkbox></div>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="解析" prop="descM">
        <el-input v-model="ruleForm.descM" type="textarea" />
      </el-form-item> -->
      <el-form-item>
      <el-button type="primary" @click="submitForm()">
        创建
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
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
