<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, computed } from 'vue'
import { joinTeamApi } from '@/api/team'
import { ElNotification } from 'element-plus'
import TeamJoinCard from '@/components/TeamMain/TeamJoinCard.vue'

// 状态管理
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10

const form = ref({
  teamId: '',
  status: '0',
  password: ''
})

// 模拟数据
const rawTeams = ref([
  {
    id: 1,
    name: '前端先锋队',
    tag: 'web',
    description: '专注前端技术开发与创新',
    members: { current: 3, max: 5 },
    createTime: '2024-03-15',
    joined: false
  },
  {
    id: 1,
    name: '前端先锋队',
    tag: 'web',
    description: '专注前端技术开发与创新',
    members: { current: 3, max: 5 },
    createTime: '2024-03-15',
    joined: false
  },
  {
    id: 1,
    name: '前端先锋队',
    tag: 'web',
    description: '专注前端技术开发与创新',
    members: { current: 3, max: 5 },
    createTime: '2024-03-15',
    joined: false
  },
  {
    id: 1,
    name: '前端先锋队',
    tag: 'web',
    description: '专注前端技术开发与创新',
    members: { current: 3, max: 5 },
    createTime: '2024-03-15',
    joined: false
  },
  // 更多数据...
])

// 计算属性
const filteredTeams = computed(() => {
  return rawTeams.value.filter(team => {
    const matchesStatus = form.value.status === '0' || team.status === form.value.status
    const matchesId = !form.value.id || team.id.toString().includes(form.value.id)
    return matchesStatus && matchesId
  })
})
const paginatedTeams = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredTeams.value.slice(start, start + pageSize)
})

// 方法
const refreshList = async () => {
  loading.value = true
  try {
    // 这里实际调用API接口
    // await fetchTeams()
  } finally {
    loading.value = false
  }
}

// 表单相关
const formRef = ref(null)
const rules = reactive({
  teamId: [
    { required: true, message: '请输入队伍ID', trigger: 'blur' },
    { pattern: /^\d+$/, message: '队伍ID必须为数字', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择队伍状态', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
// 加入队伍方法
const handleJoin = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      const res = await joinTeamApi(form.value)
      console.log(res)
      if (res.code === 0) {
        ElNotification({
          title: '成功',
          message: '加入队伍成功',
          type: 'success'
        })
      }
    } else {
      console.log('表单验证失败')
    }
  })
}
</script>

<template>
  <div class="join-main">
    <!-- 顶部卡片 -->
    <div class="main-card search-card">
      <div class="card-header">
        <h2>加入队伍</h2>
        <p class="tip-text">输入队伍ID或队伍ID和密码来加入队伍</p>
      </div>

      <div class="search-filters">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
          <el-form-item label="队伍ID" prop="teamId">
            <el-input v-model="form.teamId" placeholder="请输入队伍ID" />
          </el-form-item>
          <el-form-item label="队伍状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio value="0">公开</el-radio>
              <el-radio value="2">公开加密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.status === '2'" label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleJoin">加入队伍</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 底部列表卡片 -->
    <div class="main-card list-card">
      <div class="card-header">
        <h3>推荐队伍（{{ filteredTeams.length }}个结果）</h3>
        <el-button type="primary" link @click="refreshList">
          <el-icon>
            <Refresh />
          </el-icon>
          刷新列表
        </el-button>
      </div>

      <div v-loading="loading">
        <template v-if="filteredTeams.length > 0">
          <div class="team-list">
            <TeamJoinCard v-for="team in paginatedTeams" :key="team.id" :team="team" @join="handleJoin" />
          </div>

          <div class="pagination-container">
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="filteredTeams.length"
              layout="prev, pager, next" background />
          </div>
        </template>

        <el-empty v-else description="暂无相关队伍" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.join-main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
}

.main-card {
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);

  &.search-card {
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;

  h2 {
    font-size: 1.5rem;
    color: #1e293b;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  h3 {
    font-size: 1.25rem;
    color: #334155;
    font-weight: 500;
  }

  .tip-text {
    color: #64748b;
    font-size: 0.875rem;
    margin-top: 8px;
  }
}

.search-filters {
  :deep(.el-form) {
    display: flex;
    flex-wrap: wrap;
  }

  :deep(.el-form-item) {
    margin-right: 24px;
    margin-bottom: 1.5rem;
  }

  :deep(.el-form-item__label) {
    color: #475569;
    font-weight: 500;
  }

  :deep(.el-input) {
    --el-input-focus-border-color: #3b82f6;
    width: 300px;
  }

  :deep(.el-radio-group) {
    display: flex;
    gap: 2rem;
  }

  :deep(.el-radio__input.is-checked + .el-radio__label) {
    color: #3b82f6;
  }

  :deep(.el-button--primary) {
    background-color: #3b82f6;
    border-color: #3b82f6;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: #2563eb;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.team-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 8px 0;
}

.pagination-container {
  margin-top: 32px;

  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #3b82f6;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
    color: #3b82f6;
  }
}

.el-empty {
  padding: 60px 0;

  :deep(.el-empty__description p) {
    color: #94a3b8;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .main-card {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .search-filters {
    :deep(.el-input) {
      width: 100%;
    }

    :deep(.el-radio-group) {
      flex-wrap: wrap;
      gap: 12px;
    }
  }

  .team-list {
    grid-template-columns: 1fr;
  }
}
</style>
