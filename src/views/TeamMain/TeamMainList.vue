<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { myTeamListApi, myJoinTeamListApi } from '@/api/team'
import TeamList from "@/components/TeamMain/TeamList.vue"

const router = useRouter()
const dialogVisible = ref(false)
const activeName = ref('first')

// 获取队伍列表
// 我创建的
const teamList = ref([])
const getTeamList = async () => {
  const { data } = await myTeamListApi()
  teamList.value = data
}
// 我加入的
const joinTeamList = ref([])
const getJoinTeamList = async () => {
  const { data } = await myJoinTeamListApi()
  joinTeamList.value = data
}
onMounted(() => {
  getTeamList()
  getJoinTeamList()
})

const jump = () => {
  router.push({ path: '/team/manage' })
}
</script>

<template>
  <div class="box">
    <div class="title">队伍列表</div>

    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="创建" name="first">
        <!-- 队伍列表容器 -->
        <div class="team-list">
          <!-- 队伍卡片 -->
          <div class="team-card" v-for="team in teamList" :key="team.id">
            <div class="card-header">
              <h3 class="team-name">{{ team.name }}</h3>

            </div>

            <div class="team-info">
              <div class="info-item">
                <span>队伍Id：</span>
                <span>{{ team.id }}</span>
              </div>
              <div class="info-item">
                <span>创建人：</span>
                <span>{{ team.createUser.userName }}</span>
              </div>
              <div class="info-item">
                <span>队伍状态：</span>
                <span>{{ team.status === 0 ? '公开' : team.status === 1 ? '私密' : '公开加密' }}</span>
              </div>
              <div class="info-item">
                <span>队伍人数：</span>
                <span>1/{{ team.maxNum }}</span>
              </div>
            </div>

            <div class="team-actions">
              <el-button type="primary" @click="dialogVisible = true">队伍信息</el-button>
              <el-button @click="jump">管理队伍</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="加入" name="second">
        <!-- 队伍列表容器 -->
        <div class="team-list">
          <!-- 队伍卡片 -->
          <div class="team-card" v-for="team in joinTeamList" :key="team.id">
            <div class="card-header">
              <h3 class="team-name">{{ team.name }}</h3>

            </div>

            <div class="team-info">
              <div class="info-item">
                <span>队伍Id：</span>
                <span>{{ team.id }}</span>
              </div>
              <div class="info-item">
                <span>创建人：</span>
                <span>{{ team.createUser.userName }}</span>
              </div>
              <div class="info-item">
                <span>队伍状态：</span>
                <span>{{ team.status === 0 ? '公开' : team.status === 1 ? '私密' : '公开加密' }}</span>
              </div>
              <div class="info-item">
                <span>队伍人数：</span>
                <span>1/{{ team.maxNum }}</span>
              </div>
            </div>

            <div class="team-info-button">
              <el-button type="primary" @click="dialogVisible = true">队伍信息</el-button>
              <el-button type="danger" plain @click="leaveTeam(team.id)">退出队伍</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>


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

  :deep(.el-tabs) {
    .el-tabs__content {
      min-height: 600px;
    }
  }

  :deep(.el-tabs__header) {
    border-bottom: none;
    transition: border-color 0.3s ease;

    .el-tabs__nav {
      border: none;
      gap: 8px; // 使用gap控制间距
      margin-bottom: -1px; // 对齐底部边框

      .title {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 25px;
        }

        span {
          margin-left: 5px;
        }
      }

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
    box-shadow: 0 4px 24px rgba(#409EFF, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(#409EFF, 0.15);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(#409EFF, 0.12);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #EBEBEB;

      .team-name {
        margin: 0;
        font-size: 1.2rem;
        color: #1a56a8;
        font-weight: 600;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 40px;
          height: 2px;
          background: #409EFF;
        }
      }
    }

    .team-info {
      display: grid;
      gap: 1rem;
      margin-bottom: 1.5rem;

      .info-item {
        display: flex;
        align-items: center;
        font-size: 0.95rem;
        color: #666;
        line-height: 1.5;

        span:first-child {
          color: #444;
          font-weight: 500;
          min-width: 80px;
        }

        span:last-child {
          color: #1a56a8;
          flex: 1;
        }
      }
    }

    .team-info-button {
      display: flex;
      gap: 12px;
      margin-top: 1.5rem;

      .el-button {
        flex: 1;
        transition: all 0.3s;

        &:first-child {
          background: linear-gradient(45deg, #409EFF, #66b1ff);
          border-color: transparent;
          color: white;

          &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        }
      }
    }

    .team-actions {
      display: flex;
      gap: 12px;
      margin-top: 1.5rem;

      .el-button {
        flex: 1;
        transition: all 0.3s;

        &:first-child {
          background: linear-gradient(45deg, #409EFF, #66b1ff);
          border-color: transparent;
          color: white;

          &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        }

        &:last-child {
          border-color: #409EFF;
          color: #409EFF;

          &:hover {
            background: rgba(#409EFF, 0.1);
          }
        }
      }
    }
  }
}
</style>
