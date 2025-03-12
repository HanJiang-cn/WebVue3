<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useTeamStore } from '@/stores/team'
import router from '@/router'
const teamStore = useTeamStore()
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
     teamStore.addTeam({
        teamname: dynamicValidateForm.teamname,
        contest: dynamicValidateForm.contest,
        teachername: dynamicValidateForm.teachername,
        number: dynamicValidateForm.number,
        name: dynamicValidateForm.name,
        domains: [...dynamicValidateForm.domains],
      })
      router.push('/list')
      alert('submit!')
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
  dynamicValidateForm.email= ''
  dynamicValidateForm.name= ''
  dynamicValidateForm.number= ''
  dynamicValidateForm.number2= ''
  dynamicValidateForm.teachername= ''
  dynamicValidateForm.teamname= ''
  dynamicValidateForm.contest= ''

}



</script>
<template>
<div class="box">
   <div class="title">队伍管理 </div>
   <div class="form">
             <el-form  ref="formRef" style="max-width: 600px" :model="dynamicValidateForm" label-width="auto" class="demo-dynamic">
                     
                    <el-form-item prop="teamname" label="队伍名称" :rules="[{ required: true, message: '队伍名不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.teamname" />
                     </el-form-item>

                      <el-form-item label="参赛项目"  prop="contest"  :rules="[{required: true, message: '参赛项目不能为空', trigger: 'change' }]">
                      <el-select v-model="dynamicValidateForm.contest"  placeholder="请选择">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                      </el-select>
                      </el-form-item>

                      <el-form-item prop="teachername" label="指导老师" :rules="[{ required: true, message: '姓名不能为空', trigger: 'blur' }]">
                        <el-input v-model="dynamicValidateForm.teachername" />
                     </el-form-item>

                     <el-form-item prop="number" label="联系方式" :rules="[{ required: true, message: '联系方式不能为空', trigger: 'blur' },{  pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change']}]">
                        <el-input v-model="dynamicValidateForm.number" />
                     </el-form-item>

                        <div  v-for="(domain, index) in dynamicValidateForm.domains"  :key="domain.key"  class="form-group" >
                           <!-- 队员输入项 -->
                            <el-form-item prop="value"   :label="'队员' + index" >
                               <el-input v-model="domain.value" />
                            </el-form-item>

                           <!-- 联系方式输入项 -->
                            <el-form-item prop="member"  :label="'联系方式' + index"   >
                                 <el-input v-model="domain.member" />
                             </el-form-item>

                             <!-- 共享的删除按钮 -->
                            <el-button class="mt-2" @click.prevent="removeDomain(domain)">
                                删除
                           </el-button>
                        </div>



                     <el-form-item class="style2">
                        <el-button class="style" type="primary" @click="submitForm(formRef)">完成</el-button>
                        <el-button @click="addDomain">添加新成员</el-button>
                        <el-button  @click="resetForm(formRef)">重置</el-button>
  
                     </el-form-item>
             </el-form>
   </div>
</div>
</template>
<style lang="less" scoped>
.style {
    margin-left: 80px;
}
.style2 {
  margin-top: 20px; 
}

.box {
    width: 90%;
    max-width: 800px; // 更紧凑的宽度
    margin: 2rem auto;
    position: relative;

    &::before {
        content: '';
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        z-index: -1;
    }

    .form {
        background: rgba(255, 255, 255, 0.98);
        padding: 2.5rem;
        border-radius: 1.5rem;
        box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.12);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: transform 0.3s ease;
        
        &:hover {
            transform: translateY(-4px);
        }
    }

    .title {
        font-size: 2.2rem;
        font-weight: 700;
        color: #2c3e50;
        text-align: center;
        margin-bottom: 2.5rem;
        position: relative;
        
        &::after {
            content: "";
            position: absolute;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 4rem;
            height: 0.25rem;
            background: linear-gradient(90deg, #409EFF, #67C23A);
            border-radius: 1rem;
        }
    }

    .form-group {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 1.5rem;
        align-items: center;
        padding: 1.5rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);

        &:last-child {
            border-bottom: none;
        }

        .el-form-item {
            margin-bottom: 0;
        }

        .el-button {
            align-self: center;
            margin-top: 0.5rem;
        }
    }

    .el-form-item {
        margin-bottom: 1.8rem;

        &:last-child {
            margin-bottom: 0;
        }

        &__label {
            font-weight: 500;
            color: #606266;
        }
    }

    .el-input {
        transition: all 0.2s ease;

        &:hover :deep(.el-input__wrapper) {
            box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
    }

    .el-button {
        &--primary {
            background: linear-gradient(135deg, #409EFF, #67C23A);
            border: none;
            padding: 0.8rem 2rem;
            transition: all 0.2s ease;

            &:hover {
                opacity: 0.9;
                transform: translateY(-1px);
            }
        }

        + .el-button {
            margin-left: 1rem;
        }
    }
}

// 响应式调整
@media (max-width: 768px) {
    .box {
        width: 95%;
        padding: 1rem 0;

        .form {
            padding: 1.5rem;
        }

        .form-group {
            grid-template-columns: 1fr;
            gap: 1rem;

            .el-button {
                justify-self: start;
                margin-top: 0;
            }
        }

        .title {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
        }
    }
}

@keyframes gradientShift {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>