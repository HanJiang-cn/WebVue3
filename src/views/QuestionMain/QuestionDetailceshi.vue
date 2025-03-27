<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref } from 'vue'
import empty from '@/assets/empty-projects.svg'
import { ceshiApi } from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import moment from 'moment'
import { useRouter } from 'vue-router'
const router = useRouter()
const questions = ref([])
const myQuestions = ref([])
const loading = ref(false)

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await ceshiApi({ ...pageInfo })
  loading.value = false
  questions.value = records
  setTotals(Number(total))
  questions.value = records.map((records) => ({
    ...records,
  }))
}
onMounted(() => {
  loadData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

const handleBrowse = (id) => {
  window.open(router.resolve({
    path: '/problems/question',
    query: {
      id: id
    }
  }).href, '_blank')
}
</script>


<script lang="ts" setup></script>
<template>
  <div>
    <div class="content">
      <template v-if="questions.length === 0 && !loading">
        <img :src="empty">
        <div class="empty-title">暂无试题</div>
        <div class="no-combo-tips">点击左侧 + 按钮，即可添加文件夹管理个人素材。</div>
      </template>
      <template v-else>
        <el-table :data="questions" v-loading="loading" style="width: 100%"
          :header-cell-style="{ background: '#409EFF', color: 'white' }">
          <el-table-column prop="title" label="题目" min-width="250">
            <template #default="{ row }">
              <span class="title-text" @click="handleBrowse(row.questionId)">{{ row.questionId }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="language" label="难度" width="120" />
          <template>
          </template>
          <el-table-column prop="current" label="时间" width="180">
            <template #default="{ row }">
              <div class="time-cell" style="font-size: 12px;">
                <div>发布：{{ moment(row.createTime).format('YYYY-MM-DD HH:mm') }}</div>
                <div v-if="row.updateTime">更新：{{ moment(row.updateTime).format('YYYY-MM-DD HH:mm') }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="内容" width="400" align="center" />
        </el-table>
        <el-pagination class="mr mt" v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals" background
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </template>

    </div>
  </div>
</template>

<style lang="less" scoped>
#right {
  float: right;
  width: 500px;

  .right {
    display: flex;
    height: 50px;
    width: 500px;

    a {
      display: inline-block;
    }

    #create {
      margin-right: 20px;
      margin-bottom: 30px;
      height: 35px;
    }

    span {
      display: inline-block;
      width: 200px;
      height: 35px;

      input {
        display: flex;
        align-items: center;
        overflow: hidden;
        border-radius: 19px;
        height: 35px;
        width: 369px;
        padding-left: 20px;
        background-color: #f6f7f9;
        border: none;
      }

    }
  }
}

.el-tabs__item {
  font-size: 19px !important;
}

.topic {
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #EBEBEB;
  padding-top: 10px;
  padding-bottom: 2px;

  .all {
    display: inline-block;
    width: 230px;
  }



}

.column {
  display: flex;
  height: 46px;
  padding-top: 10px;

  .heading {
    display: inline-block;
    width: 50px;
    flex-shrink: 0;
    color: #9096a3;
    margin-right: 16px;
    margin-top: 10px;
    text-align-last: justify;
  }

  .select {
    display: inline-block;
    overflow: hidden;

  }
}

.content {
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  padding-top: 20px;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 80%;

  .empty-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: rgb(93, 111, 143);
    margin-bottom: 8px;
  }

  .no-combo-tips {
    color: rgb(125, 140, 165);
    font-size: 12px;
    line-height: 14px;
  }

  .question {
    width: 100%;
    height: 105px;
    border: #c5c6c8 1px solid;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 5px 5px 10px rgba(189, 187, 187, 0.3);

    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
      line-height: 20px;
      color: rgb(125, 140, 165);
      margin-bottom: 10px;
    }
  }
}
</style>
