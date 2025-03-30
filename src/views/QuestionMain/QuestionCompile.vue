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

const handleCreate = () => {
  router.push('/question/submit')
}
</script>

<template>
  <div>
    <div class="title">
      <div>
        <h2 style="display: inline-block;">试题库</h2>
        <div id="right">
          <div class="right">
            <el-button id="create" type="primary" round @click="handleCreate">新增试题</el-button>
            <el-button id="create" type="primary" round @click="handleCreate">创建试卷</el-button>
            <el-input placeholder="请输入题号或其他关键词进行搜索" />
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
#right {
  float: right;
  width: 500px;

  .right {
    display: flex;
    height: 50px;
    width: 500px;

    a {
      display: inline-block;
    }

    #create {
      // margin-right: 20px;
      margin-bottom: 30px;
      height: 35px;
    }

    .el-input {
      border-radius: 19px;
      height: 35px;
      width: 100%;
      padding-left: 20px;

      :deep(.el-input__wrapper) {
        padding-left: 20px;
        border-radius: 20px;
      }
    }
  }
}

.el-tabs__item {
  font-size: 19px !important;
}

.topic {
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #EBEBEB;
  padding-top: 10px;
  padding-bottom: 2px;

  .all {
    display: inline-block;
    width: 230px;
  }



}

.column {
  display: flex;
  height: 46px;
  padding-top: 10px;

  .heading {
    display: inline-block;
    width: 50px;
    flex-shrink: 0;
    color: #9096a3;
    margin-right: 16px;
    margin-top: 10px;
    text-align-last: justify;
  }

  .select {
    display: inline-block;
    overflow: hidden;

  }
}

.content {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  padding-top: 20px;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  padding-bottom: 50px;

  .empty-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: rgb(93, 111, 143);
    margin-bottom: 8px;
  }

  .no-combo-tips {
    color: rgb(125, 140, 165);
    font-size: 12px;
    line-height: 14px;
  }

  .question {
    width: 100%;
    height: 105px;
    border: #c5c6c8 1px solid;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 5px 5px 10px rgba(189, 187, 187, 0.3);

    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      line-height: 20px;
      color: rgb(125, 140, 165);
      margin-bottom: 10px;
    }
  }
}
</style>
