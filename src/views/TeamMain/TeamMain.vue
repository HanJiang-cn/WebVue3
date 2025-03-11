<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function up() {
  router.push({ path: '/team2' });
}
</script>

<template>
      <el-button plain @click="up">显示更多</el-button>
</template>
