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

const getQuestionInfo = async () => {
  const { data } = await getDetailApi({ id: router.currentRoute.value.query.id })
  // console.log(res)
  questionData.value = data
}

onMounted(() => {
  getQuestionInfo()
})

// < !-- < el - tag type = "success" >
//   简单
//   </el - tag >
//   < !-- < el - tag type = "info" >
// 数组
//   </el - tag >
// <el-tag type="warning">
//     JavaScript -->
// </el-tag>
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
      <div class="topic-content__text">
        <h3>
          题目描述
        </h3>
        <div v-html="questionData.content">
        </div>
        <!-- <p>
          给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
        </p>
        <li>
          你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
        </li>
        <li>
          你可以按任意顺序返回答案。
        </li> -->
      </div>
      <div class="example">
        <div>
          <p>
            示例 1：
          </p>
          <p>
            输入：nums = [2,7,11,15], target = 9
          </p>
          <p>
            输出：[0,1]
          </p>
        </div>
      </div>
      <div class="hint">
        <h3>
          提示：
        </h3>
        <!-- <p>2 <= nums.length <=104 </p>
            <p>-109 <= nums[i] <=109 </p>
                <p> -109 <= target <=109 </p> -->
        <p>只会存在一个有效答案</p>
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
