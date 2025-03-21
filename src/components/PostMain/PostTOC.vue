<!-- eslint-disable vue/block-lang -->
<script setup>
import { defineProps } from 'vue'

defineProps({
  headings: {
    type: Array,
    default: () => []
  }
})

const scrollTo = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<template>
  <div class="toc-wrapper">
    <h3 class="toc-title">目录导航</h3>
    <div class="toc-list">
      <div v-for="heading in headings" :key="heading.id" :class="['toc-item', `level-${heading.level}`]"
        @click="scrollTo(heading.id)">
        {{ heading.text }}
      </div>
    </div>
  </div>
</template>
