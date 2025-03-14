<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
// 表单数据
const form = ref({
  title: '',
  description: '',
  teacherName: '',
  teacherPhone: '',
  members: [
    { name: '', phone: '', role: '' }
  ]
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '队伍名称不能为空', trigger: 'blur' },
    { min: 4, max: 20, message: '队伍名称长度为4-20个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '队伍描述不能为空', trigger: 'blur' },
    { min: 10, max: 200, message: '队伍描述长度为10-200个字符', trigger: 'blur' }
  ],
  teacherName: [
    { required: true, message: '指导老师姓名不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '指导老师姓名长度为2-10个字符', trigger: 'blur' }
  ],
  teacherPhone: [
    { required: true, message: '指导老师手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  // members: [

  // ],
}

// 添加新成员
const addMember = () => {
  form.value.members.push({ name: '', phone: '' })
}

// 删除成员
const removeMember = (index) => {
  if (form.value.members.length > 1) {
    form.value.members.splice(index, 1)
  } else {
    ElMessage.warning('至少需要保留一位成员')
  }
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 提交表单数据
      console.log('提交数据:', form.value)
    } else {
      console.log('表单验证失败')
    }
  })
  console.log('提交数据:', form.value)
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    teacherName: '',
    teacherPhone: '',
    members: [
      { name: '', phone: '', role: '' }
    ],
  }
}
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">创建新队伍</h2>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <div class="form-card">
        <h4 class="section-title">基本信息</h4>
        <el-form-item label="队伍名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入队伍名称" />
        </el-form-item>
        <el-form-item label="队伍描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入队伍描述" />
        </el-form-item>
      </div>
      <div class="form-card">
        <h4 class="section-title">指导老师</h4>
        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="form.teacherName" placeholder="请输入指导老师姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="teacherPhone">
          <el-input v-model="form.teacherPhone" placeholder="请输入指导老师手机号" />
        </el-form-item>
      </div>
      <div class="form-card">
        <h4 class="section-title">队伍成员</h4>
        <el-form-item prop="members">
          <div class="member-list">
            <div class="member-item" v-for="(member, index) in form.members" :key="index">
              <span class="member-title">成员{{ index + 1 }}</span>
              <el-input v-model="member.name" placeholder="姓名" class="member-input" />
              <el-input v-model="member.phone" placeholder="手机号" class="member-input" />
              <el-select v-model="member.role" placeholder="角色" class="member-input">
                <el-option label="队员" value="member" />
                <el-option label="队长" value=" leader" />
              </el-select>
              <el-button @click="removeMember(index)" type="danger">删除</el-button>
            </div>
          </div>
        </el-form-item>
        <el-button @click="addMember" type="primary" class="add-button">添加成员</el-button>
      </div>
      <div class="action-bar">
        <el-button type="primary" @click="submitForm">
          立即创建
        </el-button>
        <el-button @click="resetForm">
          重置表单
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.form-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .form-title {
    font-size: 18px;
    color: #2c3e50;
    margin: 0 0 24px;
    padding-left: 12px;
    border-left: 4px solid #409EFF;
  }

  .form-card {
    .member-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .member-item {
      display: flex;
      gap: 12px;

      .member-input {
        flex: 1;

        &:first-child {
          max-width: 200px;
        }
      }

      .member-title {
        text-align: right;
        margin-right: 12px;
        color: #606266;
      }
    }

    .add-button {
      margin-top: 12px;
      width: fit-content;
    }
  }

  .section-title {
    font-size: 16px;
    color: #2c3e50;
    margin: 0 0 16px;
  }

  .action-bar {
    margin-top: 32px;
    padding-top: 24px;
    text-align: center;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
