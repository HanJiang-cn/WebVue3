<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import ewm from '@/assets/ewm.png'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const activeName = ref('1')
// 表单数据
const formData = ref({
  phone: {
    phones: '',
    code: ''
  },
  users: {
    userAccount: '',
    userPassword: ''
  }
})
const basicRules = {
  phones: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确', trigger: 'change' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ],
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ]
}
const form1 = ref()
const form2 = ref()

// 手机号登录
const handleSubmitForm1 = () => {
  form1.value.validate((valid) => {
    if (valid) {
      // 调用接口
      ElNotification({
        title: '成功',
        message: '登陆成功',
        type: 'success',
      })
      // 清除表单
      form1.value.resetFields()
    } else {
      ElNotification({
        title: '失败',
        message: '用户名密码或账户有误',
        type: 'error',
      })
    }
  }
  )

}

// 账号登录
const handleSubmitForm2 = async () => {
  form2.value.validate(async (valid) => {
    if (valid) {
      await userStore.login(formData.value.users)
      if (userStore.id) {
        router.push('/')
      }
    }
  })
}

// 验证码倒计时
const isCounting = ref(false)
const countdown = ref(60)

const startCountdown = () => {
  form1.value.validateField('phones', (valid) => {
    if (valid) {
      isCounting.value = true
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value === 0) {
          clearInterval(timer)
          isCounting.value = false
          countdown.value = 60
        }
      }, 1000)
    }
  })
}
</script>

<template>
  <el-card class="login">
    <!-- <img src="https://static.leetcode.cn/cn-mono-assets/production/assets/logo-dark-cn.4c5e285b.svg" alt="logo"
      style="width: 100px;"> -->
    <div class="login-title">
      <h2>用户登录</h2>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="微信登陆" name="1">
        <template #default>
          <div class="wx-ma">
            <img :src="ewm" />
            <p>微信扫码登录</p>
          </div>
        </template> </el-tab-pane>
      <el-tab-pane label="手机号登录" name="2">
        <template #default>
          <div class="phone">
            <el-form :model="formData.phone" :rules="basicRules" ref="form1">
              <el-form-item prop="phones">
                <el-input placeholder="请输入手机号" v-model="formData.phone.phones">
                  <template #prefix>
                    +86&nbsp;
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入验证码" v-model="formData.phone.code">
                  <template #append>
                    <el-button :disabled="isCounting" @click="startCountdown">
                      {{ isCounting ? `${countdown}秒后重试` : '获取验证码' }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 100%; margin-top: 5px;" @click="handleSubmitForm1">登录</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="账号登录" name="3">
        <template #default>
          <div class="user">
            <el-form :model="formData.users" :rules="basicRules" ref="form2">
              <el-form-item prop="name">
                <el-input placeholder="请输入账号" v-model="formData.users.userAccount">
                  <template #prefix>
                    <el-icon>
                      <UserFilled />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="formData.users.userPassword" type="password" show-password
                  @keyup.enter="handleSubmitForm2">
                  <template #prefix>
                    <el-icon>
                      <LockFilled />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" style="width: 100%; margin-top: 5px;" @click="handleSubmitForm2">登录</el-button>
            <div class="user-bottom">
              <div class="register-link">
                没有账号？<router-link to="register">立即注册</router-link>
              </div>
              <el-button text class="fr" style="margin-top: 10px;">忘记密码</el-button>
            </div>
          </div>
        </template>
      </el-tab-pane>
      <div class="login-bottom">
        <el-divider>更多登录方式</el-divider>
        <el-button icon="WechatOutlined" link>微信</el-button>
        <el-button icon="QqOutlined" link>QQ</el-button>
        <el-button icon="GithubOutlined" link>Github</el-button>
      </div>
    </el-tabs>
  </el-card>
</template>

<style lang="less" scoped>
.login {
  width: 90%;
  max-width: 450px;
  margin: 2rem auto;
  border-radius: 15px;

  .login-title {
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: bold;
      color: #000;
    }
  }

  :deep(.el-tabs) {
    .is-active {
      color: #000;
    }

    .el-tabs__header {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      margin-bottom: 20px;

      .el-tabs__item {
        width: 110px;
        text-align: center;
        font-size: 16px;
        padding: 0 10px;
      }

      .el-tabs__nav-wrap {
        display: flex;
        justify-content: center;

        &::after {
          width: 0;
        }

      }

      .el-tabs__active-bar {
        width: 90px !important;
      }
    }
  }

  .wx-ma {
    text-align: center;

    img {
      width: 60%;
    }

    p {
      font-weight: 500;
    }
  }

  .phone {
    margin-left: 30px;
    margin-right: 30px;
  }

  .user {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;

    .user-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .register-link {
        font-size: 14px;
        color: #409EFF;

        a {
          color: #409EFF;
          text-decoration: none;

          &:hover {
            text-decoration: none;
            color: #0080ff;
          }
        }
      }
    }
  }

  // .el-form {
  //   --el-border-radius-base: 10px !important;

  //   .el-input {
  //     // margin-bottom: 20px;
  //     height: 40px;
  //     border-radius: 10px;
  //   }

  //   :deep(.el-input-group__append) {
  //     background: transparent !important;
  //     // border: none !important;

  //     &:hover {
  //       color: #409EFF !important;
  //     }
  //   }
  // }
  :deep(.el-input) {
    --el-input-border-color: #fff !important;
    --el-input-focus-border-color: #fff !important;
    --el-input-hover-border-color: #fff !important;
    --el-color-danger: #fff !important;
    --el-input-border-radius: 0 !important;
    border-bottom: #e9e9e9 1px solid !important;
    height: 50px !important;
    margin-bottom: 15px !important;

    &:hover {
      border-bottom-color: #409EFF !important;
    }

    &.is-focus {
      border-bottom-color: #409EFF !important;
    }
  }

  :deep(.el-input__inner) {
    border: 0;
    border-radius: 0px;
  }

  :deep(.el-input-group__append) {
    background-color: #fff !important;
  }

  :deep(.el-input-group__append:hover) {
    color: #409EFF !important;
  }

  .login-bottom {
    text-align: center;
  }
}
</style>
