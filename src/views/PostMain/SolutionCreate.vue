<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { addSolutionApi, addDraftApi } from '@/api/solution'
import { useRouter } from 'vue-router'
import MdEditor from '@/components/MdEditor.vue'
import Cookies from 'js-cookie'

const router = useRouter()
// 表单引用
const formRef = ref(null)
const form = reactive({
  title: '',
  context: '',
  solutionClass: '',
  questionId: '',
  // tags: [],
  // cover: null
})
// 题目ID
form.questionId = router.currentRoute.value.query.id || ''
// 判断是否编辑ID
const isEdit = router.currentRoute.value.query.id !== undefined

const solutionClass = ref([
  { value: 'java', label: 'Java' },
  { value: 'Html', label: 'Html' },
])
const submitting = ref(false)

// 验证规则
const rules = reactive({
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { min: 5, max: 50, message: '长度在5到50个字符', trigger: 'blur' }
  ],
  context: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 20, message: '内容至少20个字符', trigger: 'blur' }
  ],
  solutionClass: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
})

// 草稿相关操作
const DRAFT_KEY = 'solution_draft'
const COOKIE_OPTIONS = { expires: 7 } // 7天后过期

// 保存草稿
const saveDraft = async () => {
  // Cookies.set(DRAFT_KEY, JSON.stringify(form), COOKIE_OPTIONS)
  const res = await addDraftApi({ ... form })
  console.log(res)
  ElNotification({
    title: '提示',
    message: '草稿已保存',
    type: 'success',
    duration: 2000
  })
}
// 清除草稿
// const clearDraft = () => {
//   Cookies.remove(DRAFT_KEY)
//   formRef.value.resetFields()
//   ElMessage({
//     message: '草稿已清除',
//     type: 'success',
//   })
//   // 刷新页面
//   window.location.reload()
// }
// 加载草稿
// function loadDraft() {
//   const draft = Cookies.get(DRAFT_KEY)
//   if (draft) {
//     try {
//       const parsed = JSON.parse(draft)
//       // Object.assign 是为了确保 tags 和 category 被正确地加载
//       // 即使它们在草稿中被存储为数组或字符串，也能正确地转换为数组。
//       Object.assign(form, parsed)
//       ElNotification({
//         title: '草稿加载成功',
//         message: '检测到未发布的草稿，已自动加载',
//         type: 'info',
//         duration: 3000
//       })
//     } catch (e) {
//       console.error('草稿解析失败:', e)
//     }
//   }
// }
function loadDraft() {

}

onMounted(() => {
  loadDraft()
})
// 处理富文本内容上传
function uploadContent(data) {
  form.context = data
}

// 提交表单
const submitForm = async () => {
  submitting.value = true
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await addSolutionApi({
          ...form,
        })
        console.log(res)
        if (res.code === 0) {
          ElNotification({
            title: '成功',
            message: '发布成功，正在审核',
            type: 'success',
          })
          Cookies.remove(DRAFT_KEY) // 清除草稿
          formRef.value.resetFields()
          if (router.currentRoute.value.query.id !== undefined) {
            router.push({
              path: '/problems/solution',
              query: {
                id: router.currentRoute.value.query.id
              }
            })
          } else {
            router.go(-1)
          }
        }
        submitting.value = false
        return
      }
      catch (error) {
        ElNotification({
          title: '发布失败',
          message: error.message || '请检查网络连接后重试',
          type: 'error'
        })
        submitting.value = false
      }
    }
  })
  submitting.value = false
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="post-container">
    <!-- 头部 -->
    <div class="post-header">
      <h1 class="post-title">发布新题解</h1>
      <div class="post-tips">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <span>优质内容更容易获得推荐哦～</span>
      </div>
    </div>

    <!-- 主表单区 -->
    <el-form-item prop="title" label="标题" class="form-section">
      <el-input v-model="form.title" placeholder="请输入标题（5-50字）" maxlength="50" show-word-limit clearable size="large" />
    </el-form-item>

    <el-form-item prop="context" class="form-section">
      <MdEditor :constEdit="form.context" @modelValue="uploadContent" class="rich-editor"
        placeholder="请输入正文内容（至少20字）" />
    </el-form-item>

    <!-- 分类和标签 -->
    <el-row :gutter="24" class="form-section">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="solutionClass" label="分类">
          <el-select v-model="form.solutionClass" placeholder="请选择分类" clearable class="full-width">
            <el-option v-for="item in solutionClass" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <!-- 题目ID -->
        <el-form-item label="题目ID">
          <el-input v-model="form.questionId" placeholder="请输入题目ID" clearable size="large" :disabled="isEdit" />
        </el-form-item>
      </el-col>

      <!-- <el-col :xs="24" :sm="12">
        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple filterable allow-create :max="5" placeholder="添加标签（最多5个）"
            class="full-width">
            <el-option v-for="tag in suggestedTags" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>
      </el-col> -->
    </el-row>

    <!-- 提交栏 -->
    <div class="submit-bar">
      <el-button type="primary" size="large" :loading="submitting" @click="submitForm">
        立即发布
      </el-button>
      <!-- <el-button size="large" @click="clearDraft">
        重置页面
      </el-button> -->
      <el-button size="large" @click="saveDraft">
        保存草稿
      </el-button>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  .post-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--el-border-color-light);

    .post-title {
      font-size: 24px;
      color: var(--el-text-color-primary);
      margin-bottom: 8px;
    }

    .post-tips {
      display: flex;
      align-items: center;
      color: var(--el-text-color-secondary);
      font-size: 14px;

      .el-icon {
        margin-right: 8px;
        color: var(--el-color-info);
      }
    }
  }

  .form-section {
    margin-bottom: 28px;

    :deep(.el-form-item__label) {
      font-weight: 500;
      margin-bottom: 8px;
      display: block;
    }
  }

  .cover-upload {
    width: 240px;
    height: 135px;
    border: 2px dashed var(--el-border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    overflow: hidden;
    background-color: var(--el-fill-color-light);

    &:hover {
      border-color: var(--el-color-primary);
    }

    .cover-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .upload-placeholder {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-text-color-secondary);

      .upload-text {
        margin-top: 8px;
        font-size: 14px;
      }

      .upload-tips {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
        margin-top: 4px;
      }
    }
  }

  .submit-bar {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--el-border-color-light);
    text-align: right;

    .el-button {
      width: 120px;
      margin-left: 16px;
    }
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    margin: 12px;

    .cover-upload {
      width: 100%;
      height: 56.25vw; // 保持16:9比例
    }

    .submit-bar {
      .el-button {
        width: 100%;
        margin-left: 0;
        margin-top: 12px;
      }
    }
  }
}

// 增强富文本编辑器样式
.rich-editor {
  width: 100%;
}

.full-width {
  width: 100%;
}
</style>
