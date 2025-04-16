<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecommendBannerListApi } from '@/api/community'

const router = useRouter()

const tagTypes = ['', 'success', 'warning', 'danger']

const topTeams = ref([
  {
    id: 1,
    name: '算法征服者',
    logo: '',
    tags: ['动态规划', '图论', 'ACM'],
    members: 5,
    maxMembers: 6,
    wins: 12,
    power: 9850,
    rating: 4.8
  },
  {
    id: 1,
    name: '算法征服者',
    logo: '',
    tags: ['动态规划', '图论', 'ACM'],
    members: 5,
    maxMembers: 6,
    wins: 12,
    power: 9850,
    rating: 4.8
  },
  {
    id: 1,
    name: '算法征服者',
    logo: '',
    tags: ['动态规划', '图论', 'ACM'],
    members: 5,
    maxMembers: 6,
    wins: 12,
    power: 9850,
    rating: 4.8
  },
  {
    id: 1,
    name: '算法征服者',
    logo: '',
    tags: ['动态规划', '图论', 'ACM'],
    members: 5,
    maxMembers: 6,
    wins: 12,
    power: 9850,
    rating: 4.8
  },
  {
    id: 1,
    name: '算法征服者',
    logo: '',
    tags: ['动态规划', '图论', 'ACM'],
    members: 5,
    maxMembers: 6,
    wins: 12,
    power: 9850,
    rating: 4.8
  },
  // 更多数据...
])

const joinedTeams = ref([
  {
    name: '极客先锋队',
    score: 4500,
    rank: 1,
    members: 5,
    status: '活跃',
    progress: 80
  },
  {
    name: '代码艺术家',
    score: 3800,
    rank: 3,
    members: 6,
    status: '集训中',
    progress: 65
  }
])

const handleCreate = () => {
  router.push('/team/create')
}
const handleMatch = () => {
  router.push('/team/match')
}
const handleList = () => {
  router.push('/team/list')
}
const handleJoin = () => {
  router.push('/team/join')
}

// banner
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getRecommendBannerListApi()
  if (res.code === 0) {
    bannerList.value = res.data
  }
}
onMounted(() => {
  getBannerList()
})
</script>

<template>
  <div class="default-layout">
    <div class="main-layout">
      <!-- 主内容区 -->
      <div class="main">
        <!-- 轮播图 -->
        <el-carousel height="200px" class="main-carousel">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <img :src="item" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>

        <!-- 优秀队伍 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <el-icon class="icon-star">
                <Star />
              </el-icon>
              <span class="title">明星队伍展示</span>
              <el-tag type="warning" effect="dark" class="ml-10">每日更新</el-tag>
            </div>
          </template>

          <div class="team-grid">
            <div v-for="(team, index) in topTeams" :key="index" class="team-card" @click="viewTeamDetail(team)">
              <div class="card-badge" :class="{ 'is-top3': index < 3 }">
                TOP {{ index + 1 }}
              </div>
              <div class="card-header">
                <el-avatar :size="80" shape="square" :src="team.logo" class="team-logo">
                  <img v-if="!team.logo" src="" />
                </el-avatar>
                <div class="team-meta">
                  <h4 class="team-name">{{ team.name }}</h4>
                  <div class="team-tags">
                    <el-tag v-for="(tag, tIndex) in team.tags" :key="tIndex" size="small" :type="tagTypes[tIndex % 4]">
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </div>

              <div class="team-stats">
                <div class="stat-item">
                  <el-icon>
                    <User />
                  </el-icon>
                  <span>{{ team.members }}/{{ team.maxMembers }}</span>
                </div>
                <div class="stat-item">
                  <el-icon>
                    <Trophy />
                  </el-icon>
                  <span>{{ team.wins }} 次夺冠</span>
                </div>
                <div class="stat-item">
                  <el-icon>
                    <DataAnalysis />
                  </el-icon>
                  <span>战力 {{ team.power }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 全国排名 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <el-icon>
                <Trophy />
              </el-icon>
              <span>全国战队排行榜</span>
            </div>
          </template>
          <el-table :data="Array(10).fill({})">
            <el-table-column label="排名" width="80">
              <template #default="{ $index }">
                <el-tag :type="$index < 3 ? ['danger', 'warning', 'success'][$index] : ''">
                  {{ $index + 1 }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="team" label="队伍名称" />
            <el-table-column prop="score" label="积分" />
          </el-table>
        </el-card>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <div class="aside-content">
          <el-affix :offset="20" target=".aside-content">
            <!-- 队伍操作 -->
            <el-card class="action-card">
              <template #header>
                <div class="card-header">
                  <el-icon>
                    <Position />
                  </el-icon>
                  <span>队伍操作</span>
                </div>
              </template>
              <div class="action-buttons">
                <el-button type="primary" icon="Plus" class="action-btn" @click="handleCreate">创建队伍</el-button>
                <el-button type="warning" icon="Search" class="action-btn" @click="handleJoin">加入队伍</el-button>
                <el-button type="success" icon="Search" class="action-btn" @click="handleMatch">匹配队伍</el-button>
                <el-button type="info" icon="View" class="action-btn" @click="handleList">查看队伍</el-button>
              </div>
            </el-card>

            <el-card class="joined-teams-card">
              <template #header>
                <div class="card-header">
                  <el-icon>
                    <UserFilled />
                  </el-icon>
                  <span>我的队伍（2/5）</span>
                  <el-tag type="info" size="small" class="ml-10">当前排名</el-tag>
                </div>
              </template>

              <div class="team-ranking">
                <div v-for="(team, index) in joinedTeams" :key="index" class="team-item" @click="viewTeamDetail(team)">
                  <div class="rank-badge" :class="{
                    'gold': team.rank === 1,
                    'silver': team.rank === 2,
                    'bronze': team.rank === 3
                  }">
                    #{{ team.rank }}
                  </div>
                  <div class="team-info">
                    <div class="team-name">{{ team.name }}</div>
                    <div class="team-stats">
                      <el-tag size="small" :type="team.status === '活跃' ? 'success' : 'info'">
                        {{ team.status }}
                      </el-tag>
                      <div class="score">
                        <el-icon>
                          <StarFilled />
                        </el-icon>
                        {{ team.score }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@success-color: #67c23a;
@warning-color: #e6a23c;
@danger-color: #f56c6c;
@info-color: #909399;

.default-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px;
}

.main-layout {
  display: flex;
  gap: 24px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.main {
  flex: 1;
  min-width: 0;

  .main-carousel {
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;

    .carousel-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .section-card {
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    .section-header {
      display: flex;
      align-items: center;
      padding: 0 4px;

      .icon-star {
        color: #FFC107;
        font-size: 1.4em;
      }

      .el-tag {
        margin-left: 10px;
      }
    }

    .team-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .team-card {
      position: relative;
      background: linear-gradient(145deg, #ffffff, #f8fafc);
      border-radius: 12px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
      }

      .card-badge {
        position: absolute;
        top: 5;
        right: -25px;
        background: #409EFF;
        color: white;
        padding: 4px 30px;
        transform: translateY(-10px) rotate(45deg);
        transform-origin: center;
        font-size: 0.8em;

        &.is-top3 {
          background: #FFC107;
        }
      }
    }

    .card-header {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;

      .team-logo {
        border: 2px solid #e4e7ed;
        transition: border-color 0.3s;
      }

      .team-name {
        margin: 0;
        font-size: 1.1em;
        color: #2c3e50;
      }

      .team-tags {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }

    .team-stats {
      display: grid;
      // grid-template-columns 是一个 CSS 属性，用于定义网格布局的列数和列宽。
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 16px 0;
      padding: 12px 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #606266;
        font-size: 0.9em;

        i {
          font-size: 1.4em;
          margin-bottom: 4px;
          color: #409EFF;
        }
      }
    }
  }
}

.aside {
  width: 340px;
  flex-shrink: 0;

  .aside-content {
    >* {
      margin-bottom: 20px;
    }
  }

  .action-card {
    border: 2px solid #409EFF;
    border-radius: 12px;

    .action-buttons {
      display: grid;
      gap: 12px;

      .action-btn {
        margin: 0;
        width: 100%;
        height: 42px;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }

  .joined-teams-card {
    margin: 20px 0;
    border-radius: 12px;

    .team-ranking {
      .team-item {
        display: flex;
        align-items: center;
        padding: 12px;
        margin: 8px 0;
        background: #f8fafc;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          transform: translateX(5px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .rank-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 12px;

          &.gold {
            background: linear-gradient(45deg, #FFD700, #FFC107);
          }

          &.silver {
            background: linear-gradient(45deg, #C0C0C0, #909399);
          }

          &.bronze {
            background: linear-gradient(45deg, #CD7F32, #E6A23C);
          }
        }

        .team-info {
          flex: 1;

          .team-name {
            font-weight: 500;
            margin-bottom: 4px;
          }

          .team-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .score {
              color: #606266;
              font-size: 0.9em;
              display: flex;
              align-items: center;

              i {
                color: #FFC107;
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 992px) {
    width: 100%;

    .action-buttons {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    .action-buttons {
      grid-template-columns: 1fr;
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;

  i {
    color: #409EFF;
  }
}
</style>
