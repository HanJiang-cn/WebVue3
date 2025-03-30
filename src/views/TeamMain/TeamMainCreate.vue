<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { addTeamApi, deleteTeamApi } from '@/api/team'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const formRef = ref(null)
// 表单数据
const form = ref({
  name: '',
  description: '',
  status: '0',
  password: '',
  maxNum: 0,
  expireTime: '',
  members: [
    { name: '', phone: '', role: '' }
  ]
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '队伍名称不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '队伍名称长度为2-20个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '队伍描述不能为空', trigger: 'blur' },
    { min: 10, max: 200, message: '队伍描述长度为10-200个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '队伍状态不能为空', trigger: 'change' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为6-20个字符', trigger: 'blur' }
  ],
  maxNum: [
    { required: true, message: '最大人数不能为空', trigger: 'blur' },
    { min: 1, max: 20, message: '最大人数为1-20人', trigger: 'blur' }
  ],
  expireTime: [
    { required: true, message: '过期时间不能为空', trigger: 'blur' }
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
      try {
        const res = addTeamApi(form.value)
        console.log(res);
        // if (res.code === 0) {
        //   ElNotification({
        //     title: '成功',
        //     message: '队伍创建成功',
        //     type: 'success'
        //   })
        //   resetForm()
        // }
      } catch (error) {
        ElMessage.error('创建失败')
      }
    } else {
      console.log('表单验证失败')
    }
  })
}

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    status: '0',
    password: '',
    maxNum: 3,
    expireTime: '',
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
        <el-form-item label="队伍名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入队伍名称" />
        </el-form-item>
        <el-form-item label="队伍描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入队伍描述" />
        </el-form-item>
        <el-form-item label="队伍状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio value="0">公开</el-radio>
            <el-radio value="1">私有</el-radio>
            <el-radio value="2">公开加密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="form.status === '2'">
          <el-input v-model="form.password" type="password" placeholder="请输入队伍密码" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="最大人数" prop="maxNum">
              <el-input v-model="form.maxNum" type="number" placeholder="请输入最大人数" min="0" max="20" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="过期时间" prop="expireTime">
              <el-date-picker v-model="form.expireTime" type="datetime" placeholder="选择过期时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
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
@primary-color: #409EFF;
@light-blue: #ecf5ff;
@dark-blue: #1a56a8;
@border-color: #EBEBEB;
@success-color: #67c23a;
@error-color: #f56c6c;

.form-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .form-title {
    font-size: 20px;
    color: #2c3e50;
    margin: 0 0 24px;
    padding-left: 12px;
    border-left: 4px solid #409EFF;
  }

  .form-card {
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid rgba(@primary-color, 0.1);

    .section-title {
      font-size: 1.1rem;
      color: @dark-blue;
      margin: 0 0 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid @border-color;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 60px;
        height: 2px;
        background: @primary-color;
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 22px;

      .el-form-item__label {
        color: #606266;
        font-weight: 500;
      }

      .el-input__wrapper {
        border-radius: 6px;
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 0 0 1px @primary-color inset;
        }
      }
    }

    .member-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .member-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #fff;
      border-radius: 6px;
      transition: all 0.3s;

      &:hover {
        border-color: @primary-color;
        box-shadow: 0 4px 12px rgba(@primary-color, 0.08);
      }

      .member-title {
        min-width: 60px;
        color: @dark-blue;
        font-weight: 500;
      }

      .member-input {
        flex: 1;

        &:first-child {
          max-width: 180px;
        }
      }

      .el-select {
        width: 120px;
      }

      .el-button {
        padding: 8px 12px;
        border-radius: 6px;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .add-button {
      width: 100%;
      margin-top: 16px;
      background: linear-gradient(45deg, @primary-color, #66b1ff);
      border: none;
      color: white;
      height: 40px;
      font-weight: 500;

      &:hover {
        opacity: 0.9;
      }
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
