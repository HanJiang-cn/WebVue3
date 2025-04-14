<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { updateCompetition } from '@/api/competition'
import MdEditor from '@/components/MdEditor.vue'
import router from '@/router'
import Cookies from 'js-cookie'

// 表单引用
const formRef = ref(null)
const form = reactive({
  name: '',
  info: '',
  coverUrl: '',
  organizer: '',
  pushName: '',
  type: '',
  tel: '',
  status: '',
  startTime: "",
  endTime: "",
  isStart:0,
})
const type = ref([
  { value: '1', label: '团队赛' },
  { value: '0', label: '个人赛' },
])
const submitting = ref(false)

// 验证规则
const rules = reactive({
  name: [
    { required: true, message: '竞赛名称不能为空', trigger: 'blur' },
    { min: 5, max: 50, message: '长度在5到50个字符', trigger: 'blur' }
  ],
  info: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 20, message: '内容至少20个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  organizer: [
    { required: true, message: '请输入组织方', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }
  ],
  pushName: [
    { required: true, message: '请输入发布人', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }
  ],
  tel: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  startTime: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  endTime: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ]
})

// 草稿相关操作
const DRAFT_KEY = 'post_draft'
const COOKIE_OPTIONS = { expires: 7 } // 7天后过期
// const

// 保存草稿
const saveDraft = () => {
  Cookies.set(DRAFT_KEY, JSON.stringify(form), COOKIE_OPTIONS)
  ElNotification({
    title: '提示',
    message: '草稿已保存',
    type: 'success',
    duration: 2000
  })
}
// 清除草稿
const clearDraft = () => {
  Cookies.remove(DRAFT_KEY)
  formRef.value.resetFields()
  ElMessage({
    message: '草稿已清除',
    type: 'success',
  })
  // 刷新页面
  window.location.reload()
}
// 加载草稿
function loadDraft() {
  const draft = Cookies.get(DRAFT_KEY)
  if (draft) {
    try {
      const parsed = JSON.parse(draft)
      // Object.assign 是为了确保 tags 和 type 被正确地加载
      // 即使它们在草稿中被存储为数组或字符串，也能正确地转换为数组。
      Object.assign(form, parsed)
      ElNotification({
        title: '草稿加载成功',
        message: '检测到未发布的草稿，已自动加载',
        type: 'info',
        duration: 3000
      })
    } catch (e) {
      console.error('草稿解析失败:', e)
    }
  }
}

onMounted(() => {
  loadDraft()
})
// 处理富文本内容上传
function uploadInfo(data) {
  form.info = data
}

// 处理封面图上传
const handleCoverChange = (file) => {
  // 校验图片大小和类型
  const isImage = file.raw.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElNotification({
      title: '文件类型错误',
      message: '只能上传图片文件',
      type: 'error'
    })
    return false
  }

  if (!isLt2M) {
    ElNotification({
      title: '文件过大',
      message: '图片大小不能超过 2MB',
      type: 'error'
    })
    return false
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    form.cover = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

// 提交表单
const submitForm = async () => {
  submitting.value = true
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await addCompetition({
          ...form,
          startTime: form.startTime ? new Date(form.startTime).getTime() : null,
          endTime: form.endTime ? new Date(form.endTime).getTime() : null,
          type: form.type,  // 直接使用选择器值
          status: form.status ? 1 : 0
        })
        console.log(res)

        if (res.code === 0) {
          ElNotification({
            title: '成功',
            message: '发布成功！',
            type: 'success',
          })
          localStorage.removeItem(DRAFT_KEY) // 清除草稿
          formRef.value.resetFields()
          window.open(router.resolve({
            path: '/admin/competition',
          }).href, '_self')
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
      <h1 class="post-title">更新竞赛</h1>
      <p class="post-subtitle">填写竞赛详细信息并发布</p>
    </div>

    <!-- 主表单区 -->
    <div class="form-content">
      <el-form-item prop="name" label="竞赛名称：" class="form-section">
        <el-input v-model="form.name" placeholder="请输入竞赛名称（5-50字）" maxlength="50" show-word-limit clearable />
      </el-form-item>

      <el-form-item prop="info" label="竞赛详情：" class="form-section">
        <MdEditor :constEdit="form.info" @modelValue="uploadInfo" class="rich-editor"
          placeholder="请输入竞赛详细说明（至少20字）" />
      </el-form-item>

      <!-- 基本信息行 -->
      <el-row :gutter="20" class="form-section">
        <el-col :xs="24" :sm="8">
          <el-form-item prop="type" label="参与方式：">
            <el-select v-model="form.type" placeholder="请选择类型" clearable>
              <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item prop="organizer" label="组织方：">
            <el-input v-model="form.organizer" placeholder="请输入组织方名称" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-form-item prop="pushName" label="发布人：">
            <el-input v-model="form.pushName" placeholder="请输入发布人姓名" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 联系方式行 -->
      <el-row :gutter="20" class="form-section">
        <el-col :xs="24" :sm="12">
          <el-form-item prop="tel" label="联系电话：">
            <el-input v-model="form.tel" placeholder="请输入联系人电话" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 时间选择行 -->
      <el-row :gutter="20" class="form-section">
        <el-col :xs="24" :sm="12">
          <el-form-item prop="startTime" label="开始时间：">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择开始时间"
              format="YYYY/MM/DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item prop="endTime" label="结束时间：">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择结束时间"
              format="YYYY/MM/DD HH:mm"
              value-format="YYYY-MM-DD HH:mm"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 封面图上传 -->
      <el-form-item label="封面图：" class="form-section">
        <el-upload
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleCoverChange"
          accept="image/jpeg,image/png"
        >
          <div class="cover-upload">
            <img v-if="form.coverUrl" :src="form.coverUrl" class="cover-preview">
            <div v-else class="upload-placeholder">
              <el-icon :size="32" class="upload-icon">
                <Camera />
              </el-icon>
              <div class="upload-text">点击上传封面图</div>
              <div class="upload-tips">建议尺寸：800x450，支持JPG/PNG格式</div>
            </div>
          </div>
        </el-upload>
      </el-form-item>
    </div>

    <!-- 提交栏 -->
    <div class="submit-bar">
      <el-button type="primary" size="large" :loading="submitting" @click="submitForm">
        立即发布
      </el-button>
      <el-button size="large" @click="clearDraft">重置</el-button>
      <el-button size="large" @click="saveDraft">保存草稿</el-button>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.post-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);

  .post-header {
    margin-bottom: 32px;
    text-align: center;

    .post-title {
      font-size: 28px;
      color: #1a1a1a;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .post-subtitle {
      color: #666;
      font-size: 14px;
    }
  }

  .form-content {
    padding: 0 20px;
  }

  :deep(.el-form-item) {
    margin-bottom: 22px;

    &__label {
      font-weight: 500;
      color: #444;
      padding-right: 15px;
    }
  }

  .cover-upload {
    width: 100%;
    max-width: 400px;
    height: 200px;
    border: 2px dashed #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      border-color: #409EFF;
    }

    .cover-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }

    .upload-placeholder {
      text-align: center;
      color: #999;

      .upload-icon {
        margin-bottom: 12px;
        color: #ccc;
      }

      .upload-text {
        font-size: 14px;
        margin-bottom: 4px;
      }

      .upload-tips {
        font-size: 12px;
        color: #aaa;
      }
    }
  }

  .submit-bar {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    text-align: center;

    .el-button {
      width: 120px;
      margin: 0 8px;
      &--primary {
        background: linear-gradient(135deg, #409EFF, #3375b9);
        border: none;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 24px;

    .form-content {
      padding: 0;
    }

    .cover-upload {
      height: 160px;
    }

    .submit-bar {
      .el-button {
        width: 100%;
        margin: 8px 0;
      }
    }
  }
}

.rich-editor {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s;

  &:hover {
    border-color: #c0c4cc;
  }
}
</style>
