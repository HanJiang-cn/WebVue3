<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { usePagination } from '@/hooks/usePagination'
import { getSolutionListApi } from '@/api/solution'
import { getAllPostListApi } from '@/api/post'
import { getIdInfoApi } from '@/api/user'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const searchResults = ref([])
const activeType = ref('solution') // 新增搜索类型状态
const loading = ref(false)
const kong = ref(false)

watch(activeType, () => {
  // 切换类型时重置查询条件
  searchQuery.value = ''
  searchResults.value = []
  kong.value = false
})

const handleSearch = async () => {
  if (searchQuery.value !== '') {
    loading.value = true
    if (activeType.value === 'solution') {
      const { data: { records, total } } = await getSolutionListApi({ ...pageInfo, title: searchQuery.value })

      // 并行请求用户信息
      const userRequests = records.map(record =>
        getIdInfoApi({ id: record.userId })
          .then(res => res.code === 0 ? res.data.userName : '未知用户')
          .catch(() => '获取失败')
      )
      const userNames = await Promise.all(userRequests)
      // 合并数据时直接添加用户名
      searchResults.value = records.map((record, index) => ({
        ...record,
        userName: userNames[index]
      }))
      if (searchResults.value.length === 0) {
        kong.value = true
      }
      setTotals(Number(total))
      loading.value = false
    } else {
      const { data: { records, total } } = await getAllPostListApi({ ...pageInfo, title: searchQuery.value })
      loading.value = false
      searchResults.value = records
      setTotals(Number(total))
      searchResults.value = records.map((records) => ({
        ...records,
      }))
      if (searchResults.value.length === 0) {
        kong.value = true
      }
    }
  } else {
    ElNotification({
      title: '提示',
      message: '请输入搜索内容',
      type: 'warning'
    })
  }
}

const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(handleSearch)

// 点击搜索结果跳转到详情页
const router = useRouter()
const handleClick = (result) => {
  if (activeType.value === 'solution') {
    window.open(router.resolve({
      path: '/post/solutionpost',
      query: {
        id: result.id
      }
    }).href, '_blank')
  } else {
    window.open(router.resolve({
      path: '/post',
      query: {
        id: result.id
      }
    }).href, '_blank')
  }
}

// 从地址栏获取查询参数
const searchParams = router.currentRoute.value.query.search
const typeParams = router.currentRoute.value.query.type
if (searchParams) {
  searchQuery.value = searchParams
  activeType.value = typeParams
  handleSearch()
  // console.log(searchParams);

}
</script>

<template>
  <div class="search-container">
    <!-- 新增页面标题 -->
    <div class="search-header">
      <h1>搜索</h1>
      <p class="tip-text">请输入关键词查找相关题目和题解</p>
      <!-- 新增类型切换 -->
      <el-radio-group v-model="activeType" class="type-switch">
        <el-radio-button label="solution">
          <el-icon>
            <Collection />
          </el-icon>
          题解检索
        </el-radio-button>
        <el-radio-button label="post">
          <el-icon>
            <Document />
          </el-icon>
          帖子检索
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="search-box">
      <el-input v-model.trim="searchQuery" placeholder="请输入搜索内容" clearable size="large" @keyup.enter="handleSearch"
        :style="{ 'border-radius': '30px' }">
        <template #append>
          <el-button type="primary" :icon="Search" @click="handleSearch" size="large" class="search-btn">
            立即搜索
          </el-button>
        </template>
      </el-input>
    </div>

    <div v-loading="loading">
      <div class="search-results" v-if="kong === false">
        <el-card v-for="result in searchResults" :key="result.id" class="result-item" shadow="hover"
          @click="handleClick(result)">
          <!-- 题解类型展示 -->
          <div v-if="activeType === 'solution'" class="solution-item">
            <h3>{{ result.title }}</h3>
            <div class="meta-info">
              <el-tag type="warning">{{ result.solutionClass ? result.solutionClass : '未分类' }}</el-tag>
              <el-tag v-for="(tag, index) in result.tags" :key="index" type="info">
                {{ tag }}
              </el-tag>
              <span class="author">作者：{{ result.userName }}</span>
              <el-icon>
                <Star />
              </el-icon>
              <span>{{ result.favourNum }} 收藏</span>
            </div>
          </div>

          <!-- 帖子类型展示 -->
          <div v-else class="post-item">
            <h3>{{ result.title }}</h3>
            <div class="meta-info">
              <el-icon>
                <User />
              </el-icon>
              <span class="author">{{ result.userName }}</span>
              <el-icon>
                <ChatDotRound />
              </el-icon>
              <span>{{ result.comments }} 评论</span>
              <el-icon>
                <Star />
              </el-icon>
              <span>{{ result.favourNum }} 收藏</span>
            </div>
          </div>
        </el-card>
        <div class="search-pagination" v-show="searchResults.length > 0">
          <el-pagination class="mr mt" v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals" background
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
      <el-card v-if="kong === true" class="result-item" shadow="hover">
        <h3>暂无更多结果</h3>
        <p>您可以尝试修改搜索条件或返回首页。</p>
      </el-card>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;

  .search-header {
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 2.5rem;
      color: #409eff;
      margin-bottom: 15px;
    }

    .tip-text {
      color: #909399;
      font-size: 1rem;
    }

    .type-switch {
      margin-top: 20px;
    }
  }

  .search-box {
    margin-bottom: 30px;

    :deep(.el-input__wrapper) {
      border-radius: 30px;
      padding: 0 25px;

      .el-input__inner {
        font-size: 1.1rem;
      }
    }
  }

  .result-stats {
    color: #606266;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .search-results {
    display: grid;
    gap: 20px;

    .result-item {
      transition: transform 0.3s;
      padding: 20px;
      cursor: pointer;

      &:hover {
        transform: translateY(-3px);
      }

      h3 {
        color: #303133;
        font-size: 1.2rem;
        margin-bottom: 12px;
      }

      .meta-info {
        display: flex;
        align-items: center;
        gap: 15px;
        color: #909399;
        margin-bottom: 15px;

        .type-tag {
          background: #ecf5ff;
          color: #409eff;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .difficulty {
          &.easy {
            color: #67c23a;
          }
        }
      }

      .description {
        color: #606266;
        line-height: 1.6;
      }
    }
  }

  :deep(.el-input-group__append) {
    box-shadow: none;
    background-color: transparent;
  }

  .search-btn {
    margin-left: 3px;
    border: 1px solid #ccc;
    transition: all 0.3s;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #409eff;
      color: white;
      opacity: 0.9;
      // transform: scale(1.02);
    }
  }

  .search-pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
