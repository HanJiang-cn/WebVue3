<!-- eslint-disable vue/block-lang -->
<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>

<template>
  <main id="sample">
    <Editor api-key="sxpxeo3xdwl4bffpsdhvq54ahvp3ikq5oh9xo2uk683ct0wr" :init="{
      plugins: 'lists link image table code help wordcount',
      language: 'zh_CN',
    }" />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 1000px;
  }
}
</style>
