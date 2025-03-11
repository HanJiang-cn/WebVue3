<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
  name: string
  teachername: string
  number: string
  number2:string
  teamname: string
  contest: string
}>({
  domains: [
    {
        key: 1,
        key2: 1,
        value: '',
        member: '',
        
    },
  ],
  email: '',
   name: '',
   number: '',
   number2:'',
   teachername:'',
   teamname: '',
   contest: '',
})

interface DomainItem {
  key2: number
  key: number
  value: string
  member: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    key2: Date.now(),
    value: '',
    member: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dynamicValidateForm.domains= [
    {
        value: '',
        member: '',
        key2: 0,
        key: 0
    }, 
  ]
}



</script>
<template>
<div class="box">
   <div class="title">队伍创建 </div>
   <div class="form">
             <el-form  ref="formRef" style="max-width: 600px" :model="dynamicValidateForm" label-width="auto" class="demo-dynamic">
                       <el-form-item prop="teachername" label="队伍名称" :rules="[{ required: true, message: '队伍名不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.teachername" />
                     </el-form-item>
                      <el-form-item label="参赛项目"  prop="contest"  :rules="[{required: true, message: '不能为空', trigger: 'change' }]">
                      <el-select v-model="dynamicValidateForm.contest"  placeholder="请选择">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                      </el-select>
                      </el-form-item>
                      <el-form-item prop="teachername" label="指导老师" :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.teachername" />
                     </el-form-item>
                     <el-form-item prop="number" label="联系方式" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.number" />
                     </el-form-item>
                     <el-form-item prop="name" label="队长" :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.name" />
                     </el-form-item>
                      <el-form-item prop="number2" label="联系方式" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.number2" />
                     </el-form-item>
                     <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :label="'队员' + index" :prop="'domains.' + index + '.value'" :rules="{ required: true, message: '不能为空', trigger: 'blur', }" >
                        <label>队员:{{index}}</label>
                        <el-input v-model="domain.value" />
                        <label>联系方式:</label>
                         <el-input v-model="domain.member" />
                             <el-button class="mt-2" @click.prevent="removeDomain(domain)">
                                删除
                            </el-button>
                     </el-form-item>
                     <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">注册</el-button>
      <el-button @click="addDomain">添加新成员</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
                     </el-form-item>
             </el-form>
   </div>
</div>
</template>
<style lang="less" scoped>
.box {
    width: 90%;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 0;
    position: relative;
    overflow: hidden;
    
    /* 新增渐变背景 */
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        z-index: -1;
    }

    /* 优化表单容器 */
    .form {
        background: rgba(255, 255, 255, 0.95);
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 12px 40px rgba(31, 38, 135, 0.2);
        }
    }

    .title {
        font-size: 28px;
        font-weight: 600;
        color: #2c3e50;
        padding: 20px 0;
        margin-bottom: 30px;
        position: relative;
        text-align: center;
        
        &::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #409EFF, #67C23A);
            border-radius: 2px;
        }
    }

    /* 优化表单元素间距 */
    .el-form-item {
        margin-bottom: 22px;
        
        &:last-child {
            margin-bottom: 0;
        }
    }

    /* 添加动画粒子背景 */
    &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.05;
        z-index: -1;
        animation: grain 8s steps(10) infinite;
    }
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0) }
  10% { transform: translate(-5%, -10%) }
  30% { transform: translate(3%, -15%) }
  50% { transform: translate(-5%, 5%) }
  70% { transform: translate(10%, 8%) }
  90% { transform: translate(5%, -5%) }
}

/* 优化输入框样式 */
.el-input {
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
    }
    
    &:focus-within {
        box-shadow: 0 2px 12px rgba(64, 158, 255, 0.2);
    }
}

/* 响应式优化 */
@media (max-width: 768px) {
    .box {
        padding: 20px 0;
        
        .form {
            padding: 20px;
        }
        
        .title {
            font-size: 22px;
        }
    }
}
</style>