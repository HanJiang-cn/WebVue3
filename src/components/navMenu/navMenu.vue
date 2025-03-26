<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const menuItemsAdmin = ref([
  { name: 'profile', label: '个人中心', icon: 'User' },
  { name: 'settings', label: '账号设置', icon: 'Setting' },
  { name: 'admin', label: '管理员菜单', icon: 'Setting' },
  { name: 'messages', label: '我的消息', icon: 'Message' },
  { name: 'favorites', label: '我的收藏', icon: 'Star' }
])
const menuItems = ref([
  { name: 'profile', label: '个人中心', icon: 'User' },
  { name: 'settings', label: '账号设置', icon: 'Setting' },
  { name: 'messages', label: '我的消息', icon: 'Message' },
  { name: 'favorites', label: '我的收藏', icon: 'Star' }
])

const handelLogin = () => {
  router.push('/accounts/login')
}
const handelRegister = () => {
  router.push('/accounts/register')
}
const handleMenuClick = (item: any) => {
  if (item.name === 'profile') {
    handleNav('/user')
  } else if (item.name === 'settings') {
    handleNav('/user/setting')
  } else if (item.name === 'admin') {
    handleNav('/admin')
  } else if (item.name === 'messages') {
    handleNav('/accounts/notifications')
  } else if (item.name === 'favorites') {
    handleNav('/accounts/collection')
  }
}
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/')
    location.reload()
  })
}
const handleNav = (name: string) => {
  window.open(router.resolve({ path: name, }).href, '_self')
}
</script>

<template>
  <el-row justify="center" align="middle" :gutter="50" style="height: 100%;">
    <!-- 左边 -->
    <el-col :span="11">
      <el-row justify="start" align="middle" style="height: 100%; width: 100%;">
        <el-row :gutter="58" justify="start" align="middle">
          <el-col :span="3">
            <!-- <svg width="59" height="22" viewBox="0 0 59 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M27.8226 17.4752C28.3202 16.1443 28.7218 14.5458 28.9859 12.6607C29.1277 11.6491 29.2845 10.1658 29.4568 8.20813H35.2561C35.2637 8.20813 35.2713 8.20828 35.2789 8.20857C35.6071 8.22119 35.8628 8.49743 35.8502 8.82558L35.4996 17.9427C35.4873 18.262 35.2249 18.5144 34.9054 18.5144H33.2974C32.8595 18.5144 32.5046 18.8694 32.5046 19.3072C32.5046 19.7451 32.8595 20.1 33.2974 20.1H35.4776C36.3533 20.1 37.0631 19.3901 37.0631 18.5144L37.4595 8.20813C37.4595 7.33244 36.7497 6.62254 35.874 6.62254H29.5913C29.671 5.65054 29.7537 4.58575 29.8394 3.42794C29.8718 2.99129 29.544 2.61109 29.1074 2.57874C28.6707 2.54639 28.2905 2.87414 28.2582 3.3108C28.1689 4.51669 28.0829 5.62069 28.0004 6.62254H25.3695C24.9316 6.62254 24.5767 6.97749 24.5767 7.41534C24.5767 7.85318 24.9316 8.20813 25.3695 8.20813H27.8651C27.7 10.07 27.5501 11.4816 27.4157 12.4407C27.1674 14.2124 26.7941 15.6986 26.3374 16.9199C26.0981 17.5599 25.8527 18.0822 25.6163 18.4944C25.5366 18.6333 25.4649 18.7474 25.4029 18.8378C25.3703 18.8853 25.3512 18.9109 25.3475 18.9155C25.0722 19.256 25.1252 19.7552 25.4657 20.0305C25.8062 20.3057 26.3054 20.2528 26.5806 19.9123C26.6737 19.7971 26.8159 19.5898 26.9917 19.2833C27.271 18.7963 27.5531 18.1959 27.8226 17.4752ZM48.5586 17.3184V7.72969H55.6831C56.3474 7.72969 56.883 8.26047 56.883 8.9117V16.4576C56.883 17.1088 56.3474 17.6396 55.6831 17.6396H53.3916C52.7274 17.6396 52.1918 17.1088 52.1918 16.4576V10.1081C52.1918 9.67022 51.8369 9.31528 51.399 9.31528C50.9612 9.31528 50.6062 9.67022 50.6062 10.1081V16.4576C50.6062 17.9877 51.8548 19.2252 53.3916 19.2252H55.6831C57.2199 19.2252 58.4686 17.9877 58.4686 16.4576V8.9117C58.4686 7.38157 57.2199 6.14411 55.6831 6.14411H48.5586V3.76573C48.5586 3.32788 48.2037 2.97294 47.7658 2.97294C47.328 2.97294 46.9731 3.32788 46.9731 3.76573V6.14411H44.1983C43.7604 6.14411 43.4055 6.49905 43.4055 6.9369C43.4055 7.37475 43.7604 7.72969 44.1983 7.72969H46.9731V12.465L44.3002 13.5341C43.8937 13.6968 43.696 14.1581 43.8586 14.5647C44.0212 14.9712 44.4826 15.1689 44.8891 15.0063L46.9731 14.1727V17.3184C46.9731 18.3666 46.0906 19.2252 44.9911 19.2252C44.5532 19.2252 44.1983 19.5801 44.1983 20.018C44.1983 20.4558 44.5532 20.8108 44.9911 20.8108C46.9567 20.8108 48.5586 19.2522 48.5586 17.3184Z"
                fill="black"></path>
              <path
                d="M13.3797 16.4636C13.874 15.9701 14.674 15.9714 15.1667 16.4665C15.6593 16.9616 15.6581 17.7631 15.1638 18.2566L12.9691 20.4481C10.9443 22.4699 7.64261 22.4992 5.58369 20.5162C5.57179 20.5048 4.655 19.6058 1.63058 16.6402C-0.381491 14.6673 -0.581941 11.5104 1.31147 9.4831L4.84172 5.7031C6.7209 3.69085 10.1849 3.47093 12.3335 5.20847L15.5398 7.80152C16.0828 8.24065 16.1676 9.03757 15.7292 9.58151C15.2909 10.1254 14.4953 10.2104 13.9523 9.77127L10.746 7.17824C9.62238 6.26954 7.65677 6.39434 6.68718 7.43259L3.15688 11.2126C2.23512 12.1996 2.33607 13.7895 3.39833 14.8311C5.61922 17.0088 7.33084 18.6871 7.33282 18.689C8.40324 19.72 10.134 19.7046 11.185 18.6551L13.3797 16.4636Z"
                fill="#FFA116"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.04824 14.2706C7.35039 14.2706 6.78467 13.7039 6.78467 13.0048C6.78467 12.3057 7.35039 11.739 8.04824 11.739H17.3671C18.0649 11.739 18.6306 12.3057 18.6306 13.0048C18.6306 13.7039 18.0649 14.2706 17.3671 14.2706H8.04824Z"
                fill="#B3B3B3"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9.79343 0.401024C10.2702 -0.109469 11.0698 -0.136141 11.5794 0.34145C12.089 0.819042 12.1156 1.62004 11.6389 2.13054L3.15692 11.2126C2.23513 12.1995 2.33608 13.7894 3.39827 14.831L7.31536 18.6721C7.81405 19.1611 7.82258 19.9625 7.33442 20.4621C6.84626 20.9616 6.04626 20.9702 5.54757 20.4812L1.63046 16.6401C-0.381492 14.6671 -0.581942 11.5102 1.31155 9.48305L9.79343 0.401024Z"
                fill="black"></path>
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="59" height="22">
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1a237e;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#0d47a1;stop-opacity:1" />
                </linearGradient>

                <filter id="starGlow">
                  <feGaussianBlur stdDeviation="1" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- 背景 -->
              <rect width="100" height="100" fill="url(#skyGradient)" rx="15" />

              <!-- 知识之书 -->
              <path d="M35 45 L65 45 L70 65 L30 65 Z" fill="#fff" opacity="0.9" />
              <path d="M35 45 L35 25 L45 20 L55 25 L65 45" fill="#f5f5f5" />

              <!-- 代码符号 -->
              <g transform="translate(43 32) scale(0.8)">
                <path d="M10 10 L20 15 L10 20 M25 10 L15 15 L25 20" stroke="#2196F3" stroke-width="2"
                  stroke-linecap="round" />
              </g>

              <!-- 星辰 -->
              <g filter="url(#starGlow)">
                <circle cx="25" cy="30" r="1.5" fill="#fff" />
                <circle cx="80" cy="20" r="1.2" fill="#fff" />
                <circle cx="45" cy="15" r="1" fill="#fff" />
                <path d="M60 25 l2.5-2.5 2.5 2.5-2.5 2.5z" fill="#FFD600" />
              </g>

              <!-- 数据波浪 -->
              <path d="M20 70 Q40 65 60 70 T100 65" stroke="#4CAF50" stroke-width="2" fill="none"
                stroke-dasharray="5 3" />
            </svg>
          </el-col>
          <el-col :span="2">
            <el-button link @click="handleNav('/')">
              主页
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button link @click="handleNav('/community')">
              社区
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button link>
              学习
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button link>
              学习
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button link>
              学习
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-dropdown trigger="click" popper-class="dow-top">
              <span class="el-dropdown-link">
                菜单
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-row>
    </el-col>
    <!-- 右边 -->
    <el-col :span="6">
      <el-row justify="end" align="middle" style="height: 100%; width: 90%;">
        <!-- 登录情况下 -->
        <el-row :gutter="40" justify="end" align="middle" v-show="userStore.id">
          <el-col :span="3">
            <el-button size="small" type="info" text>
              <el-icon :size="18">
                <Search />
              </el-icon>
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button size="small" text @click="handleNav('/accounts/notifications')">
              <el-icon :size="18">
                <BellFilled />
              </el-icon>
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-popover trigger="click" placement="bottom" :width="240" :offset="10">
              <template #reference>
                <el-avatar :size="25" class="cursor-pointer" />
              </template>
              <div class="user-menu">
                <!-- 用户信息 -->
                <div class="user-info">
                  <el-avatar :size="40" />
                  <div class="info">
                    <h4 class="nickname">{{ userStore.userName }}</h4>
                    <p class="email">{{ userStore.userName }}</p>
                  </div>
                </div>

                <!-- 功能菜单 -->
                <div class="menu-list" v-if="userStore.userRole === 'admin'">
                  <div v-for="item in menuItemsAdmin" :key="item.name" class="menu-item" @click="handleMenuClick(item)">
                    <component :is="item.icon" class="icon" />
                    <span>{{ item.label }}</span>
                  </div>
                </div>
                <div class="menu-list" v-else>
                  <div v-for="item in menuItems" :key="item.name" class="menu-item" @click="handleMenuClick(item)">
                    <component :is="item.icon" class="icon" />
                    <span>{{ item.label }}</span>
                  </div>
                </div>
                <!-- 退出登录 -->
                <div class="logout" @click="handleLogout">
                  <el-icon>
                    <SwitchButton />
                  </el-icon>
                  <span>退出登录</span>
                </div>
              </div>
            </el-popover>
          </el-col>
        </el-row>
        <!-- 未登录情况下 -->
        <el-row justify="end" align="middle" style="height: 100%; width: 90%;" v-show="!userStore.id">
          <el-row :gutter="40" justify="end" align="middle">
            <el-col :span="3">
              <el-button size="small" type="info" text>
                <el-icon :size="18">
                  <Search />
                </el-icon>
              </el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="small" text @click="handelRegister">
                注册
              </el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="small" text @click="handelLogin">
                登录
              </el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="warning" plain>会员Plus</el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.el-button {
  font-size: 16px;
  --el-text-color-primary: #ffff;
  --el-button-active-color: #000;

  &:hover {
    color: #000;
  }

  &:active {
    color: #000;
  }
}

.el-dropdown {
  .el-dropdown-link {
    font-size: 16px;
    color: #ffa116;
  }

  .el-icon--right {
    margin: 0;
  }
}

.el-dropdown-menu {
  background-color: #fff;

  .el-dropdown-item {
    border-radius: 50%;
  }
}

.el-button.is-text {
  width: 30px;

  &:hover {
    background-color: #ffffff1a !important;
  }
}

.el-icon {
  color: #737373
}

.user-menu {
  .user-info {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ebeef5;

    .info {
      margin-left: 12px;

      .nickname {
        margin: 0;
        font-size: 14px;
        color: #303133;
        font-weight: 600;
      }

      .email {
        margin: 4px 0 0;
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .menu-list {
    padding: 8px 0;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      font-size: 14px;
      color: #303133;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }

      .icon {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        color: #409EFF;
      }
    }
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    color: #f56c6c;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #fef0f0;
    }

    .el-icon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }
  }
}
</style>

<!-- el-dropdown 下拉组件 -->
<style lang="less">
.dow-top {
  margin-top: 5px;
  background: transparent !important;
  border: none !important;

  .el-popper__arrow::before {
    background: transparent !important;
    border: none !important;
  }

  .el-dropdown-menu {
    .el-dropdown-menu__item {
      margin: 0 5px;
      border-radius: 10px;
      color: #ffa116;
    }

    .el-dropdown-menu__item:hover {
      background: #F7F7F8;
    }

    .el-dropdown-menu__item:not(.is-disabled):focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background: #F7F7F8;
    }
  }
}
</style>
