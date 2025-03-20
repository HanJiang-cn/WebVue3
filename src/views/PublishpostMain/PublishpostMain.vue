<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { addPostApi } from '@/api/post'
import TinymceEdit from '@/components/TinymceEdit.vue'

// 表单引用
const formRef = ref(null)
const form = reactive({
  title: '',
  content: '',
  category: '',
  tags: [],
  cover: null
})
const categories = ref([
  { value: 'tech', label: '技术分享' },
  { value: 'algorithm', label: '算法题解' },
  { value: 'life', label: '生活感悟' },
  { value: 'qa', label: '问题求助' }
])
const suggestedTags = ref(['LeetCode', '动态规划', '前端开发', 'Vue', 'Node.js'])

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
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
})

function uploadContent(data) {
  form.content = data
}
// 处理封面图上传
const handleCoverChange = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.cover = e.target.result
  }
  reader.readAsDataURL(file.raw)
}

// 提交表单
const submitForm = async () => {
  form.tags.push(form.category)
  formRef.value.validate(async (valid) => {
    if (valid) {
      // console.log('提交数据:', form)
      const res = await addPostApi(form)
      console.log(res)
      if (res.code === 0) {
        ElNotification({
          title: '成功',
          message: '发布成功！',
          type: 'success',
        })
      }
    } else {
      ElNotification({
        title: '失败',
        message: '请检查表单填写',
        type: 'error',
      })
    }
  })
}

// 保存草稿
const saveDraft = () => {
  console.log('保存草稿:', form)
  ElNotification({
    title: '提示',
    message: '草稿已保存',
    type: 'info',
  })
  // 这里可以添加实际的草稿保存逻辑
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="post-container">
    <!-- 头部 -->
    <div class="post-header">
      <h1 class="post-title">发布新内容</h1>
    </div>

    <!-- 主表单区 -->
    <el-form-item prop="title" label="标题" class="form-section">
      <el-input v-model="form.title" placeholder="请输入标题（最多50字）" maxlength="50" show-word-limit clearable>
      </el-input>
    </el-form-item>
    <el-form-item prop="content" class="form-section">
      <TinymceEdit class="form-section" @modelValue="uploadContent" style="width: 100%" />
    </el-form-item>
    <!-- 分类和标签 -->
    <el-row :gutter="24" class="form-section">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="category" label="分类">
          <el-select v-model="form.category" placeholder="请选择分类" clearable>
            <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item label="标签">
          <el-select v-model="form.tags" multiple filterable allow-create placeholder="添加标签（最多5个）" style="width: 100%">
            <el-option v-for="tag in suggestedTags" :key="tag" :label="tag" :value="tag">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 封面图上传 -->
    <div class="form-up">
      <el-form-item label="封面图" class="form-section">
        <el-upload action="#" :auto-upload="false" :show-file-list="false" :on-change="handleCoverChange"
          accept="image/*">
          <div class="cover-upload">
            <img v-if="form.cover" :src="form.cover" class="cover-preview">
            <span v-else>
              <el-icon :size="32" color="#909399">
                <Plus />
              </el-icon>
            </span>
          </div>
        </el-upload>
        <span class="el-upload__tip">建议尺寸：800x450px，支持JPG/PNG格式</span>
      </el-form-item>
    </div>

    <!-- 提交栏 -->
    <div class="submit-bar">
      <el-button type="primary" size="large" @click="submitForm">
        立即发布
      </el-button>
      <el-button size="large" @click="saveDraft">
        保存草稿
      </el-button>
    </div>
  </el-form>
</template>

<style lang="less">
.post-container {
  max-width: 1200px;
  margin: 24px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  .post-header {
    margin-bottom: 32px;
    border-bottom: 1px solid #eee;
    padding-bottom: 16px;
  }

  .post-title {
    font-size: 1.8em;
    color: #2c3e50;
    font-weight: 600;
  }

  .form-section {
    margin-bottom: 32px;
  }

  .form-section-content {
    width: 100%;
  }

  .cover-upload {
    width: 240px;
    height: 135px;
    border: 2px dashed #dcdfe6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s;

    &:hover {
      border-color: #409eff;
    }
  }

  .cover-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .submit-bar {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #eee;
    text-align: right;
  }

  @media (max-width: 768px) {
    .post-container {
      margin: 12px;
      padding: 16px;
    }

    .el-form-item__label {
      text-align: left !important;
    }
  }

  .el-upload__tip {
    margin-left: 10px;
  }
}
</style>
