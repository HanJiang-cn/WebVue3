<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'

const formData = ref({
  username: '',
  password: '',
  confirm: '',
  email: '',
  phone: '',
  code: ''
})

const validatePass2 = (rule, value, callback) => {
  if (value !== formData.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  confirm: [{ validator: validatePass2, trigger: 'blur' }],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

const formRef = ref()
const countdown = ref(0)
const isSending = ref(false)

const handleRegister = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      ElNotification({
        title: '注册成功',
        message: '欢迎加入我们！',
        type: 'success',
        duration: 2000
      })
      formRef.value.resetFields()
    }
  })
}

const handleSendCode = () => {
  if (!formData.value.phone) {
    ElMessage.warning('请先输入手机号')
    return
  }

  if (!/^1[3-9]\d{9}$/.test(formData.value.phone)) {
    ElMessage.error('手机号格式不正确')
    return
  }

  isSending.value = true
  countdown.value = 60
  ElMessage.success('验证码已发送')

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isSending.value = false
    }
  }, 1000)
}
</script>

<template>
  <el-card class="register-container">
    <div class="register-header">
      <h2>新用户注册</h2>
      <p>你现在拥有账号? <el-link type="primary" href="/accounts/login">立即登录</el-link></p>
    </div>

    <el-form :model="formData" :rules="rules" ref="formRef" style="margin: 5px 25px;">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" prefix-icon="UserFilled" clearable />
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" prefix-icon="Message" clearable />
      </el-form-item>

      <el-form-item prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号" prefix-icon="Iphone" clearable>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <div class="code-input">
          <el-input v-model="formData.code" placeholder="请输入验证码" maxlength="6" clearable />
          <el-button :disabled="isSending" @click="handleSendCode" class="send-btn">
            {{ isSending ? `${countdown}秒后重试` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码" prefix-icon="Lock" show-password />
      </el-form-item>

      <el-form-item prop="confirm">
        <el-input v-model="formData.confirm" type="password" placeholder="请再次确认密码" prefix-icon="Unlock" show-password />
      </el-form-item>

      <el-button type="primary" class="submit-btn" @click="handleRegister">
        立即注册
      </el-button>
    </el-form>
  </el-card>
</template>

<style lang="less" scoped>
.register-container {
  width: 500px;
  margin: 0 auto;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .register-header {
    text-align: center;
    padding: 30px 0;

    h2 {
      color: #303133;
      margin-bottom: 8px;
    }

    p {
      color: #909399;
      font-size: 14px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 24px;

    .el-input__wrapper {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 2px 8px;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        border-bottom-color: #c0c4cc;
        box-shadow: 0 1px 0 #c0c4cc;
      }

      &.is-focus {
        border-bottom-color: #409EFF;
        box-shadow: 0 1px 0 #409EFF;
      }
    }

    .el-input__prefix {
      padding-right: 8px;

      .el-icon {
        color: #909399;
        font-size: 18px;
      }
    }
  }

  .code-input {
    width: 100%;
    display: flex;
    align-items: center;

    .el-input {
      flex: 1;
      margin-right: 12px;
    }

    .send-btn {
      color: #303133;
      padding: 8px 16px;
      border-radius: 6px;
    }
  }

  .submit-btn {
    width: 100%;
    border-radius: 6px;
    background: linear-gradient(45deg, #409EFF, #337ecc);
    transition: all 0.3s;
  }
}
</style>
