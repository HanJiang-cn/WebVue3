<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { onMounted, ref } from 'vue'
import CommentComponent from '@/components/CommentComponent.vue'
import { getDetailApi } from '@/api/question'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableData = [
  {
    date: '2023-06-01',
    status: '编译成功',
    time: '10:00',
    memory: '100MB',
    notes: '完成了每日一题',
  },
  {
    date: '2023-06-02',
    status: '编译失败',
    time: '15:30',
    memory: '80MB',
    notes: '正在进行每日一题',
  },
  {
    date: '2023-06-03',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  },
  {
    date: '2023-06-04',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  },
  {
    date: '2023-06-05',
    status: '编译失败',
    time: '00:00',
    memory: '0MB',
    notes: '未开始每日一题',
  }


]
const questionData = ref({})

const getQuestion = async () => {
  const { data } = await getDetailApi({ id: router.currentRoute.value.query.id })
  console.log(data)
  questionData.value = data
  processQuestionData()
}
// 新增工具函数：安全解析 JSON
const safeParseJSON = (str, defaultValue = []) => {
    // 如果已经是数组或对象直接返回
    if (Array.isArray(str) || typeof str === 'object') return str
  if (!str) return defaultValue
  try {
    const sanitized = str
      .replace(/'/g, '"')
      .replace(/\\/g, '\\\\')
    return JSON.parse(sanitized)
  } catch (e) {
    console.error('JSON解析失败:', e)
    return defaultValue
  }
}
//处理题目数据
const processQuestionData = () => {
  console.log('原始题目数据:', questionData.value)
  questionData.value.tags = safeParseJSON(questionData.value.tags || '[]')
  questionData.value.judgeCase = safeParseJSON(questionData.value.judgeCase || '[]')
  questionData.value.question_example = safeParseJSON(questionData.value.question_example || '[]')
  questionData.value.question_prompt = safeParseJSON(questionData.value.question_prompt || '[]')

  console.log('处理后的题目数据:', {
    tags: questionData.value.tags,
    judgeCase: questionData.value.judgeCase,
    question_example: questionData.value.question_example,
    question_prompt: questionData.value.question_prompt
  })
}
onMounted(() => {
  getQuestion()
})

</script>

<template>
  <!-- 内容 -->
  <!-- 题目 -->
  <el-row>
    <h1>
      {{ questionData.title }}
    </h1>
  </el-row>
  <!-- 标签 -->
  <el-row style="margin-top: 10px;">
    <el-tag type="success" v-for="item in questionData.tags" :key="item">{{ item }}</el-tag>
  </el-row>
  <!-- 题目描述 -->
  <!-- 提交记录&评论 -->
  <el-row style="margin-top: 10px;">
    <div class="topic-content ">
                      <!-- 题目描述部分 -->
                      <div class="topic-content__text">
                        <h3>题目描述</h3>
                        <p class="difficulty">本题目难度：<span>{{ questionData?.difficulty }}</span></p>
                        <div v-html="questionData?.content" class="content"></div>
                        <!-- 标签渲染 -->
                        <el-row class="tags-row" v-if="questionData?.tags?.length">
                          <el-tag v-for="(tag, index) in questionData.tags" :key="index" type="success"
                            class="tag-item">
                            {{ tag }}
                          </el-tag>
                        </el-row>

                        <!-- 评测用例渲染 -->
                        <div v-if="questionData?.judgeCase?.length" class="judge-cases">
                          <h4>评测用例</h4>
                          <ul>
                            <li v-for="(caseItem, index) in questionData.judgeCase" :key="index">
                              <div class="case-item">
                                <label>输入：</label>
                                <pre>{{ caseItem.input }}</pre>
                                <label>输出：</label>
                                <pre>{{ caseItem.output }}</pre>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <!-- 题目提示 -->
                        <div  v-if="questionData?.question_prompt">
                          <ul>
                            <li
                            v-for="(prompt, index) in questionData?.question_prompt" :key="index"
                              class="hint">
                              <div>
                                <div style="font-size: larger;"><strong>提示</strong>{{ index + 1 }}</div>
                                <div>{{ prompt }}</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="example"   v-if="questionData?.question_example?.length">
                        <p v-for="(example, index) in questionData.question_example" :key="index">
                          <span class="example-label">输入：{{ example.input }}&nbsp;</span>
                          <span class="example-input">输出：{{ example.output }}&nbsp;</span>
                          <span class="example-output">解释：{{ example.explain }}&nbsp;</span>
                        </p>
                      </div>
                    </div>
    <!-- 提交记录&评论 -->
    <el-collapse style="width: 100%;">
      <!-- 提交记录 -->
      <el-collapse-item title="提交记录" name="1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="status" label="运行状态">
            <template #default="scope">
              <el-tag v-if="scope.row.status === '编译成功'" type="success">
                {{ scope.row.status }}
              </el-tag>
              <el-tag v-else-if="scope.row.status === '编译失败'" type="danger">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="执行用时" />
          <el-table-column prop="memory" label="消耗内存" />
          <el-table-column prop="notes" label="备注" />
        </el-table>
      </el-collapse-item>
      <!-- 评论 -->
      <el-collapse-item title="评论" name="2">
        <CommentComponent></CommentComponent>
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>

<style lang="less" scoped>
// 题解内容页面
.solution-content {
  .title {
    width: 11%;
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;

    .el-text {
      margin-left: 5px;
    }
  }
}

// 提交记录&评论
.el-collapse {
  border: none;

  :deep(.el-collapse-item__header) {
    height: 50px;
    padding: 0 20px;
    font-size: 15px;
    color: #2c3e50;
    background: rgba(#409EFF, 0.05);
    border-radius: 8px;
    border-bottom: none;
    margin-top: 24px;
  }

  :deep(.el-collapse-item__content) {
    .el-table {
      margin-top: 16px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }
  }
}

.up-solution {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 15px;
  border-bottom: 1px solid #0000000d;

}

.el-tab-pane {
  margin-top: 10px;
}

.el-icon {
  margin-right: 5px;
}

:deep(.el-tabs__header) {
  margin-top: 10px;
  border: none;
  height: 10px;

  .el-tabs__nav {
    border: none;

    .el-tabs__item {
      margin-left: 5px;
      border: none;
      font-size: 14px;
      color: #777777;
      border-radius: 15px;

      &:hover {
        color: #1a1a1a;
        border-radius: 15px;
        background: #00000d0d;
      }
    }

    .is-active {
      color: #1a1a1a;
      background: rgba(#409EFF, 0.1);
    }
  }


}

// 实例&提示&题目描述
.el-tab-pane {
  overflow: auto;
  height: 80vh;

  // 标签
  .el-tag {
    margin-right: 5px;
    border-radius: 10px;
  }

  // 题目描述
  .topic-content {
    width: 100%;
    // margin-top: 10px;
    line-height: 1.6;
    position: relative;
    padding-right: 20px;

    .topic-content__text {
      h3 {
        font-size: 18px;
        color: #2c3e50;
        margin: 24px 0 16px;
        padding-left: 12px;
        border-left: 4px solid #409EFF;
      }

      // p,
      // li {
      //   line-height: 1.8;
      //   color: #606266;
      //   margin-bottom: 12px;
      // }
    }

    // 示例
    .example {
      background: rgba(#409EFF, 0.03);
      border: 1px solid rgba(#409EFF, 0.1);
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
      position: relative;

      // ::before 是伪元素选择器，用于在元素前面插入内容
      &::before {
        content: '示例';
        position: absolute;
        top: -12px;
        left: 20px;
        background: white;
        padding: 0 8px;
        color: #409EFF;
        font-size: 16px;
        font-weight: 500;
      }

      p {
        margin: 8px 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        color: #2c3e50;

        &:nth-child(odd) {
          color: #909399;
        }
      }
    }

    // 提示
    .hint {
      background: #fff9f0;
      border-left: 4px solid #E6A23C;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;

      h3 {
        color: #E6A23C;
        border-color: #E6A23C;
        margin-top: 0;
      }

      p {
        color: #8c6b3f;
        font-size: 14px;
      }
    }
  }
}
</style>
