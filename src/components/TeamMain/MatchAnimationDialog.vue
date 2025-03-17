<!-- eslint-disable vue/block-lang -->
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    // default: false
  }
})

</script>

<template>
  <el-dialog :model-value="props.dialogVisible" title="Shipping address" width="800">

  </el-dialog>
</template>

<style lang="less" scoped></style>
