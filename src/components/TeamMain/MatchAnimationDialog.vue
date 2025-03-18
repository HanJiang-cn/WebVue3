<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  }
})

const progress = ref(0)
const statusText = ref('正在初始化匹配...')

// 监听弹窗显示状态变化
watch(() => props.dialogVisible, (newVal) => {
  if (newVal) {
    startAnimation()
  }
})

let interval = null
const animationStages = [
  { progress: 25, text: '正在寻找对手...' },
  { progress: 50, text: '验证参赛资格...' },
  { progress: 75, text: '建立比赛房间...' },
  { progress: 100, text: '匹配成功！' }
]

const startAnimation = () => {
  progress.value = 0
  let currentStage = 0

  interval = setInterval(() => {
    if (currentStage < animationStages.length) {
      progress.value = animationStages[currentStage].progress
      statusText.value = animationStages[currentStage].text
      currentStage++
    } else {
      clearInterval(interval)
    }
  }, 1500)
}
</script>

<template>
  <el-dialog :model-value="dialogVisible" title="智能匹配中" width="800" :show-close="false" :close-on-click-modal="false"
    @closed="clearInterval(interval)">
    <div class="animation-container">
      <!-- 加载动画 -->
      <div class="loading-icon">
        <div class="outer-ring"></div>
        <div class="inner-spinner"></div>
        <div class="progress-text">{{ progress }}%</div>
      </div>

      <!-- 状态文字 -->
      <div class="status-text">
        <div class="glow-text">{{ statusText }}</div>
        <el-progress :percentage="progress" :stroke-width="16" :format="() => ''" color="#409EFF" striped
          striped-flow />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="less" scoped>
.animation-container {
  padding: 20px;
  text-align: center;
}

.loading-icon {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 30px;

  .outer-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid #409EFF33;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .inner-spinner {
    position: absolute;
    width: 140px;
    height: 140px;
    top: 10px;
    left: 10px;
    border: 4px solid transparent;
    border-top-color: #409EFF;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
    color: #409EFF;
    text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
  }
}

.status-text {
  margin-top: 30px;

  .glow-text {
    font-size: 18px;
    color: #409EFF;
    margin-bottom: 20px;
    animation: textGlow 1.5s ease-in-out infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

@keyframes textGlow {

  0%,
  100% {
    text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
  }

  50% {
    text-shadow: 0 0 20px rgba(64, 158, 255, 0.8), 0 0 30px rgba(64, 158, 255, 0.6);
  }
}
</style>
