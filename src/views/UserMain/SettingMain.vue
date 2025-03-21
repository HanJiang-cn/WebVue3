<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { updateApi } from '@/api/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const activeMenu = ref('profile')

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
        <div class="content-card">
          <RouterView />
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
    background: transparent;
    border: none;
    box-shadow: none;

    :deep(.blue-menu) {
      background: transparent;
      border-right: none;

      .el-menu-item {
        color: #34495e;
        height: 50px;
        margin: 3px 0;
        transition: all 0.3s;
        border-radius: 6px;
        backdrop-filter: blur(2px);

        &:hover {
          background: rgba(64, 158, 255, 0.1) !important;
          color: #409EFF;
          transform: translateX(5px);
        }

        &.is-active {
          background: rgba(64, 158, 255, 0.2) !important;
          color: #409EFF !important;
          font-weight: 500;
        }

        .el-icon {
          margin-right: 8px;
          font-size: 1.1em;
        }
      }
    }
  }

  .content-card {
    padding: 24px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(4px);

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
