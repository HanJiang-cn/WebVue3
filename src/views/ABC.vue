<!-- eslint-disable vue/block-lang -->
<script setup>
import VueDraggableResizable from 'vue-draggable-resizable';
</script>

<template>
  <div style="position: relative; height: 500px; border: 1px solid #ccc">
    <vue-draggable-resizable :w="200" :h="150" :minw="50" :minh="50" :grid="[10, 10]" :parent="true"
      @resizing="(rect) => console.log('调整中', rect)" @dragstop="(rect) => console.log('拖动停止', rect)">
      <div class="content">拖拽我！</div>
    </vue-draggable-resizable>
  </div>
</template>

<style lang="less" scoped>
.content {
  padding: 20px;
  background: #f0f0f0;
}
</style>
