<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineEmits } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import Prism from 'prismjs'

const emit = defineEmits(['modelValue'])
const editorContent = ref('')

function uploadContent() {
  emit('modelValue', editorContent.value)
}

Prism.manual = true
Prism.highlightAll()
</script>

<template>
  <main id="sample">
    <Editor v-model="editorContent" @change="uploadContent" api-key="sxpxeo3xdwl4bffpsdhvq54ahvp3ikq5oh9xo2uk683ct0wr"
      :init="{
        plugins: 'lists link image table help wordcount codesample emoticons autosave preview media',
        language: 'zh_CN',
        toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | codesample emoticons | preview',
        height: 600,
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' }
        ]
      }" />
  </main>
</template>

<style scoped>
@media (min-width: 5000px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 600px;
  }
}
</style>
