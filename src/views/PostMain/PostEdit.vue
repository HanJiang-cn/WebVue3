<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { getPostApi, editPostApi, addPostApi } from '@/api/post'
import { addFileApi } from '@/api/upfile'
import MdEditor from '@/components/MdEditor.vue'

const router = useRouter()
const postId = ref(router.currentRoute.value.query.id)
// 表单引用
const formRef = ref(null)
const formStatus = ref('') // 初始状态为编辑

const form = reactive({
  title: '',
  content: '',
  post_classes: '',
  post_picture: '',
  tags: []
})
const categories = ref([
  { value: '技术分享', label: '技术分享' },
  { value: '算法题解', label: '算法题解' },
  { value: '生活感悟', label: '生活感悟' },
  { value: '问题求助', label: '问题求助' }
])
const suggestedTags = ref(['题目交流', '职业发展', '前端', '数据结构', '面试经验', '学习方法'])
const submitting = ref(false)

// 验证规则
const rules = reactive({
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { min: 5, max: 50, message: '长度在5到50个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 20, message: '内容至少20个字符', trigger: 'blur' }
  ],
  post_classes: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
})

onMounted(async () => {
  const router = useRouter()
  const postId = ref(router.currentRoute.value.query.id)
  try {
    const res = await getPostApi({ id: postId.value })
    if (res.code === 0) {
      form.title = res.data.title
      form.content = res.data.content
      form.post_classes = res.data.post_classes
      formStatus.value = res.data.status
      form.tags = res.data.tagList
      // 处理服务器返回的封面URL
      if (res.data.post_picture) {
        form.post_picture = res.data.post_picture
      }
    }
  } catch (error) {
    ElNotification({
      title: '加载失败',
      message: '获取帖子详情失败，请刷新重试',
      type: 'error'
    })
  }
})

function uploadContent(data) {
  form.content = data
}

// 处理封面图上传
const fileData = ref(null)
const beforeAvatarUpload = (file) => {
  // 检测字符串是否以指定的前缀开始
  const isImage = file.raw.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElNotification({
      title: '错误',
      message: '请上传 JPEG 或 PNG 格式的图片',
      type: 'error'
    })
  }

  if (!isLt2M) {
    ElNotification({
      title: '文件过大',
      message: '图片大小不能超过 2MB',
      type: 'error'
    })
    return false
  }

  fileData.value = file
  // 显示缩略图
  // 本地文件内容读取
  const reader = new FileReader()
  fileData.value = file
  // 设置文件加载完成回调（base64格式转换）
  reader.onload = (e) => {
    // 将图片Base64数据赋值给表单头像字段
    form.post_picture = e.target.result
  }
  // 启动文件读取（将文件转换为Data URL格式）
  reader.readAsDataURL(file.raw)
}
const handleUpload = async () => {
  if (fileData.value) {
    // 创建 FormData 对象
    const formData = new FormData()
    // 添加文件到表单数据，使用原始文件对象
    formData.append('file', fileData.value.raw)
    const res = await addFileApi(formData)
    form.post_picture = res.data
    console.log(form)

    ElNotification({
      title: '成功',
      message: '封面上传成功',
      type: 'success'
    })
  }
}

// 提交表单
const submitForm = async () => {
  submitting.value = true
  await formRef.value.validate(
    async (valid) => {
      if (valid) {
        try {
          await handleUpload()
          const res = await editPostApi({
            ...form,
            id: postId.value, // 确保传递帖子ID
          })
          if (res.code === 0) {
            ElNotification({
              title: '提交成功',
              message: '帖子已成功编辑',
              type: 'success'
            })
          }
          submitting.value = false
          // 编辑成功后跳转到帖子详情页
          window.open(router.resolve({
            path: '/post',
            query: {
              id: postId.value
            }
          }).href, '_self')
        } catch (error) {
          console.error('编辑帖子失败:', error)
          ElNotification({
            title: '提交失败',
            message: '编辑帖子失败，请重试',
            type: 'error'
          })
        }
        return false
      } else {
        return true
      }
    }
  )
  submitting.value = false
}

// 保存为草稿
const submitFormDraft = async () => {
  submitting.value = true
  await formRef.value.validate(
    async (valid) => {
      if (valid) {
        try {
          await handleUpload()
          const res = await editPostApi({
            ...form,
            id: postId.value, // 确保传递帖子ID
          })
          if (res.code === 0) {
            ElNotification({
              title: '保存成功',
              message: '帖子已保存为草稿',
              type: 'success'
            })
          }
          submitting.value = false
        } catch (error) {
          console.error('编辑帖子失败:', error)
          ElNotification({
            title: '提交失败',
            message: '编辑帖子失败，请重试',
            type: 'error'
          })
        }
        return false
      } else {
        return true
      }
    }
  )
}

// 发布帖子
const submitFormPublish = async () => {
  submitting.value = true
  await formRef.value.validate(
    async (valid) => {
      if (valid) {
        try {
          await handleUpload()
          const res = await addPostApi({
            ...form,
            id: postId.value, // 确保传递帖子ID
          })
          if (res.code === 0) {
            ElNotification({
              title: '发布成功',
              message: '帖子已发布',
              type: 'success'
            })

            // 编辑成功后跳转到帖子详情页
            window.open(router.resolve({
              path: '/post',
              query: {
                id: postId.value
              }
            }).href, '_self')
          }
        } catch (error) {
          console.error('发布帖子失败:', error)
        }
      }
    }
  )
  submitting.value = false
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="post-container">
    <!-- 头部 -->
    <div class="post-header">
      <h1 class="post-title">编辑帖子</h1>
      <div class="post-tips">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <span>修改内容后请及时保存～</span>
      </div>
    </div>

    <!-- 主表单区 -->
    <el-form-item prop="title" label="标题" class="form-section">
      <el-input v-model="form.title" placeholder="请输入标题（5-50字）" maxlength="50" show-word-limit clearable size="large" />
    </el-form-item>

    <el-form-item prop="content" class="form-section">
      <MdEditor :constEdit="form.content" @modelValue="uploadContent" class="rich-editor"
        placeholder="请输入正文内容（至少20字）" />
    </el-form-item>

    <!-- 分类和标签 -->
    <el-row :gutter="24" class="form-section">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="post_classes" label="分类">
          <el-select v-model="form.post_classes" placeholder="请选择分类" clearable class="full-width">
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple filterable allow-create :max="5" placeholder="添加标签（最多5个）"
            class="full-width">
            <el-option v-for="tag in suggestedTags" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 封面图上传 -->
    <el-form-item label="封面图" class="form-section">
      <el-upload action="#" :auto-upload="false" :show-file-list="false" accept="image/jpeg,image/png"
        :on-change="beforeAvatarUpload" :http-request="handleUpload">
        <div class="cover-upload">
          <img v-if="form.post_picture" :src="form.post_picture" class="cover-preview">
          <div v-else class="upload-placeholder">
            <el-icon :size="32">
              <Camera />
            </el-icon>
            <div class="upload-text">点击上传封面</div>
            <div class="upload-tips">建议尺寸：800x450，支持JPG/PNG格式</div>
          </div>
        </div>
      </el-upload>
    </el-form-item>

    <!-- 提交栏 -->
    <div class="submit-bar">
      <el-button v-if="formStatus === 0" type="primary" size="large" :loading="submitting" @click="submitForm">
        立即保存
      </el-button>
      <div v-else>
        <el-button type="primary" size="large" :loading="submitting" @click="submitFormPublish">
          发布帖子
        </el-button>
        <el-button size="large" :loading="submitting" @click="submitFormDraft">
          保存草稿
        </el-button>
      </div>
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
