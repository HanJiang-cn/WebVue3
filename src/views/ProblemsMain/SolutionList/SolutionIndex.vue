<!-- eslint-disable vue/block-lang -->
<script setup>
import SolutionCard from '@/components/ProblemsMain/SolutionCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSolution = () => {
  router.push({
    path: '/problems/solution/content',
    query: {
      solutionId: 1
    }
  })
}
</script>

<template>
  <SolutionCard style="cursor: pointer;" @click="handleSolution" v-for="item in 10" :key="item"></SolutionCard>
</template>

<style lang="less" scoped></style>
