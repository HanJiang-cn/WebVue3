<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeName = ref('first')

const handleClick = (tab) => {
  console.log('tab', tab);

  if (tab === '1') {
    router.push('/question/compile/public')
  } else {
    router.push('/question/compile/private')
  }
}

onMounted(() => {
  // 获取当前路由
  const currentRoute = router.currentRoute.value
  if (currentRoute.path === '/question/compile/public') {
    activeName.value = '1'
  } else if (currentRoute.path === '/question/compile/private') {
    activeName.value = '2'
  }
})

const handleCreate1 = () => {
  router.push('/question/submit')
}
const handleCreate2 = () => {
  router.push('/question/paper')
}
</script>

<template>
  <div>
    <div class="title">
      <div>
        <h2 style="display: inline-block;">试题库</h2>
        <div id="right">
          <div class="right">
            <el-button class="create" type="primary" round @click="handleCreate1">新增试题</el-button>
            <el-button class="create" type="primary" round @click="handleCreate2">创建试卷</el-button>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick" style="width: 100%;">
        <el-tab-pane label="公共" name="1">
          <router-view />
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="2">
          <router-view />
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>


<style lang="less" scoped>
/* 试题库主界面样式优化 */
.title {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-bottom: 20px;
}
#right {
  float: right;
  width: 300px;

  .right {
    display: flex;
    height: 50px;
    width: 300px;

    a {
      display: inline-block;
    }

    .create {
      margin-right: 20px;
      margin-bottom: 30px;
      height: 35px;
    }

  }
}

.menu {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-bottom: 20px;

  .column {
    margin-bottom: 15px;

    .el-radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .el-radio-button {
        margin-right: 8px;

        :deep(.el-radio-button__inner) {
          border-radius: 4px;
          transition: all 0.3s;
        }
      }
    }
  }
}

.content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

  .el-table {
    margin-bottom: 20px;

    :deep(th) {
      background: #f8f9fa !important;
      color: #606266;
    }

    :deep(.cell) {
      padding: 12px 0;
    }

    .time-cell {
      line-height: 1.6;
      color: #909399;
    }
  }

  .el-pagination {
    justify-content: center;
    padding: 20px 0;

    :deep(.btn-prev),
    :deep(.btn-next) {
      border-radius: 4px;
    }

    :deep(.number) {
      border-radius: 4px;
    }

    :deep(.active) {
      background: #409EFF;
      color: #fff;
    }
  }
}

/* 搜索框样式优化 */
.el-input {
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    padding: 0 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    &:hover {
      box-shadow: 0 2px 8px rgba(64,158,255,0.2);
    }
  }
}

/* 按钮统一样式优化 */
.el-button {
  transition: all 0.3s;
  border-radius: 20px;
  padding: 8px 20px;

  &--primary {
    background: #409EFF;
    border-color: #409EFF;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }

  &--danger {
    &:hover {
      background: #ff7875;
      border-color: #ff7875;
    }
  }
}
</style>
