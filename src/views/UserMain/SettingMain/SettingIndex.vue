<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, nextTick } from 'vue'
import { updateLoginUserApi } from '@/api/user'
import { addFileApi } from '@/api/upfile'
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'

// 表单数据
const form = ref({
  userAvatar: null,
  userName: '',
  // realname: '',
  // email: 'user@example.com',
  // phone: '',
  userProfile: '全栈开发者 | 开源爱好者 | 技术创作者',
  // gender: '',
  // birthday: '',
  // region: [],
  // github: '',
  // website: '',
  tags: []
})
const regionOptions = [
  {
    value: 'shandong',
    label: '山东省',
    children: [
      { value: 'jinan', label: '济南市' },
      { value: 'qingdao', label: '青岛市' }
    ]
  }
]
// 初始化表单数据
const userStore = useUserStore()
form.value = {
  userAvatar: userStore.userAvatar,
  userName: userStore.userName,
  userProfile: userStore.userProfile,
  tags: userStore.tags,
}

const inputVisible = ref(false)
const inputValue = ref('')
const InputRef = ref(null)

// 标签相关方法
// 添加标签
const addTag = () => {
  if (inputValue.value) {
    form.value.tags.push(inputValue.value)
    inputValue.value = ''
  }
  inputVisible.value = false
}
// 删除标签
const removeTag = (tag) => {
  form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}
// 显示输入框
const showInput = () => {
  console.log(form.value);

  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

// 处理头像上传逻辑
const fileData = ref(null)
const beforeAvatarUpload = (file) => {
  const isImage = file.raw.type.startsWith('image/')
  if (!isImage) {
    ElNotification({
      title: '错误',
      message: '请上传 JPEG 或 PNG 格式的图片',
      type: 'error'
    })
  }
  fileData.value = file
  // 显示缩略图
  const reader = new FileReader()
  fileData.value = file
  reader.onload = (e) => {
    form.value.userAvatar = e.target.result
  }
  reader.readAsDataURL(file.raw)
}
const handleUpload = async () => {
  if (fileData.value) {
    // 创建 FormData 对象
    const formData = new FormData()
    // 添加文件到表单数据，使用原始文件对象
    formData.append('file', fileData.value.raw)
    const res = await addFileApi(formData)
    form.value.userAvatar = res.data
    console.log(form.value)

    ElNotification({
      title: '成功',
      message: '头像上传成功',
      type: 'success'
    })
  }
}

// 保存个人资料
const saveProfile = async () => {
  await handleUpload()
  await updateLoginUserApi({ ...form.value, tags: form.value.tags.join(',') })
  userStore.getUserInfo()
  ElNotification({
    title: '成功',
    message: '个人资料已更新',
    type: 'success'
  })
  setTimeout(() => {
    // window.location.reload()
  }, 1000)
}
</script>

<template>
  <div class="profile-edit-container">
    <div class="profile-header">
      <h2>编辑个人资料</h2>
      <el-button type="primary" @click="saveProfile">保存更改</el-button>
    </div>

    <el-row :gutter="30">
      <!-- 左侧栏 -->
      <el-col :xs="24" :sm="8" :md="6">
        <div class="avatar-section">
          <el-upload class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
            accept="image/jpeg,image/png" :on-change="beforeAvatarUpload" :http-request="handleUpload">
            <div class="avatar-wrapper">
              <el-avatar :size="120" :src="form.userAvatar" />
              <div class="upload-mask">
                <el-icon :size="30">
                  <CameraFilled />
                </el-icon>
              </div>
            </div>
          </el-upload>
          <div class="stats">
            <el-statistic title="积分" :value="3650" />
            <el-progress :show-text="false" :percentage="75" :stroke-width="8" status="primary" class="progress-bar" />
          </div>
        </div>
      </el-col>

      <!-- 右侧表单 -->
      <el-col :xs="24" :sm="16" :md="18">
        <el-form :model="form" label-width="100px" label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户名" required>
                <el-input v-model="form.userName" placeholder="请输入用户名" clearable />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="个人签名">
                <el-input v-model="form.realname" placeholder="请输入个人签名" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电子邮箱" required>
                <el-input v-model="form.email" placeholder="name@example.com" type="email" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="个人简介">
            <el-input v-model="form.userProfile" type="textarea" :rows="3" maxlength="150" show-word-limit
              placeholder="介绍一下你自己..." />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择">
                  <el-option label="男" value="male" />
                  <el-option label="女" value="female" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="出生日期">
                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所在地区">
                <el-cascader v-model="form.region" :options="regionOptions" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="社交账号">
            <div class="social-links">
              <el-input v-model="form.github" placeholder="GitHub 用户名" class="social-input">
                <template #prefix>
                  <el-icon>
                    <GithubFilled />
                  </el-icon>
                </template>
              </el-input>

              <el-input v-model="form.website" placeholder="个人网站" class="social-input">
                <template #prefix>
                  <el-icon>
                    <Link />
                  </el-icon>
                </template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item label="技术标签">
            <div class="tags">
              <el-tag v-for="tag in form.tags" :key="tag" closable @close="removeTag(tag)">
                {{ tag }}
              </el-tag>
              <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small" @keyup.enter="addTag"
                @blur="addTag" />
              <el-button v-else size="small" @click="showInput">
                + 添加标签
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
@primary-color: #409EFF;
@card-bg: rgba(255, 255, 255, 0.95);

.profile-edit-container {
  padding: 30px;
  min-height: 100vh;

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;

    h2 {
      color: #2c3e50;
      margin: 0;
    }
  }

  .avatar-section {
    text-align: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .avatar-uploader {
      position: relative;
      margin: 0 auto 20px;

      .avatar-wrapper {
        position: relative;
        display: inline-block;

        .upload-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        &:hover .upload-mask {
          opacity: 1;
        }
      }
    }

    .stats {
      .el-statistic {
        margin: 10px 0;
      }
    }
  }

  .el-form-item {
    margin-bottom: 22px;

    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #34495e;
      padding-bottom: 8px;
    }
  }

  .social-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .social-input {
      :deep(.el-input__prefix) {
        display: flex;
        align-items: center;
        padding: 0 8px;
      }
    }
  }

  .tags {
    display: flex;
  }

  .el-tag {
    margin-right: 8px;
    margin-bottom: 8px;
    background: rgba(64, 158, 255, 0.1);
    border-color: rgba(64, 158, 255, 0.2);
    color: @primary-color;

    &:hover {
      background: rgba(64, 158, 255, 0.15);
    }
  }
}
</style>
