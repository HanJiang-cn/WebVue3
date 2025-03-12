<script lang="ts" setup>
import { useTeamStore } from '@/stores/team'
const teamStore = useTeamStore()
console.log(teamStore.teams)





</script>
<template>
<div class="box">
  <div class="form">
    <el-table :data="teamStore.teams" style="width: 100%">
      <el-table-column prop="teamname" label="队伍名称" width="180" />
      <el-table-column prop="contest" label="参赛项目" />
      <el-table-column prop="teachername" label="指导老师" />
      <el-table-column prop="number" label="联系方式" />
      <el-table-column label="队员详情">
        <template #default="{ row }">
          <el-descriptions :column="2" border>
            <el-descriptions-item 
              v-for="(member, index) in row.domains" 
              :key="member.key"
              :label="'队员' + index "
            >
              {{ member.value }} ({{ member.member }})
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>
<style lang="less" scoped>
/* 添加表格样式 */
.el-table {
  margin-top: 20px;
  
  :deep(.cell) {
    padding: 12px;
  }
  
  :deep(th.el-table__cell) {
    background-color: #f8f9fa;
  }
}

.el-descriptions {
  margin: 8px 0;
  
  &-item__label {
    font-weight: 500;
  }
}
</style>