<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { historyErrorQuestionApi } from '@/api/question'
import { getPlanListApi } from '@/api/user'
import dayjs from 'dayjs'
import { getDetailApi } from '@/api/question'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const historyErrorQuestion = ref([])
const plans = ref([])

// 获取学习计划
const planData = async () => {
  try {
    const { data } = await getPlanListApi()
    const plansWithDetails = await Promise.all(
      data.map(async (plan) => {
        try {
          // 手动解析 JSON 并确保所有 ID 都被当作字符串处理
          let questionIds
          if (typeof plan.questionId === 'string') {
            // 使用正则表达式匹配数组中的数字并保留为字符串形式
            questionIds = JSON.parse(plan.questionId.replace(/(\d+)/g, '"$1"'))
          } else {
            questionIds = []
          }

          // 将题目转换为对象
          const questionIdObjects = questionIds.map(id => ({ id }))


          // 获取所有题目详情
          const questionDetails = await Promise.all(
            questionIdObjects.map(async ({ id }) => {
              try {
                // 将字符串形式的 ID 转换为数字类型
                const numericId = BigInt(id); // 或者使用 BigInt(id) 如果需要更高精度
                const { data } = await getDetailApi({ id: numericId });
                return data;
              } catch (error) {
                console.error(`获取题目${id}详情失败:`, error);
                return null;
              }
            })
          );
          return {
            ...plan,
            questionIds,
            questionDetails: questionDetails,
            totalQuestions: questionIds.length,
          }
        } catch (error) {
          console.error('处理计划失败:', error)
          return null
        }
      })
    )

    plans.value = plansWithDetails
  } catch (error) {
    console.error('获取学习计划失败:', error)
    plans.value = []
  }
}

// 获取错题记录
const errorQuestion = async () => {
  try {
    const { data } = await historyErrorQuestionApi({ userId: userStore.id })
    historyErrorQuestion.value = data.records || []
  } catch (error) {
    console.error('获取错题记录失败:', error)
    historyErrorQuestion.value = []
  }
}
const  handleDetail= (id) => {
  window.open(router.resolve({
    path: '/problems/question',
    query: {
      id: id
    }
  }).href, '_blank')
}
onMounted(() => {
  planData()
  errorQuestion()
})
</script>
<template>
  <div class="main">
<div class="left">
      <!-- 用户信息卡片 -->
      <div class="model">
      <div class="user-card">
        <el-avatar :size="100" :src="userStore.userAvatar" />
        <div class="user-meta">
          <h3 class="username">{{ userStore.userName || '请登录' }}</h3>
          <el-text class="user-rank">
            <el-icon>
              <CaretTop />
            </el-icon>
            全站排名 TOP 5%
          </el-text>
          <el-text class="completed">
            <el-icon><CircleCheckFilled /></el-icon>
            已完成 {{ historyErrorQuestion.length }} 题
          </el-text>
        </div>
      </div>
    </div>
    <!-- 错题记录 -->
    <div class="history">
      <h3>错题记录</h3>
      <div v-if="historyErrorQuestion.length" class="error-list">
        <div
          v-for="(record, index) in historyErrorQuestion"
          :key="index"
          class="error-item"
        >
          <div class="error-content">
            <div class="question-header" >
              <span class="question-title">{{ record.questions.title }}</span>
              <el-tag
                :type="record.questions.difficulty === '简单' ? 'success'
                  : record.questions.difficulty === '中等' ? 'warning'
                  : 'danger'"
                size="small"
              >
                {{ record.questions.difficulty }}
              </el-tag>
            </div>

            <div class="question-meta">
              <!-- <span class="error-count">
                <el-icon><Warning /></el-icon>
                错误次数：{{ record.questions.record_num || 0 }}
              </span> -->
              <span class="last-time">
                <el-icon><Clock /></el-icon>
                最近错误：{{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm') }}
              </span>
            </div>
<!--
            <div class="question-tags">
              <el-tag
                v-for="(tag, tagIndex) in JSON.parse(record.questions.tags || '[]')"
                :key="tagIndex"
                size="small"
                class="tag"
              >
                {{ tag }}
              </el-tag>
            </div> -->
          </div>
          <el-button type="danger" link   @click="handleDetail(record.questions.id)">去重做</el-button>
        </div>
      </div>
      <el-empty v-else description="暂无错题记录" :image-size="80" />
    </div>
</div>
<div class="right">
      <div class="plan">
        <h3>学习计划</h3>
        <div v-if="plans.length" class="plan-list">
          <div v-for="(plan, index) in plans" :key="index" class="plan-item">
            <div class="plan-header">
              <div class="plan-title">
                <span class="plan-name">{{ plan.plan_desc || '未命名计划' }}</span>
                <el-tag type="info" size="small">
                  共 {{ plan.totalQuestions }} 题
                </el-tag>
              </div>
            </div>

            <!-- 新增题目详情展示 -->
            <div class="question-list">
              <div class="question-item" v-for="(question, qIndex) in plan.questionDetails" :key="qIndex">
                <div class="question-content"  @click="handleDetail(question.id)">
                  <span class="question-title">{{ question.title }}</span>
                  <el-tag
                    :type="question.difficulty === '简单' ? 'success'
                          : question.difficulty === '中等' ? 'warning'
                          : 'danger'"
                    size="mini"
                  >
                    {{ question.difficulty }}
                  </el-tag>
                </div>
                <!-- <div class="question-tags">
                  <el-tag
                    v-for="(tag, tagIndex) in JSON.parse(question.tags || '[]')"
                    :key="tagIndex"
                    size="mini"
                    class="tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div> -->
              </div>
            </div>

            <div class="plan-footer">
              <el-icon><Clock /></el-icon>
              <span>计划ID：{{ plan.user_plan }}</span>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无学习计划" :image-size="80" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: space-between;
  padding: 20px;
.left {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    .history {
    width:95% ;
    min-height: 500px;
    border: 1px solid #efeded;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: white;
    padding: 15px;

    h3 {
      margin: 0 0 20px 10px;
      font-size: 20px;
      color: #2c3e50;
      position: relative;
      padding-left: 15px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background-color: #e74c3c;
        border-radius: 2px;
      }
    }

    .plan-list {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .plan-item {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        transition: transform 0.2s;

        &:hover {
          transform: translateX(5px);
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          .plan-name {
            font-weight: 500;
            color: #2c3e50;
          }

          .plan-days {
            color: #e74c3c;
            font-size: 0.9em;
          }
        }

        .plan-footer {
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: #95a5a6;
          font-size: 0.9em;

          .el-icon {
            margin-right: 5px;
          }
        }
      }
    }

    .error-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .error-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }

        .error-content {
          flex: 1;

          .question-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;

            .question-title {
              font-weight: 600;
              color: #2c3e50;
              font-size: 16px;
            }
          }

          .question-meta {
            display: flex;
            gap: 20px;
            color: #666;
            font-size: 13px;
            margin-bottom: 8px;

            .el-icon {
              margin-right: 4px;
              vertical-align: middle;
            }
          }

          .question-tags {
            display: flex;
            gap: 6px;

            .tag {
              background: #f0f2f5;
              border-color: #e4e7ed;
              color: #666;
            }
          }
        }

        .el-button {
          margin-left: 15px;
          min-width: 80px;
        }
      }
    }
  }
  .model {
    width: 100%;
    height: 165px;
    border: 1px solid #efeded;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    .user-card {
      display: flex;
      height: 100%;
      align-items: center;
      padding-left: 15px;
      border-radius: 8px;

      .user-meta {
        margin-left: 30px;

        .username {
          color: #1a1a1a;
          margin: 0 0 4px 0;
          font-size: 24px;
        }

        .user-rank, .completed {
          display: block;
          margin: 8px 0;
          font-size: 14px;
          color: #666;

          .el-icon {
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }

  }
  .right {
    width: 48%;
    display: flex;
    flex-direction: column;
    .plan {
    width:95% ;
    min-height: 500px;
    border: 1px solid #efeded;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: white;
    padding: 15px;

    h3 {
      margin: 0 0 20px 10px;
      font-size: 20px;
      color: #2c3e50;
      position: relative;
      padding-left: 15px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background-color: #e74c3c;
        border-radius: 2px;
      }
    }

    .plan-list {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .plan-item {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        transition: transform 0.2s;

        &:hover {
          transform: translateX(5px);
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          .plan-name {
            font-weight: 500;
            color: #2c3e50;
          }

          .plan-days {
            color: #e74c3c;
            font-size: 0.9em;
          }
        }

        .plan-footer {
          margin-top: 10px;
          display: flex;
          align-items: center;
          color: #95a5a6;
          font-size: 0.9em;

          .el-icon {
            margin-right: 5px;
          }
        }
      }
    }

    .error-list {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .error-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }

        .error-content {
          flex: 1;

          .question-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;

            .question-title {
              font-weight: 600;
              color: #2c3e50;
              font-size: 16px;
            }
          }

          .question-meta {
            display: flex;
            gap: 20px;
            color: #666;
            font-size: 13px;
            margin-bottom: 8px;

            .el-icon {
              margin-right: 4px;
              vertical-align: middle;
            }
          }

          .question-tags {
            display: flex;
            gap: 6px;

            .tag {
              background: #f0f2f5;
              border-color: #e4e7ed;
              color: #666;
            }
          }
        }

        .el-button {
          margin-left: 15px;
          min-width: 80px;
        }
      }
    }
  }
  }
  .question-list {
  margin-top: 12px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;

  .question-item {
    padding: 8px;
    margin-bottom: 6px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);

    .question-content {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;

      .question-title {
        flex: 1;
        font-size: 13px;
        color: #2c3e50;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .question-tags {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
  }

  .more-questions {
    font-size: 12px;
    color: #95a5a6;
    text-align: center;
    padding: 4px;
  }
}

/* 调整原有样式 */
.plan-item {
  padding: 15px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  .plan-header {
    margin-bottom: 12px;
  }

  .plan-footer {
    margin-top: 12px;
    font-size: 12px;
    color: #95a5a6;
  }
}

}

@media (max-width: 768px) {
  .main {
    flex-direction: column;

    .model, .history {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>
