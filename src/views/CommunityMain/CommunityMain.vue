<!-- eslint-disable vue/block-lang -->
<script setup>
import CommunityPost from '@/components/CommunityMain/CommunityPost.vue'
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
// import { getRecommendPostListApi } from '@/api/community'
import { getAllPostListApi } from '@/api/post'
import { getSolutionListApi } from '@/api/solution'

const router = useRouter()
const discussionName = ref('1')
const questionName = ref('1')

const props = defineProps({
  visable: Boolean
})

// 路由跳转到 post 页面
const handlePost = (id) => {
  window.open(
    router.resolve({
      path: '/post',
      query: {
        id: id
      }
    }).href, '_self')
}

const size = ref(10)
const listtotal = ref(10)
const scrollDisabled = ref(false)
const footerdiv = ref(false)
const loading = ref(false)
// 获取推荐帖子列表
const recommendPostList = ref([])
const getRecommendPostList = async (size, classes) => {
  // const res = await getRecommendPostListApi()
  const res = await getAllPostListApi({
    current: 1,
    pageSize: size,
    post_classes: classes
  })
  recommendPostList.value = res.data.records
  listtotal.value = res.data.total
}
onMounted(() => {
  getRecommendPostList()
})
const infiniteHandler = () => {
  size.value += 5
  console.log('加载成功');
  if (recommendPostList.value.length < +listtotal.value) {
    getRecommendPostList(size.value)
  } else {
    scrollDisabled.value = true
    footerdiv.value = true
  }
}
// 切换标签页时获取推荐帖子列表
const handlePostTabClick = (tab) => {
  loading.value = true
  if (tab.props.name === '1') {
    getRecommendPostList(10, '')
  } else if (tab.props.name === '2') {
    getRecommendPostList(10, '技术分享')
  } else if (tab.props.name === '3') {
    getRecommendPostList(10, '算法题解')
  } else if (tab.props.name === '4') {
    getRecommendPostList(10, '生活感悟')
  } else if (tab.props.name === '5') {
    getRecommendPostList(10, '问题求助')
  }
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

// 获取题解列表
const solutionSize = ref(10)
const solutionListtotal = ref(10)
const solutionScrollDisabled = ref(false)
const solutionFooterdiv = ref(false)
const solutionList = ref([])
const getRecommendSolutionList = async (size, classes) => {
  const res = await getSolutionListApi({
    current: 1,
    pageSize: size,
    solutionClass: classes
  })
  solutionList.value = res.data.records
  solutionListtotal.value = res.data.total
}
onMounted(() => {
  getRecommendSolutionList()
})
const solutionInfiniteHandler = () => {
  solutionSize.value += 5
  console.log('加载成功');
  if (solutionList.value.length < +solutionListtotal.value) {
    getRecommendSolutionList(solutionSize.value)
    console.log(solutionList.value.length, +solutionListtotal.value);

  } else {
    solutionScrollDisabled.value = true
    solutionFooterdiv.value = true
  }
}
</script>

<template>
  <div class="discussion" v-if="props.visable" v-infinite-scroll="infiniteHandler"
    :infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="10">
    <el-affix target=".discussion" :offset="0">
      <el-tabs v-model="discussionName" type="card" style="width: 100%;" @tab-click="handlePostTabClick">
        <el-tab-pane label="推荐" name="1"></el-tab-pane>
        <el-tab-pane label="技术分享" name="2"></el-tab-pane>
        <el-tab-pane label="算法题解" name="3"></el-tab-pane>
        <el-tab-pane label="生活感悟" name="4"></el-tab-pane>
        <el-tab-pane label="问题求助" name="5"></el-tab-pane>
      </el-tabs>
    </el-affix>
    <div v-loading="loading">
      <CommunityPost v-for="item in recommendPostList" :key="item.id" @click="handlePost(item.id)" :item="item">
      </CommunityPost>
      <div v-if="footerdiv" class="loading-message">
        <el-icon :size="16" color="#64748b" class="icon-check">
          <Check />
        </el-icon>
        <span class="text">已经到底啦~</span>
      </div>
    </div>
  </div>
  <div class="question" v-if="!props.visable" v-infinite-scroll="solutionInfiniteHandler"
    :infinite-scroll-disabled="solutionScrollDisabled" infinite-scroll-distance="10">
    <el-tabs v-model="questionName" type="card" @tab-click="handleSolutionTabClick">
      <el-tab-pane label="推荐" name="1">
      </el-tab-pane>
      <el-tab-pane label="Java" name="2">Config</el-tab-pane>
      <el-tab-pane label="Html" name="3">Role</el-tab-pane>
      <el-tab-pane label="JavaScirpt" name="4">Task</el-tab-pane>
      <el-tab-pane label="PHP" name="5">Task</el-tab-pane>
    </el-tabs>
    <div v-loading="loading">
      <CommunityPost v-for="item in solutionList" :key="item.id" @click="handlePost(item.id)" :item="item">
      </CommunityPost>
      <div v-if="solutionFooterdiv" class="loading-message">
        <el-icon :size="16" color="#64748b" class="icon-check">
          <Check />
        </el-icon>
        <span class="text">已经到底啦~</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  border-bottom: none;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255);

  .el-tabs__nav {
    border: none;
    gap: 8px; // 使用gap控制间距
    margin-bottom: -1px; // 对齐底部边框

    .el-tabs__item {
      position: relative;
      padding: 15px 20px;
      margin-right: 10px;
      border: none !important;
      font-size: 16px;
      color: #64748b; // 现代中性色
      border-radius: 8px; // 更柔和的圆角
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      // 悬停状态
      &:hover {
        color: #3b82f6; // 品牌蓝色
        background: rgba(59, 130, 246, 0.05);
        transform: translateY(-2px);
      }

      // 激活状态
      &.is-active {
        color: #3b82f6;
        background: rgba(59, 130, 246, 0.1);

        // 底部指示条
        &::after {
          content: '';
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: -1px;
          height: 2px;
          background: #3b82f6;
          border-radius: 2px;
        }
      }
    }
  }
}

.loading-message {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin: 16px 0 32px;
  color: #64748b;
  background: rgba(241, 245, 249, 0.6);
  border-radius: 8px;
  animation: fadeIn 0.5s ease;

  .icon-check {
    margin-right: 8px;
    transform: translateY(1px);
  }

  .text {
    font-size: 14px;
    letter-spacing: 0.5px;
  }
}
</style>
