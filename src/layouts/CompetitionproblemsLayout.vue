<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import logo from '@/assets/logo.webp'
import { ref } from 'vue'
import CodemirrorEditor from '@/components/ProblemsMain/CodemirrorEditor.vue'
import QuestionList from '@/components/ProblemsMain/QuestionList.vue'

const visible = ref(false)
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visibles = ref(false)
const test = ref('')
const activeName = ref('1')
const activeName1 = ref('1')
const activeName2 = ref('1')
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

const Visable = () => {
  visibles.value = !visibles.value
  console.log(visibles.value)
}

const value = ref(Date.now() + 1000 * 60 * 60 * 7)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- 头 -->
        <el-row style="width: 100%;" justify="center">
          <el-col :span="8" class="left">
            <div class="logo">
              <img :src="logo" alt="logo" />
            </div>
            <div class="button-group">
              <el-button-group>
                <el-tooltip popper-class="miaoshu" content="展开面板" placement="bottom" effect="light" :visible="visible">
                  <el-button type="primary" @mouseenter="visible = true" @mouseleave="visible = false" @click="Visable">
                    <el-icon :size="15" style="margin-right: 8px;">
                      <MenuUnfoldOutlined />
                    </el-icon>
                    题目列表
                  </el-button>
                </el-tooltip>
                <el-tooltip content="上一题" placement="bottom" effect="light" :visible="visible1">
                  <el-button type="primary" @mouseenter="visible1 = true" @mouseleave="visible1 = false">
                    <el-icon :size="15">
                      <LeftOutlined />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="下一题" placement="bottom" effect="light" :visible="visible2">
                  <el-button type="primary" @mouseenter="visible2 = true" @mouseleave="visible2 = false">
                    <el-icon :size="15">
                      <RightOutlined />
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="随机题目" placement="bottom" effect="light" :visible="visible3">
                  <el-button type="primary" @mouseenter="visible3 = true" @mouseleave="visible3 = false">
                    <el-icon :size="15">
                      <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="shuffle"
                        class="svg-inline--fa fa-shuffle absolute left-1/2 top-1/2 h-[1em] -translate-x-1/2 -translate-y-1/2 align-[-0.125em]"
                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                          d="M425 31l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-12.6 0-24.4 5.9-32 16l-46 61.3-30-40 37.6-50.1C298.2 117 324.3 104 352 104h78.1L391 65c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM204 322.7l-37.6 50.1C149.8 395 123.7 408 96 408H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c12.6 0 24.4-5.9 32-16l46-61.3 30 40zM391 287c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-27.7 0-53.8-13-70.4-35.2L128 168c-7.6-10.1-19.4-16-32-16H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c27.7 0 53.8 13 70.4 35.2L320 344c7.6 10.1 19.4 16 32 16h78.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9z">
                        </path>
                      </svg>
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
              <span class="time">剩余时间：
                <el-countdown :value="value" />
              </span>
            </div>
          </el-col>
          <el-col :span="8" class="center">
            <span>这是一个竞赛名称</span>
          </el-col>
          <el-col :span="8" class="right">
            <div>
              <el-button size="small" type="info" text>
                <el-icon :size="18">
                  <Search />
                </el-icon>
              </el-button>
            </div>
            <div>
              <el-avatar :size="25" style="margin-left: 3px;" />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row :gutter="10">
          <!-- 左边 -->
          <el-col :span="12">
            <el-card class="card-left">
              <el-tabs v-model="activeName" type="card">
                <!-- 题目描述 -->
                <el-tab-pane name="1">
                  <!-- 标题 -->
                  <template #label>
                    <el-icon>
                      <ReadOutlined />
                    </el-icon>
                    <span>题目描述</span>
                  </template>
                  <!-- 内容 -->
                  <!-- 题目 -->
                  <el-row>
                    <h1>
                      这是一个题的题目
                    </h1>
                  </el-row>
                  <!-- 标签 -->
                  <el-row style="margin-top: 10px;">
                    <el-tag type="success">
                      简单
                    </el-tag>
                    <el-tag type="info">
                      数组
                    </el-tag>
                    <el-tag type="warning">
                      JavaScript
                    </el-tag>
                  </el-row>
                  <!-- 题目描述 -->
                  <el-row style="margin-top: 10px;">
                    <div class="topic-content ">
                      <div class="topic-content__text">
                        <h3>
                          题目描述
                        </h3>
                        <p>
                          给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
                        </p>
                        <li>
                          你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
                        </li>
                        <li>
                          你可以按任意顺序返回答案。
                        </li>
                      </div>
                      <div class="example">
                        <p>
                          示例 1：
                        </p>
                        <p>
                          输入：nums = [2,7,11,15], target = 9
                        </p>
                        <p>
                          输出：[0,1]
                        </p>
                        <p>
                          解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
                        </p>
                        <p>
                          示例 2：
                        </p>
                        <p>
                          输入：nums = [3,2,4], target = 6
                        </p>
                        <p>
                          输出：[1,2]
                        </p>
                        <p>
                          示例 3：
                        </p>
                        <p>
                          输入：nums = [3,3], target = 6
                        </p>
                        <p>
                          输出：[0,1]
                        </p>
                      </div>
                    </div>
                    <!-- 提交记录 -->
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
                    </el-collapse>
                  </el-row>
                </el-tab-pane>
                <!-- 题目相关信息 -->
                <el-tab-pane name="2">
                  <template #label>
                    <el-icon>
                      <CodepenOutlined />
                    </el-icon>
                    <span>题目信息</span>
                  </template>
                  <!-- 题目信息 -->
                  <el-row style="margin-top: 10px;">
                    <div class="problem-info">
                      <div class="problem-header">
                        <h3 class="problem-title">📋 题目信息</h3>
                        <div class="difficulty-badge">简单</div>
                      </div>

                      <dl class="info-grid">
                        <!-- 目标 -->
                        <div class="info-card info-card--primary">
                          <dt class="info-label">🎯 目标要求</dt>
                          <dd class="info-content">
                            <ul class="target-list">
                              <li>完成程序并输出结果</li>
                              <li>编译成功</li>
                              <li>完成所有目标可获得满分</li>
                            </ul>
                          </dd>
                        </div>

                        <!-- 分值 -->
                        <div class="info-card info-card--highlight">
                          <dt class="info-label">⭐ 分值</dt>
                          <dd class="info-content">
                            <div class="score-display">100</div>
                            <div class="score-tip">完成所有目标可获得满分</div>
                          </dd>
                        </div>

                        <!-- 注意事项 -->
                        <div class="info-card info-card--warning">
                          <dt class="info-label">⚠️ 注意事项</dt>
                          <dd class="info-content">
                            <ol class="notice-list">
                              <li>确保完成每日一题的题目描述和示例</li>
                              <li>掌握相关解题思路和算法</li>
                            </ol>
                          </dd>
                        </div>

                        <!-- 来源 -->
                        <div class="info-source">
                          <span class="source-label">📚 题目来源：</span>
                          <span class="source-name">力扣（LeetCode）</span>
                        </div>
                      </dl>
                    </div>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
          <!-- 右边 -->
          <el-col :span="12">
            <el-card class="card-right">
              <!-- 代码 -->
              <el-tabs v-model="activeName1" type="card">
                <el-tab-pane name="1">
                  <template #label>
                    <el-icon>
                      <CodeOutlined />
                    </el-icon>
                    <span>代码</span>
                  </template>
                  <CodemirrorEditor style="width: 98%; height: 68%;" />
                  <!-- <CodemirrorEditor /> -->
                  <el-tabs v-model="activeName2" type="card" class="vscode">
                    <!-- 测试 -->
                    <el-tab-pane label="测试" name="1">
                      <template #label>
                        <el-icon>
                          <ExperimentOutlined />
                        </el-icon>
                        <span>测试</span>
                      </template>
                      <div class="test">
                        <el-input v-model="test" type="textarea" placeholder="请输入测试用例" style="width: 100%;" />
                        <el-button type="primary" style="margin-top: 10px;">测试</el-button>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="测试结果" name="2">
                      <template #label>
                        <el-icon>
                          <EllipsisOutlined />
                        </el-icon>
                        <span>测试结果</span>
                      </template>
                      <div class="result error">
                        <span>1、编译错误！</span>
                      </div>
                      <div class="result success">
                        <span>2、编译成功！</span>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <!-- 每日一题 -->
      <QuestionList :visible="visibles" @colse="visibles = false"></QuestionList>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  .el-header {
    display: flex;
    align-items: center;
    height: 48px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #ebeef5;

    .el-popper.is-customized .el-popper__arrow::before {
      background-color: #F0F0F0;
    }

    .el-row {
      height: 40px;

      .left {
        display: flex;
        align-items: center;

        .logo {
          img {
            width: 17px;
            padding-right: 7px;
            margin-right: 5px;
            border-right: 1px solid #0000000d;
          }
        }

        .button-group {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .time {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #777777;
            font-size: 14px;
            color: #1a1a1a;
            font-size: 15px;
            margin-left: 10px;

            :deep(.el-statistic) {
              .el-statistic__content {
                color: #1a1a1a;
                font-size: 15px;
              }
            }
          }

          .el-button-group {
            max-width: 250px;
            width: 200px;
            height: 32px;
            margin-left: 5px;

            &:hover {
              .el-button {
                background: #0000000d;
              }
            }

            .el-button {
              margin-right: 1px;
              background: transparent;
              color: #777777;
              font-size: 14px;
              border: none;

              &:first-child {
                width: 100px;
              }

              &:last-child,
              &:nth-child(2),
              &:nth-child(3) {
                width: 32px;
              }

              &:last-child {
                margin-right: 0;
              }

              &:hover {
                color: #1a1a1a;
                background: #E2E2E2;
              }
            }
          }
        }
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;

        span {
          color: #2c3e50;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-size: 18px;

        }
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

  .el-main {

    .el-col {
      >.el-card {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
      }
    }

    .card-left {
      height: 90vh;

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

            p,
            li {
              line-height: 1.8;
              color: #606266;
              margin-bottom: 12px;
            }
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
        }
      }

      // 题目信息
      .problem-info {
        --primary-color: #1677ff;
        --warning-color: #faad14;
        --success-color: #52c41a;
        --text-primary: rgba(0, 0, 0, 0.85);
        --text-secondary: rgba(0, 0, 0, 0.65);
        --border-radius: 8px;
        --spacing: 16px;
        --transition: all 0.2s ease;

        padding: var(--spacing);
        background: #fff;
        border-radius: var(--border-radius);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);

        &-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        &-title {
          margin: 0;
          font-size: 1.4em;
          color: var(--text-primary);
        }

        .difficulty-badge {
          padding: 4px 12px;
          background: var(--success-color);
          color: white;
          border-radius: 20px;
          font-size: 0.9em;
          font-weight: 500;
        }


        .info-grid {
          display: grid;
          gap: var(--spacing);
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .info-card {
          padding: var(--spacing);
          border-radius: var(--border-radius);
          border: 1px solid #f0f0f0;
          transition: var(--transition);

          &--primary {
            border-left: 4px solid var(--primary-color);
          }

          &--highlight {
            background: rgba(250, 173, 20, 0.05);
            border-color: rgba(250, 173, 20, 0.15);
          }

          &--warning {
            border-left: 4px solid var(--warning-color);
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }
        }

        .info-label {
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--text-primary);
          font-size: 1.1em;

          &::before {
            margin-right: 8px;
          }
        }

        .target-list {
          margin: 0;
          padding-left: 20px;

          li {
            margin-bottom: 6px;
            color: var(--text-secondary);

            &::marker {
              color: var(--primary-color);
            }
          }
        }

        .score-display {
          font-size: 2.2em;
          font-weight: 600;
          color: var(--warning-color);
          line-height: 1;
        }

        .score-tip {
          margin-top: 4px;
          font-size: 0.9em;
          color: var(--text-secondary);
        }

        .notice-list {
          counter-reset: notice-counter;
          margin: 0;
          padding-left: 0;

          li {
            position: relative;
            margin-bottom: 8px;
            padding-left: 28px;
            color: var(--text-secondary);

            &::before {
              counter-increment: notice-counter;
              content: counter(notice-counter);
              position: absolute;
              left: 0;
              top: 0;
              width: 20px;
              height: 20px;
              background: var(--warning-color);
              color: white;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
              font-size: 0.9em;
            }
          }
        }

        .info-source {
          margin-top: var(--spacing);
          padding-top: var(--spacing);
          text-align: right;
          color: var(--text-secondary);
          font-size: 0.95em;
          border-top: 1px solid #f0f0f0;

          .source-name {
            color: var(--primary-color);
            font-weight: 500;
          }
        }

        @media (max-width: 768px) {
          .problem-info {
            --spacing: 12px;

            &-title {
              font-size: 1.2em;
            }

            .info-grid {
              grid-template-columns: 1fr;
            }
          }
        }
      }
    }

    .card-right {
      height: 90vh;

      .el-tab-pane {
        margin-top: 10px;
      }

      .el-icon {
        margin-right: 5px;
      }

      // 标签页和标签
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

      .el-tab-pane {
        overflow: auto;
        height: 89vh;

        .el-tag {
          margin-right: 5px;
          border-radius: 10px;
        }
      }

      // 代码编辑器和测试及测试结果
      .vscode {
        margin-top: 15px;

        .el-tab-pane {
          overflow: auto;
          height: 14vh;

          .el-tag {
            margin-right: 5px;
            border-radius: 10px;
          }
        }

        // 测试结果
        .result {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 12px;
          }

          &.success {
            background: fade(#67C23A, 10%);

            &::before {
              background: #67C23A;
            }
          }

          &.error {
            background: fade(#F56C6C, 10%);

            &::before {
              background: #F56C6C;
            }
          }
        }
      }
    }
  }
}
</style>
