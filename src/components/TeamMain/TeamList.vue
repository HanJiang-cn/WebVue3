<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const emits = defineEmits(['close'])
const props = defineProps({
  visible: {
    type: Boolean
  }
})
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
  <el-dialog :model-value="props.visible" title="队伍详细信息" @close="emits('close')" width="600px" class="team-dialog">
    <el-form label-position="left" label-width="100px">
      <!-- 队伍信息展示 -->
      <el-form-item label="队伍名称：">
        <el-text tag="b">前端冲锋队</el-text>
      </el-form-item>
      <el-form-item label="比赛项目：">
        <el-text tag="b">计算机科技大赛</el-text>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-text>2024-03-15</el-text>
      </el-form-item>
      <el-form-item label="指导老师：">
        <div class="member-list">
          <el-text tag="b">xxx</el-text>
        </div>
      </el-form-item>
      <el-form-item label="队长：">
        <div class="member-list">
          <el-text tag="b">xxx</el-text>
        </div>
      </el-form-item>
      <el-form-item label="团队宣言：">
        <el-text type="info">永远相信美好的事情即将发生！</el-text>
      </el-form-item>
      <!-- <el-form-item label="队伍成员：">
        <div class="member-list">
          <el-tag v-for="(member, index) in members" :key="index" class="member-tag" effect="plain">
            <span class="member-name">{{ member.name }}</span>
          </el-tag>
        </div>
      </el-form-item> -->
    </el-form>
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
  </el-dialog>
</template>

<style lang="less" scoped>
.el-button {
  width: 71.33px;
  height: 24px;
}

.team-dialog {
  :deep(.el-dialog__body) {
    padding: 20px 30px;
  }

  .el-form-item {
    margin-bottom: 18px;

    &__label {
      font-weight: 500;
      color: #606266;
    }
  }

  .member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .member-tag {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 16px;
    }
  }

  .dialog-footer {
    margin-top: 24px;
    text-align: right;

    .el-button {
      margin-left: 12px;
      min-width: 80px;
    }
  }

  @media (max-width: 768px) {
    :deep(.el-dialog) {
      width: 90% !important;
    }

    .member-tag {
      font-size: 12px;
    }
  }
}

.member-section {
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
}
</style>
