<!-- eslint-disable vue/block-lang -->
<script setup>
import SolutionCard from '@/components/ProblemsMain/SolutionCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleAddSolution = () => {
  router.push({
    path: '/post/solutioncreate',
    query: {
      ...router.currentRoute.value.query,
    }
  })
}

const handleSolution = () => {
  router.push({
    path: '/problems/solution/content',
    query: {
      // 保留所有现有参数
      ...router.currentRoute.value.query,
      // 添加新的参数
      solutionId: 1
    }
  })
}
</script>

<template>
  <div class="solution-header">
    <el-button type="primary" @click="handleAddSolution">添加题解</el-button>
  </div>
  <SolutionCard style="cursor: pointer;" @click="handleSolution" v-for="item in 10" :key="item"></SolutionCard>
</template>

<style lang="less" scoped>
.solution-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
