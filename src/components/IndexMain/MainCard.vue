<script setup lang="ts">
import cover from '@/assets/cover.png'
import { defineProps, defineEmits } from 'vue'
interface Plan {
  id: string
  user_plan: string
  plan_desc: string
}
// 定义props
const props = defineProps<{
  planData: Plan
}>()
// 定义事件
const emit = defineEmits(['browse'])

// 点击处理
const handleClick = () => {
  emit('browse', props.planData.id)
}

</script>

<template>
  <el-col :span="8">
    <el-button
      class="plan-card"
      @click="handleClick"
    >
      <img :src="cover" />
      <div class="text">
        <p class="title">{{ planData.user_plan }}</p>
        <p class="desc">{{ planData.plan_desc }}</p>
      </div>
    </el-button>
  </el-col>
</template>

<style lang="less" scoped>
.el-button {
  padding: 0;
  width: 243px;
  height: 88px;
  background-color: #f5faff;
  border-radius: 10px;
  border: none;
  transition: all .3s;
  text-align: left;

  &:hover {
    background-color: #e1f9ff !important;
  }

  img {
    width: 72px;
    height: 72px;
    border-radius: 5px;
  }

  p {
    color: #52525299;
    margin-left: 10px;
    white-space: normal;
    width: 145px;
    font-size: 12px;
    line-height: 17px;

    &:first-child {
      margin-bottom: 10px;
      font-size: 14px;
      color: #1a1a1a;
    }
  }
}
</style>
