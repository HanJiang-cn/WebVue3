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
const router = useRouter()
const questions = ref([])
const myQuestions = ref([])
const loading = ref(false)
const radio1 = ref('全部')
const radio2 = ref('全部')
const radio3 = ref('全部')
const radio4 = ref('全部')
const activeName = ref('first')
// const handleClick = (tab, event) => {
//   console.log(tab, event)
// }
const handleClick = (tab) => {
  if (tab.paneName === 'first') {
    loadData()
  } else {
    loadMyData()
  }
}
const loadData = async () => {
  loading.value = true
  const { data: { records, total } } = await getApi({ ...pageInfoAll.value })
  loading.value = false
  questions.value = records
  setTotalsAll(Number(total))
}

const loadMyData = async () => {
  loading.value = true
  const { data: { records, total } } = await getMyApi({ ...pageInfoMy.value })
  loading.value = false
  myQuestions.value = records
  setTotalsMy(Number(total))
}
// 修改后的分页逻辑
const {
  totals: totalsAll,
  pageInfo: pageInfoAll,
  handleCurrentChange: handleCurrentChangeAll,
  handleSizeChange: handleSizeChangeAll,
  setTotals: setTotalsAll
} = usePagination(loadData)

const {
  totals: totalsMy,
  pageInfo: pageInfoMy,
  handleCurrentChange: handleCurrentChangeMy,
  handleSizeChange: handleSizeChangeMy,
  setTotals: setTotalsMy
} = usePagination(loadMyData)

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
onMounted(() => {
  loadData()
  loadMyData()
})
const handleRowClick = (row, column, event) => {
  // 排除操作列（最后一列）的点击
  if (column?.label === '操作' || event.target.closest('.el-button')) {
    return
  }
  handleBrowse(row.id)
}
const handleBrowse = (id) => {
  router.push({
    path: '/problem',
    query: { id: id }
  })
}

// 修改编辑方法
const handleEdit = (id) => {
  router.push({
    path: '/question/edit',
    query: { id: id }
  })
}

// 修改创建方法
const handleCreate = () => {
  router.push('/question/submit')
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
          <div class="menu">
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
              <el-table :data="questions" v-loading="loading" style="width: 100%"  @row-click="handleRowClick"
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
  <el-pagination
    class="mr mt"
    v-model:current-page="pageInfoAll.current"
    v-model:page-size="pageInfoAll.pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="sizes, prev, pager, next, jumper, total"
    :total="totalsAll"
    background
    @size-change="handleSizeChangeAll"
    @current-change="handleCurrentChangeAll"
  />
            </template>

          </div>
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="second">
          <div class="menu">
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
            <template v-if="myQuestions.length === 0 && !loading">
              <img :src="empty">
              <div class="empty-title">暂无试题</div>
              <div class="no-combo-tips">点击左侧 + 按钮，即可添加文件夹管理个人素材。</div>
            </template>
            <template v-else>
              <el-table :data="myQuestions" v-loading="loading" style="width: 100%" @row-click="handleRowClick"
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
                <el-table-column label="操作" width="120" fixed="right">
                  <template #default="{ row }">
                    <el-button type="primary" link @click="handleEdit(row.id)">
                      编辑
                    </el-button>
                    <el-button type="danger" link @click="handleDelete(row.id)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
    class="mr mt"
    v-model:current-page="pageInfoMy.current"
    v-model:page-size="pageInfoMy.pageSize"
    :page-sizes="[10, 20, 30, 40]"
    layout="sizes, prev, pager, next, jumper, total"
    :total="totalsMy"
    background
    @size-change="handleSizeChangeMy"
    @current-change="handleCurrentChangeMy"
  />
            </template>

          </div>
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
</style>
