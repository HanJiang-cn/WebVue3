<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps, defineEmits } from 'vue'


// 定义 props ,当父组件传递过来的 message 为 true 时，抽屉打开。
// 抽屉的 value 一定要绑定为 :model-value ！！！
const props = defineProps({
  visible: {
    type: Boolean,
    // 设置默认值
    default: false
  }
})

const emits = defineEmits(['colse'])
const huidao = () => {
  // 关闭抽屉
  emits('colse')
}

const tableData = ref([
  {
    name: '张三',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    name: '李四',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    name: '王五',
    address: '上海市普陀区金沙江路 1519 弄'
  }
])

</script>

<template>
  <el-drawer :model-value="visible" direction="ltr" :show-close="false" @close="huidao">
    <template #header="{ close }">
      <div class="drawer-header">
        <span @click="close">每日一题 ></span>
        <CloseOutlined @click="close" />
      </div>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" />
      <el-table-column prop="address" />
    </el-table>
  </el-drawer>
</template>

<style lang="less" scoped>
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
    color: black;
    cursor: pointer;
  }
}
</style>
