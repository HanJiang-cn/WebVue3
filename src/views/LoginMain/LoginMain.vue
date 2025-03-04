<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import ewm from '@/assets/ewm.png'

const activeName = ref('1')

const formData = ref({
  phone: {
    phones: '',
    code: ''
  },
  users: {
    name: '',
    password: ''
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
  name: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ]
}
const form1 = ref()
const form2 = ref()

const handleSubmitForm1 = () => {
  form1.value.validate((valid) => {
    if (valid) {
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
const handleSubmitForm2 = () => {
  form2.value.validate((valid) => {
    if (valid) {
      ElNotification({
        title: '成功',
        message: '登陆成功',
        type: 'success',
      })
      form2.value.resetFields()
    } else {
      ElNotification({
        title: '失败',
        message: '用户名密码或账户有误',
        type: 'error',
      })
    }
  })
}
</script>

<template>
  <el-card class="login">
    <img src="https://static.leetcode.cn/cn-mono-assets/production/assets/logo-dark-cn.4c5e285b.svg" alt="logo"
      style="width: 100px;">
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
                    <el-button>获取验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button type="info" style="width: 100%; margin-top: 5px;" @click="handleSubmitForm1">登录</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="账号登录" name="3">
        <template #default>
          <div class="user">
            <el-form :model="formData.users" :rules="basicRules" ref="form2">
              <el-form-item prop="name">
                <el-input placeholder="请输入账号" v-model="formData.users.name">
                  <template #prefix>
                    <el-icon>
                      <UserFilled />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="formData.users.password" type="password" show-password>
                  <template #prefix>
                    <el-icon>
                      <LockFilled />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button type="info" style="width: 100%; margin-top: 5px;" @click="handleSubmitForm2">登录</el-button>
            <el-button text class="fr" style="margin-top: 10px;">忘记密码</el-button>
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
  width: 35%;
  margin: 0 auto;
  border-radius: 15px;

  :deep(.el-tabs) {
    .is-active {
      color: #000;
    }

    .el-tabs__header {
      // display: flex;
      // justify-content: center;
      width: 100%;
      height: 50px;
      margin: 0 auto;
      margin-bottom: 20px;

      .el-tabs__item {
        width: 110px;
        text-align: center;
        font-size: 16px;
        padding: 0 10px;

        &:hover {
          color: #000;
        }
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
        background-color: #464646bf;
      }
    }

  }

  .wx-ma {
    text-align: center;

    img {
      width: 50%;
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
