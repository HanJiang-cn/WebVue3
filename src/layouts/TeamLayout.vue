<script setup lang="ts">
import { onMounted } from 'vue'
import navMenu from '@/components/navMenu/navMenu.vue'
import { ElLoading } from 'element-plus'

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
const handleLoding = () => {
  const loading = ElLoading.service({
    lock: true,
    text: '加载zzz...',
    background: '#fff',
    svg: svg,
    svgViewBox: '-10, -10, 50, 50',
  })
  setTimeout(() => {
    loading.close()
  }, 500)
}

onMounted(() => {
  handleLoding()
})
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
        <RouterView />
      </div>
    </div>
    <div class="footer">
      页脚相关信息
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

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  width: 68%;
  height: 100%;
  display: flex;

  .main {
    height: 100%;
    width: 100%;
    float: left;
    text-align: left;
    color: #333;
    // margin-top: 40px;
  }
}

.footer {
  // 固定在底部
  bottom: 0;
  width: 100%;
  color: #fff;
  height: 200px;
  border-top: #EBEBEB 1px solid;
  margin-top: 20px;
  background-color: #333;
}
</style>
