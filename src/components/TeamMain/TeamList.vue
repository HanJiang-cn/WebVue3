<template>

   <el-button type="primary"  @click="dialogVisible = true">队伍信息</el-button>

   <el-dialog
    v-model="dialogVisible"
    title="队伍详细信息"
    width="600px"
    class="team-dialog"
  >
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
      <el-form-item label="队伍成员：">
        <div class="member-list">
          <el-tag  v-for="(member, index) in members" :key="index" class="member-tag"   effect="plain" >
            <span class="member-name">{{ member.name }}</span>
          </el-tag>
        </div>
      </el-form-item>

      <el-form-item label="团队宣言：">
        <el-text type="info">永远相信美好的事情即将发生！</el-text>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'


const dialogVisible = ref(false)
const members = ref([
  { name: '张三' },
  { name: '李四' },
  { name: '王五'}
])


</script>

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
</style>