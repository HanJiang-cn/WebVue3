<script setup lang="ts">
import navMenu from '@/components/navMenu/navMenu.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 获取当前路由
const router = useRouter()
const currentRoute = router.currentRoute.value

const activeMenu = ref(currentRoute.path)
</script>
<template>
  <div class="default-layout">
    <div class="header">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
    <div class="main-layout">
      <div class="main">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="4">
            <div class="menu-card">
              <el-menu class="admin-menu" router :default-active="activeMenu">
                <el-menu-item index="/admin">
                  <el-icon>
                    <DataAnalysis />
                  </el-icon>
                  <span>数据看板</span>
                </el-menu-item>
                <el-menu-item index="/admin/users">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>用户管理</span>
                </el-menu-item>
                <el-menu-item index="/admin/post">
                  <el-icon>
                    <Document />
                  </el-icon>
                  <span>帖子管理</span>
                </el-menu-item>
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <Comment />
                    </el-icon>
                    <span>题解管理</span>
                  </template>
                  <el-menu-item index="/admin/solution/">题解列表</el-menu-item>
                  <el-menu-item index="/admin/solution/review">题解审核</el-menu-item>
                </el-sub-menu>
              </el-menu>
                    <el-sub-menu index="1">
                      <template #title>
                        <el-icon>
                          <Edit />
                        </el-icon>
                        <span>竞赛管理</span>
                      </template>
                      <el-menu-item index="/admin/competition">竞赛查看</el-menu-item>
                      <el-menu-item index="2">竞赛审核</el-menu-item>
                    </el-sub-menu>
                  </el-menu>
            </div>
          </el-col>

          <el-col :xs="24" :sm="16" :md="20">
            <div class="admin-content">
              <RouterView />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>
<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: #EBEBEB 1px solid;
  overflow: hidden;

  .nav-menu {
    max-width: 1700px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}

.main-layout {
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;

  .main {
    height: 100%;
    width: 100%;
    float: left;
    text-align: left;
    color: #333;
    // margin-top: 40px;

    .menu-card {
      :deep(.admin-menu) {
        border: none;

        .el-menu-item {
          height: 50px;
          margin: 4px 0;
          border-radius: 6px;
          transition: all 0.3s;

          &:hover {
            background: rgba(64, 158, 255, 0.1);
            transform: translateX(3px);
          }

          &.is-active {
            background: rgba(64, 158, 255, 0.2);
            color: #409EFF;
            font-weight: 500;
          }

          .el-icon {
            margin-right: 12px;
            font-size: 1.2em;
          }
        }
      }
    }

    .admin-content {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
      padding: 24px;
      // min-height: 600px;
    }
  }

}

.el-menu {
  border: none;
}
</style>
