<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref,reactive } from 'vue'
import empty from '@/assets/empty-projects.svg'
import { getApi } from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import moment from 'moment'
import { useRouter } from 'vue-router'
const router = useRouter()
const questions = ref([])
const loading = ref(false)
const radio1 = ref('全部')
const radio2 = ref('全部')
const radio3 = ref('全部')
const radio4 = ref('全部')
// 筛选条件
const filter = reactive({
  title: '',
  sort: 'newest'
})

// 搜索题目
const fetchQuestion = () => {
  loadData()
}
// 获取题目列表
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getApi({ ...pageInfo , title: filter.title })
  loading.value = false
  questions.value = records
  setTotals(Number(total))
}

onMounted(() => {
  loadData()
})

const handleBrowse = (id) => {
  window.open(router.resolve({
    path: '/problems/question',
    query: {
      id: id
    }
  }).href, '_blank')
}

const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)
</script>

<template>
  <div class="menu">
    <div id="right">
          <div class="right">
            <el-input v-model="filter.title" placeholder="搜索帖子标题..." clearable style="width: 300px;height: 30px;" @change="fetchQuestion">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
          </div>
        </div>
    <div class="column">
      <span class="heading">方向</span>
      <div class="select">
        <div>
          <el-radio-group v-model="radio1" size="large">
            <el-radio-button label="全部" value="全部" />
            <el-radio-button label="Java" value="Java" />
            <el-radio-button label="Web" value="Web" />
            <el-radio-button label="C++" value="C++" />
            <el-radio-button label="多选" value="Pathon" />
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="column">
      <span class="heading">知识点</span>
      <div>
        <el-radio-group v-model="radio2" size="large">
          <el-radio-button label="全部" value="全部" />
        </el-radio-group>
      </div>
    </div>
    <div class="column">
      <span class="heading">题型</span>
      <div class="select">
        <div>
          <el-radio-group v-model="radio3" size="large">
            <el-radio-button label="全部" value="全部" />
            <el-radio-button label="编程题" value="编程题" />
            <el-radio-button label="单选" value="单选" />
            <el-radio-button label="多选" value="多选" />
            <el-radio-button label="判断" value="判断" />
            <el-radio-button label="填空" value="填空" />
            <el-radio-button label="简答" value="简答" />
            <el-radio-button label="程序填空" value="程序填空" />
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="column">
      <span class="heading">方向</span>
      <div class="select">
        <div>
          <el-radio-group v-model="radio4" size="large">
            <el-radio-button label="全部" value="全部" />
            <el-radio-button label="简单" value="简单" />
            <el-radio-button label="适中" value="适中" />
            <el-radio-button label="困难" value="困难" />
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
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
            <span class="title-text" @click="handleBrowse(row.id)">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="难度" width="120" />
        <template>
        </template>
        <el-table-column prop="current" label="时间" width="180">
          <template #default="{ row }">
            <div class="time-cell" style="font-size: 12px;">
              <div>发布：{{ moment(row.current).format('YYYY-MM-DD HH:mm') }}</div>
              <div v-if="row.current">更新：{{ moment(row.current).format('YYYY-MM-DD HH:mm') }}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next, jumper, total" :total="totals" background
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </template>
  </div>
</template>

<style lang="less" scoped>
#right {
  float: right;
  width: 300px;

  .right {
    display: flex;
    height: 50px;
    width: 300px;

    a {
      display: inline-block;
    }

    #create {
      margin-right: 20px;
      margin-bottom: 30px;
      height: 35px;
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
  padding-bottom: 50px;

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
.title-text {
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      color: #409EFF;

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: #409EFF;
      transition: width 0.3s;
    }
  }
</style>
