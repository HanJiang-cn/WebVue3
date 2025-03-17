<template>

   <el-button type="primary"  @click="dialogVisible = true">添加成员</el-button>

  <el-dialog  v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose" >
    <el-form :model="form" label-width="auto" style="max-width: 600px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="姓名:" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="性别:">
      <el-radio-group v-model="form.Gender">
        <el-radio value="he">男</el-radio>
        <el-radio value="she">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="人员类型:">
      <el-radio-group v-model="form.type">
        <el-radio value="player">选手</el-radio>
        <el-radio value="teacher">老师</el-radio>
        <el-radio value="captain">队长</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机:" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="单位或学校:" prop="unit">
      <el-input v-model="form.unit" />
    </el-form-item>
    <el-form-item label="专业:" prop="major">
      <el-input v-model="form.major" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const submitForm = async (formEl: FormInstance | undefined) => {
   
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = false 
      console.log('submit!')
    } else {
       dialogVisible.value = true
      console.log('error submit!', fields)
    }
  })
}
const cancel = () => {
   dialogVisible.value = false 
}

interface RuleForm {
  name: string
  type: string
  Gender: string 
  phone: string
  email: string
  unit: string
  major: string
}
// do not use same name with ref
const form = reactive<RuleForm>({
 name: '',
 type: '',
 Gender: '',
 phone: '',
 email: '',
 unit: '',
 major: '',
})
const rules = reactive<FormRules<RuleForm>>({
 name: [
   { required: true, message: '请输入姓名', trigger: 'blur' },
   { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
 ],
 phone: [
   { required: true, message: '请输入手机号', trigger: 'blur' },
   { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' },
 ],
 email: [
   { required: true, message: '请输入邮箱', trigger: 'blur' },
   { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }, 
 ],
 unit: [
   { required: true, message: '请输入单位或学校', trigger: 'blur' },
   { min: 2, message: '长度在 3 到 5 个字符', trigger: 'blur' }, 
 ],
 major: [
   { required: true, message: '请输入专业', trigger: 'blur' },
   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }, 
 ]
})

</script>


<style lang="less" scoped>
 .el-form-item {
   .el-button {
    margin-top: 20px;
    margin-left: 100px;
   }
 }
</style>