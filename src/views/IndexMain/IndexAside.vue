<!-- eslint-disable vue/block-lang -->
<script setup>
</script>

<template>
  <el-card class="coding-sidebar">
    <!-- 用户信息 -->
    <div class="user-card">
      <el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <div class="user-meta">
        <h3 class="username">Liko Coder</h3>
        <el-text class="user-rank">
          <el-icon>
            <CaretTop />
          </el-icon>
          全站排名 TOP 5%
        </el-text>
      </div>
    </div>

    <!-- 每日一题 -->
    <div class="daily-challenge">
      <el-button type="danger" :icon="Fire" round class="challenge-btn">
        今日挑战题
        <el-tag size="small" effect="dark" class="ml-2">Hard</el-tag>
      </el-button>
      <p class="problem-title">两数之和 IV - 输入二叉搜索树</p>
      <div class="problem-stats">
        <el-text type="info">通过率 62%</el-text>
        <el-text type="info">提交次数 34.5万</el-text>
      </div>
    </div>

    <!-- 进度统计 -->
    <div class="progress-section">
      <h4 class="section-title">
        <el-icon>
          <CodeOutlined />
        </el-icon>
        本月进度
      </h4>
      <el-progress :percentage="65" :show-text="false" color="#1890ff" />
      <div class="progress-stats">
        <el-text>已完成 26/40 题</el-text>
        <el-text>超越 85% 用户</el-text>
      </div>
    </div>

    <!-- 分类标签云 -->
    <div class="tag-cloud">
      <h4 class="section-title">
        <el-icon>
          <Calendar />
        </el-icon>
        热门分类
      </h4>
      <div class="tags-container">
        <el-tag v-for="tag in ['动态规划', '二叉树', '链表', '回溯算法', '双指针']" :key="tag" effect="dark" type="info"
          class="code-tag">
          #{{ tag }}
        </el-tag>
      </div>
    </div>

    <!-- 排行榜 -->
    <div class="ranking-section">
      <h4 class="section-title">
        <el-icon>
          <Trophy />
        </el-icon>
        今日榜单
      </h4>
      <div class="ranking-list">
        <div v-for="(user, index) in 3" :key="index" class="ranking-item">
          <el-text class="ranking-order">{{ index + 1 }}.</el-text>
          <el-avatar :size="24" :src="`https://picsum.photos/50?random=${index}`" />
          <el-text class="user-name">用户_{{ 12345 + index }}</el-text>
          <el-tag size="small" effect="dark" type="success">+{{ 15 - index * 5 }}</el-tag>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="less" scoped>
.coding-sidebar {
  margin-left: 20px;
  border-radius: 12px;
  background: #ffffff;
  border: none;

  :deep(.el-card__body) {
    padding: 20px;
    color: #333;
  }

  .user-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f0f5ff;
    border-radius: 8px;
    margin-bottom: 20px;

    .user-meta {
      margin-left: 15px;

      .username {
        color: #1a1a1a;
        margin: 0 0 4px 0;
      }

      .user-rank {
        color: #666;
        display: flex;
        align-items: center;

        .el-icon {
          color: #1890ff;
          margin-right: 5px;
        }
      }
    }
  }

  .daily-challenge {
    background: #f0f5ff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;

    .challenge-btn {
      width: 100%;
      padding: 12px;
      font-weight: bold;
      background: linear-gradient(45deg, #ff4d4d, #ff7875);
      border: none;

      &:hover {
        opacity: 0.9;
      }

      .ml-2 {
        margin-left: 8px;
      }
    }

    .problem-title {
      color: #666;
      margin: 12px 0;
      font-size: 14px;

      .el-icon {
        color: #1890ff;
      }
    }

    .problem-stats {
      display: flex;
      justify-content: space-between;
    }
  }

  .section-title {
    color: #7d8db5;
    display: flex;
    align-items: center;
    font-size: 13px;
    margin: 15px 0;

    .el-icon {
      color: #1890ff;
      margin-right: 8px;
      font-size: 16px;
    }
  }

  .code-tag {
    margin: 5px;
    color: #1890ff;
    background: #e6f0ff;
    border: 1px solid #d6e3ff;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
      background: #d6e3ff;
    }
  }

  .ranking-item {
    display: flex;
    align-items: center;
    padding: 8px 0;

    .ranking-order {
      width: 25px;
      color: #1890ff;
    }

    .user-name {
      margin: 0 10px;
      flex-grow: 1;
    }
  }

  .progress-section {
    background: #f0f5ff;
    border-radius: 8px;
    padding: 15px;
    padding-top: 5px;
    margin-bottom: 20px;

    .el-progress {
      margin: 10px 0;
    }

    .el-progress-bar {
      background-color: #e8e8e8;
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
}
</style>
