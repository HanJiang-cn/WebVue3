<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { getApi } from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const loading = ref(false)
const tableData = ref([])
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getApi({ ...pageInfo })
  loading.value = false
  tableData.value = records
  setTotals(Number(total))
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

const handleBrowse = (id) => {
  window.open(router.resolve({
    path: '/problems/question',
    query: {
      id: id
    }
  }).href, '_self')
}

</script>

<template>
  <el-drawer :model-value="visible" direction="ltr" :show-close="false" @close="huidao">
    <template #header="{ close }">
      <div class="drawer-header">
        <span @click="close">每日一题</span>
        <CloseOutlined @click="close" />
      </div>
    </template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="题目" prop="title">
        <template #default="scope">
          <div class="cell" @click="handleBrowse(scope.row.id)">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="难度" prop="difficulty">
        <template #default="scope">
          <el-tag type="scope.row.index === 简单 ? 'success' : scope.row.index === 中等?'warning' : 'danger'">
            {{ scope.row.index }}
          </el-tag>
        </template>
      </el-table-column>
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
