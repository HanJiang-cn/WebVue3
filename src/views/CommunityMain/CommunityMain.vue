<!-- eslint-disable vue/block-lang -->
<script setup>
import CommunityPost from '@/components/CommunityMain/CommunityPost.vue'
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { getRecommendPostListApi } from '@/api/community'

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

// 获取推荐帖子列表
const recommendPostList = ref([])
const getRecommendPostList = async () => {
  const res = await getRecommendPostListApi()
  recommendPostList.value = res.data
  PostList.value = res.data.slice(0, 9)
}
onMounted(() => {
  getRecommendPostList()
})

// 无限滚动加载
const PostList = ref([])
const infiniteHandler = () => {
  // 将recommendPostList数组中的数据一点一点加载到页面上
  // 排除已加载的数据
  const newPostList = recommendPostList.value.filter(item => !PostList.value.includes(item))
  // 每次加载10条数据
  // const newData = newPostList.slice(0, 10)
  PostList.value = [...PostList.value, ...newPostList]
}
</script>

<template>
  <div class="discussion" v-show="props.visable">
    <el-tabs v-model="discussionName" type="card" style="width: 100%;">
      <el-tab-pane v-infinite-scroll="infiniteHandler" label="推荐" name="1">
        <CommunityPost v-for="item in PostList" :key="item.id" @click="handlePost(item.id)" :item="item">
        </CommunityPost>
      </el-tab-pane>
      <el-tab-pane label="资讯" name="2">Config</el-tab-pane>
      <el-tab-pane label="热榜" name="3">Role</el-tab-pane>
      <el-tab-pane label="动态" name="4">Task</el-tab-pane>
      <el-tab-pane label="动态" name="5">Task</el-tab-pane>
    </el-tabs>
  </div>
  <div class="question" v-show="!props.visable">
    <el-tabs v-model="questionName" type="card">
      <el-tab-pane label="推荐" name="1">
        <CommunityPost v-for="item in 10" :key="item" @click="handlePost(1)"></CommunityPost>
      </el-tab-pane>
      <el-tab-pane label="Java" name="2">Config</el-tab-pane>
      <el-tab-pane label="Html" name="3">Role</el-tab-pane>
      <el-tab-pane label="JavaScirpt" name="4">Task</el-tab-pane>
      <el-tab-pane label="PHP" name="5">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  border-bottom: none;
  transition: border-color 0.3s ease;

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
</style>
