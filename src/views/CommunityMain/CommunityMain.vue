<!-- eslint-disable vue/block-lang -->
<script setup></script>

<template>
  <div>
    <el-carousel height="280px" motion-blur>
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="http://p1.music.126.net/3bmHxZLAawzb46acOYbNqA==/109951170567995950.jpg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="less" scoped></style>
