<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import navMenu from '@/components/navMenu/navMenu.vue'

const router = useRouter()
const visable = ref(true)

function switchNavMenu() {
  // 获取当前路由
  const currentRoute = router.currentRoute.value
  if (currentRoute.path === '/competition/answer') {
    visable.value = false
  }
}

onMounted(() => {
  switchNavMenu()
})

</script>
<template>
  <div class="default-layout">
    <div class="header" v-show="visable">
      <div class="nav-menu">
        <navMenu />
      </div>
    </div>
    <div class="main">
      <RouterView />
    </div>
  </div>
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
</style>
