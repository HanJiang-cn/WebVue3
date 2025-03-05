<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'

// 引入 Monaco Editor
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

// 创建对编辑器的引用
const editor = ref()

// 在组件挂载后执行
onMounted(() => {
  // 创建 Monaco Editor 实例
  monaco.editor.create(editor.value, {
    value: `class Solution {
    public int palindromePartition(String s, int k) {

    }
  }`,
    language: 'java',
    theme: 'vs-light',
  })
})
</script>

<template>
  <div class="editor-container">
    <!-- 将编辑器容器绑定到 ref -->
    <div id="editor" ref="editor"></div>
  </div>
</template>

<style scoped>
.editor-container {
  width: 100%;
  height: 100%;
  /* padding: 15px; */
  background: #ffffff;
}

#editor {
  width: 100%;
  height: 100%;
}
</style>
