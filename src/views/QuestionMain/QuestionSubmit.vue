<script lang="ts" setup>
// import { onMounted, reactive, ref, watch } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
// import { addApi } from '@/api/question'
// import { ElMessage } from 'element-plus'
// import MoreOptions from '@/components/QuestionMain/SubmitMain/MoreOptions.vue'
// import JudgeOption from '@/components/QuestionMain/SubmitMain/JudgeOption.vue'
// import BlanksOptions from '@/components/QuestionMain/SubmitMain/BlanksOptions.vue'
import ProgramOption from '@/components/QuestionMain/SubmitMain/ProgramOption.vue'
// import ShortOption from '@/components/QuestionMain/SubmitMain/ShortOption.vue'
// const activeName = ref(localStorage.getItem('activeTab') || 'first')

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
//   // 保存当前选中的标签页
//   localStorage.setItem('activeTab', activeName.value)
// }
// const ruleFormRef = ref()
// const ruleForm = reactive({
//   answer: '',
//   content: '',
//   judgeConfig: {
//     memoryLimit: 1000,
//     stackLimit: 1000,
//     timeLimit: 1000
//   },
//   tags: [],
//   title: '',
//   diffcult: '',
// })
// const options = [
//   {
//     value: '1',
//     label: '1',
//     children: [
//       {
//         value: '2',
//         label: '2',
//         children: [
//           {
//             value: '3',
//             label: '3'
//           },
//         ]
//       },
//     ]
//   },
// ]

// const locationOptions = ['简单', '适中', '困难']
// const rules = {
//   tags: [
//     {
//       required: true,
//       message: '请选择分类',
//       trigger: 'change',
//     },
//   ],
//   diffcult: [
//     {
//       required: true,
//       message: '请选择难度',
//       trigger: 'change',
//     },
//   ],

//   answer: [
//     {
//       required: true,
//       message: '请选择答案',
//       trigger: 'change',
//     },
//   ],
//   desc: [
//     { required: true, message: '请输入解析', trigger: 'blur' },
//   ],
//   title: [
//     { required: true, message: '请输入题目', trigger: 'blur' },
//   ]
// }

// // 保存表单数据到 LocalStorage
// const saveFormToLocalStorage = () => {
//   localStorage.setItem('ruleForm', JSON.stringify(ruleForm))
// }

// // 从 LocalStorage 恢复表单数据
// const loadFormFromLocalStorage = () => {
//   const savedForm = localStorage.getItem('ruleForm')
//   if (savedForm) {
//     Object.assign(ruleForm, JSON.parse(savedForm))
//   }
// }

// // 在组件挂载时加载表单数据和选中的标签页
// onMounted(() => {
//   loadFormFromLocalStorage()
//   activeName.value = localStorage.getItem('activeTab') || 'first'
// })

// // 在表单数据变化时保存到 LocalStorage
// watch(ruleForm, () => {
//   saveFormToLocalStorage()
// }, { deep: true })

// const handleChange = (value: unknown) => {
//   console.log(value)
// }

// const submitForm = () => {
//   // // 将选中的标签页添加到 tags 数组中
//   // ruleForm.tags = ruleForm.tags.concat(switchOptions.value)
//   console.log(ruleForm)

//   // 验证表单
//   ruleFormRef.value.validate(async (valid: boolean) => {
//     if (valid) {
//       // 提交表单数据
//       const res = await addApi(ruleForm)
//       console.log(res)
//       ElMessage({
//         message: '提交成功',
//         type: 'success',
//       })
//       // 提交成功后删除表单本地存储0
//       ruleFormRef.value.resetFields()
//       localStorage.removeItem('ruleForm')
//     } else {
//       ElMessage({
//         message: '请填写完整信息',
//         type: 'warning',
//       })
//     }
//   }
//   )

// }
// const resetForm = () => {
//   ruleFormRef.value.resetFields()
// }


</script>
<template>
  <!-- <div class="create">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="单选题" name="first">
        <el-form ref="ruleFormRef" style="max-width: 100%" :model="ruleForm" :rules="rules" label-width="auto"
          class="demo-ruleForm" size="default">
          <el-form-item prop="tags" label="分类">
            <div class="m-4">
              <el-cascader :show-all-levels="false" v-model="ruleForm.tags" :options="options" @change="handleChange" />
            </div>
          </el-form-item>
          <el-form-item label="难度" prop="diffcult">
            <el-segmented v-model="ruleForm.diffcult" :options="locationOptions" />
          </el-form-item>
          <el-form-item label="题目" prop="title">
            <el-input v-model="ruleForm.title" type="textarea" />
          </el-form-item>
          <el-form-item label="选项" prop="answer" inline="false">
            <el-radio-group v-model="ruleForm.answer" inline="false">
              <div><el-radio value="Sponsorship" border>
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
          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              创建
            </el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="多选题" name="second">
        <MoreOptions></MoreOptions>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="third">
        <JudgeOption></JudgeOption>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="fourth">
        <BlanksOptions></BlanksOptions>
      </el-tab-pane>
      <el-tab-pane label="编程题" name="five">
        <ProgramOption></ProgramOption>
      </el-tab-pane>
      <el-tab-pane label="简答题" name="six">
        <ShortOption></ShortOption>
      </el-tab-pane>
    </el-tabs>
  </div> -->
  <div class="create">
    <div class="title"><h2>新建试题</h2></div>
    <ProgramOption></ProgramOption>
  </div>
</template>
<style lang="less" scoped>
.create {
  max-width: 1500px;
h2{
  margin-bottom: 20px;
}
  .el-tabs {
    width: 100%;
    padding-left: 30px;
  }
}

.el-form-item--default {
  margin-bottom: 25px;
}

.inp {
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

.opt {
  float: left;
  margin-top: 3px;
}

.el-tabs {
  --el-tabs-header-height: 50px;
}
</style>
