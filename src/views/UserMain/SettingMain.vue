<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateApi } from '@/api/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

// 个人资料表单数据
const formData = ref({
  userAvatar: '',
  userName: '',
  userEmail: '',
  userProfile: '',
})
formData.value = {
  userAvatar: userStore.userAvatar,
  userName: userStore.userName,
  userEmail: userStore.userEmail,
  userProfile: userStore.userProfile,
}

const activeMenu = ref('profile')

// 安全设置
const notifySystem = ref(true)
const notifyEmail = ref(true)
const notifySMS = ref(false)

const privacyProfile = ref(true)
const privacyEmail = ref(false)
const privacyActivity = ref(true)

const handleMenuSelect = (index) => {
  activeMenu.value = index
}

const saveProfile = async () => {
  await updateApi(formData.value).then((res) => {
    if (res.code === 0) {
      ElMessage.success('个人资料更新成功')
      userStore.getUserInfo()
    }
  })
  // 更新 store 中的用户信息
}
</script>


<template>
  <div class="account-container">
    <el-row :gutter="20">
      <!-- 左侧菜单 -->
      <el-col :xs="24" :sm="8" :md="6">
        <el-card class="menu-card">
          <div class="user-profile">
            <el-avatar :size="80" src="https://avatar.example.com/user.jpg" />
            <h3>{{ userStore.userName }}</h3>
            <p class="user-email">{{ userStore.userEmail }}</p>
          </div>

          <el-menu class="blue-menu" :default-active="activeMenu" @select="handleMenuSelect">
            <el-menu-item index="profile">
              <el-icon>
                <User />
              </el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="security">
              <el-icon>
                <Lock />
              </el-icon>
              <span>安全设置</span>
            </el-menu-item>
            <el-menu-item index="notification">
              <el-icon>
                <Bell />
              </el-icon>
              <span>消息通知</span>
            </el-menu-item>
            <el-menu-item index="privacy">
              <el-icon>
                <View />
              </el-icon>
              <span>隐私设置</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <!-- 右侧内容 -->
      <el-col :xs="24" :sm="16" :md="18">
        <!-- 个人资料 -->
        <div v-show="activeMenu === 'profile'" class="content-card">
          <h2 class="section-title">个人资料</h2>
          <el-form label-width="120px" :model="formData" :rules="rules">
            <el-form-item label="头像">
              <el-upload class="avatar-uploader" action="http://120.46.86.24:8080/api/file/upload"
                :show-file-list="false">
                <img v-if="avatar" :src="formData.userAvatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formData.userName" />
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker v-model="formData.userBirthday" type="date" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="formData.userEmail" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="formData.userProfile" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveProfile">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 安全设置 -->
        <div v-show="activeMenu === 'security'" class="content-card">
          <h2 class="section-title">安全设置</h2>
          <div class="security-item">
            <el-alert title="账户密码" type="info" :closable="false">
              <template #default>
                <span class="security-status">最后修改时间：2023-08-01</span>
                <el-button type="text" class="modify-btn">修改密码</el-button>
              </template>
            </el-alert>
          </div>
          <div class="security-item">
            <el-alert title="两步验证" type="info" :closable="false">
              <template #default>
                <span class="security-status">未启用</span>
                <el-button type="text" class="modify-btn">立即设置</el-button>
              </template>
            </el-alert>
          </div>
        </div>

        <!-- 消息通知 -->
        <div v-show="activeMenu === 'notification'" class="content-card">
          <h2 class="section-title">消息通知</h2>
          <el-form label-width="200px">
            <el-form-item label="系统通知">
              <el-switch v-model="notifySystem" active-color="#409EFF" />
            </el-form-item>
            <el-form-item label="邮件通知">
              <el-switch v-model="notifyEmail" active-color="#409EFF" />
            </el-form-item>
            <el-form-item label="短信通知">
              <el-switch v-model="notifySMS" active-color="#409EFF" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 隐私设置 -->
        <div v-show="activeMenu === 'privacy'" class="content-card">
          <h2 class="section-title">隐私设置</h2>
          <el-form label-width="200px">
            <el-form-item label="公开个人资料">
              <el-switch v-model="privacyProfile" active-color="#409EFF" />
            </el-form-item>
            <el-form-item label="公开邮箱地址">
              <el-switch v-model="privacyEmail" active-color="#409EFF" />
            </el-form-item>
            <el-form-item label="公开活动记录">
              <el-switch v-model="privacyActivity" active-color="#409EFF" />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.account-container {
  padding: 20px;
  min-height: 100vh;

  .menu-card {
    background: #1f2d3d;
    border-radius: 8px;
    border: none;

    .user-profile {
      text-align: center;
      padding: 20px 0;
      color: white;

      h3 {
        margin: 10px 0 5px;
        color: white;
      }

      .user-email {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9em;
      }
    }

    :deep(.blue-menu) {
      background: transparent;
      border-right: none;

      .el-menu-item {
        color: rgba(255, 255, 255, 0.8);
        height: 50px;
        margin: 5px 0;
        transition: all 0.3s;

        &:hover {
          background: lighten(#1f2d3d, 10%);
        }

        &.is-active {
          background: #409EFF;
          color: white;
          border-radius: 4px;
        }

        .el-icon {
          margin-right: 8px;
        }
      }
    }
  }

  .content-card {
    background: #ffffff;
    padding: 24px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .section-title {
      color: #409EFF;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
    }

    .avatar-uploader {
      :deep(.el-upload) {
        border: 2px dashed #409EFF;
        border-radius: 6px;
        cursor: pointer;
        width: 120px;
        height: 120px;

        &:hover {
          border-color: darken(#409EFF, 10%);
        }

        .avatar-uploader-icon {
          font-size: 32px;
          color: #8c939d;
          width: 120px;
          height: 120px;
          line-height: 120px;
        }

        .avatar {
          width: 100%;
          height: 100%;
        }
      }
    }

    .security-item {
      margin-bottom: 16px;

      :deep(.el-alert) {
        background: #f4f4f5;
        border-radius: 6px;

        .security-status {
          color: #666;
          margin-right: 20px;
        }

        .modify-btn {
          color: #409EFF;
          float: right;
        }
      }
    }
  }
}
</style>
