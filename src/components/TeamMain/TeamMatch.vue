<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps({
  dialogFormVisible: {
    type: Boolean
  }
})

const closeDialog = () => {
  emit('close')
}

// 模拟匹配详情数据
const matchDetail = ref({
  competition: {
    name: '2023 ACM 编程大赛',
    type: '团队赛',
    deadline: '2023-12-31 23:59',
    status: '报名中'
  },
  team: {
    name: '匹配队伍1',
    currentMembers: 3,
    requiredMembers: 4,
    tags: ['算法', '数据结构', 'Python']
  },
  members: [
    {
      name: '张三',
      avatar: 'https://example.com/avatar1.jpg',
      role: '队长',
      skills: ['动态规划', '图论'],
      contact: 'zhangsan@example.com'
    },
    {
      name: '李四',
      avatar: 'https://example.com/avatar2.jpg',
      role: '后端开发',
      skills: ['数据库', '分布式系统'],
      contact: 'lisi@example.com'
    },
    {
      name: '王五',
      avatar: 'https://example.com/avatar3.jpg',
      role: '前端开发',
      skills: ['Vue', 'React'],
      contact: 'wangwu@example.com'
    }
  ]
})
</script>

<template>
  <el-dialog :model-value="props.dialogFormVisible" @close="closeDialog" title="匹配详情" width="800">
    <!-- 顶部信息 -->
    <div class="top-info">
      <span>匹配代码：1234567890</span>
    </div>
    <!-- 比赛信息 -->
    <el-descriptions title="比赛信息" :column="2" border>
      <el-descriptions-item label="比赛名称">{{ matchDetail.competition.name }}</el-descriptions-item>
      <el-descriptions-item label="比赛类型">{{ matchDetail.competition.type }}</el-descriptions-item>
      <el-descriptions-item label="截止时间">{{ matchDetail.competition.deadline }}</el-descriptions-item>
      <el-descriptions-item label="当前状态">
        <el-tag type="success">{{ matchDetail.competition.status }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 队伍信息 -->
    <el-descriptions title="队伍信息" :column="2" border class="mt-20">
      <el-descriptions-item label="队伍名称">{{ matchDetail.team.name }}</el-descriptions-item>
      <el-descriptions-item label="当前人数">
        <span class="member-count">{{ matchDetail.team.currentMembers }}/{{ matchDetail.team.requiredMembers }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="队伍标签">
        <el-tag v-for="(tag, index) in matchDetail.team.tags" :key="index" type="info" class="mr-10">
          {{ tag }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 成员信息 -->
    <div class="member-section mt-20">
      <h4 class="section-title">成员信息</h4>
      <div class="member-list">
        <div v-for="(member, index) in matchDetail.members" :key="index" class="member-card">
          <el-avatar :size="50" :src="member.avatar" />
          <div class="member-info">
            <div class="name-role">
              <span class="name">{{ member.name }}</span>
              <el-tag v-if="member.role" size="small" effect="dark">{{ member.role }}</el-tag>
            </div>
            <div class="skills">
              <el-tag v-for="(skill, sIndex) in member.skills" :key="sIndex" type="info" size="small" class="mr-10">
                {{ skill }}
              </el-tag>
            </div>
            <div class="contact">
              <el-icon>
                <Message />
              </el-icon>
              <span>{{ member.contact }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
        <el-button type="primary" @click="closeDialog">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.top-info {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;

  span {
    font-size: 15px;
    font-weight: bold;
    margin-right: 15px;
  }
}

.mt-20 {
  margin-top: 20px;
}

.mr-10 {
  margin-right: 10px;
}

:deep(.el-descriptions__title) {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
}

.member-count {
  color: #409EFF;
  font-weight: 500;
}

.section-title {
  font-size: 14px;
  color: #606266;
  margin: 0 0 15px;
  padding-left: 8px;
  border-left: 3px solid #409EFF;
}

.member-list {
  display: grid;
  gap: 16px;
}

.member-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .member-info {
    margin-left: 15px;
    flex: 1;

    .name-role {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;

      .name {
        font-weight: 500;
        color: #2c3e50;
      }
    }

    .skills {
      margin: 8px 0;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #909399;
      font-size: 0.9em;

      i {
        font-size: 0.95em;
      }
    }
  }
}

.dialog-footer {
  padding-top: 20px;
  text-align: right;
}
</style>
