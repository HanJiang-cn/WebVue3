<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref } from 'vue'
import empty from '@/assets/empty-projects.svg'
import { deleteApi, getApi, getMyApi } from '@/api/question'
import { usePagination } from '@/hooks/usePagination'
import { ElMessageBox, ElMessage } from 'element-plus'
import moment from 'moment'
import { useRouter } from 'vue-router'
import QuestionCompileOv from '@/components/QuestionMain/SubmitMain/QuestionCompileOv.vue'
import QuestionCompile from '@/components/QuestionMain/QuestionCompile.vue'
const router = useRouter()
const questions = ref([])
const myQuestions = ref([])
const loading = ref(false)
const radio1 = ref('全部')
const radio2 = ref('全部')
const radio3 = ref('全部')
const radio4 = ref('全部')
const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getApi({ ...pageInfo })
  loading.value = false
  questions.value = records
  setTotals(Number(total))
  questions.value = records.map((records) => ({
    ...records,
  }))
}
const loadMyData = async () => {
  loading.value = true
  const { data: { records, total } } = await getMyApi({ ...pageInfo })
  loading.value = false
  myQuestions.value = records
  setTotals(Number(total))
  myQuestions.value = records.map((records) => ({
    ...records,
  }))
}
// 删除帖子
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteApi({ id: id })
    ElMessage.success('删除成功')
    loadMyData()
    loadData()
  } catch (error) {
    // 取消删除不处理
  }
}

const handleEdit = (id) => {
  // 使用path配合query
  const url = router.resolve({
    path: '/question/edit',
    query: { id: id }
  }).href
  window.open(url, '_blank')
}
onMounted(() => {
  loadData()
  loadMyData()
})
const { totals, pageInfo, handleCurrentChange, handleSizeChange, setTotals } = usePagination(loadData)

// 新增
const handleCreate = () => {
  const url = router.resolve({
    path: '/submit',
  }).href
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <div class="title">
      <div>
        <h2 style="display: inline-block;">试题库</h2>
        <div id="right">
          <div class="right">
            <el-button id="create" type="primary" round @click="handleCreate">新增试题</el-button>
            <span> <input placeholder="请输入题号或其他关键词进行搜索" type="text">
            </span>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" style="width: 100%;">
        <el-tab-pane label="公共" name="first">
     <QuestionCompile></QuestionCompile>
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="second">
          <QuestionCompileOv></QuestionCompileOv>
        </el-tab-pane>
      </el-tabs>
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

