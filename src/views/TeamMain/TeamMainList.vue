<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TeamList from "@/components/TeamMain/TeamList.vue"

const router = useRouter()
const dialogVisible = ref(false)

const jump = () => {
  router.push({ path: '/team/manage' })
}
</script>

<template>
  <div class="box">
    <div class="title">队伍列表</div>

    <!-- 队伍列表容器 -->
    <div class="team-list">
      <!-- 队伍卡片 -->
      <div class="team-card" v-for="team in 6" :key="team">
        <div class="card-header">
          <h3 class="team-name">前端开发小队 {{ team }}</h3>

        </div>

        <div class="team-info">
          <div class="info-item">
            <span>队伍名称：</span>
            <span>徐致豪666</span>
          </div>
          <div class="info-item">
            <span>参赛项目：</span>
            <span>计算机大赛</span>
          </div>
          <div class="info-item">
            <span>队伍人数：</span>
            <span>6</span>
          </div>
        </div>

        <div class="team-actions">
          <el-button type="primary" @click="dialogVisible = true">队伍信息</el-button>
          <el-button @click="jump">管理队伍</el-button>
        </div>
      </div>
    </div>
  </div>
  <TeamList :visible="dialogVisible" @close="dialogVisible = false" />
</template>

<style lang="less" scoped>
.box {
  .title {
    font-size: 1.4em;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding-left: 12px;
    border-left: 4px solid #409EFF;
  }

  // 保持原有样式不变
  .team-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 0.5rem;
  }

  .team-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(64, 158, 255, 0.15);


    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;

      .team-name {
        margin: 0;
        font-size: 1.1rem;
        color: #2c3e50;
      }


    }

    .team-info {
      display: grid;
      gap: 0.8rem;
      margin-bottom: 1.5rem;

      .info-item {
        display: flex;
        align-items: center;
        font-size: 0.95rem;
        color: #666;

        .el-icon {
          margin-right: 8px;
          color: #409EFF;
        }
      }
    }

  }
}

// 响应式调整
@media (max-width: 768px) {
  .team-list {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
    gap: 1rem !important;
  }
}

@media (max-width: 480px) {
  .team-card {
    padding: 1rem !important;

    .team-actions {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
