<template>
  <div class="vscode-editor">
    <!-- 添加语言选择器 -->
    <div class="top">
      <el-select v-model="selectedMode" @change="handleModeChange" class="mode-select">
        <el-option v-for="(name, mode) in languageOptions" :value="mode" :key="name">{{ name }}</el-option>
      </el-select>
      <div>
        <el-button type="primary" @click="handleSumbit">提交</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSever" style="margin-right: 10px;">保存</el-button>
      </div>
    </div>
    <Codemirror v-model:value="code" :options="cmOptions" ref="cmRef" class="edit" height="90%" width="100%">
    </Codemirror>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import "codemirror/mode/javascript/javascript.js"
import "codemirror/mode/python/python.js"
import "codemirror/mode/xml/xml.js"

import "codemirror/mode/css/css.js"
import "codemirror/theme/base16-light.css"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { EditorConfiguration } from "codemirror"
import { ElMessageBox, ElNotification } from "element-plus"

const code = ref(
  `// 使用 ref 和 reactive
      import { ref, reactive } from 'vue'

      // 基本类型用 ref
      const count = ref(0)
      const increment = () => count.value++

      // 对象用 reactive
      const user = reactive({
        name: 'Alice',
        age: 25,
        updateName(newName) {
          this.name = newName
        }
      })`
);
const cmRef = ref<CmComponentRef>()

// 添加语言切换相关代码
const selectedMode = ref("javascript")
const languageOptions = reactive({
  javascript: "JavaScript",
  python: "Python",
  html: "HTML",
  css: "CSS"
})

const handleModeChange = () => {
  // cmRef.value.cminstance 是 CodeMirror 实例
  if (cmRef.value?.cminstance) {
    // cmRef.value.cminstance.setOption 是 CodeMirror 实例的方法
    // 可以通过这个方法来设置 CodeMirror 的配置
    // 这里我们设置 mode 为 selectedMode.value
    cmRef.value.cminstance.setOption("mode", selectedMode.value)
    // 根据语言切换示例代码
    if (selectedMode.value === 'python') {
      code.value = 'def hello():\n    print("Hello World!")'
    } else if (selectedMode.value === 'html') {
      code.value = '<div class="container">\n  <h1>Hello</h1>\n</div>'
    } else {
      code.value = `// 使用 ref 和 reactive
      import { ref, reactive } from 'vue'

      // 基本类型用 ref
      const count = ref(0)
      const increment = () => count.value++

      // 对象用 reactive
      const user = reactive({
        name: 'Alice',
        age: 25,
        updateName(newName) {
          this.name = newName
        }
      })`
    }
  }
}

const cmOptions: EditorConfiguration = reactive({
  mode: selectedMode.value,
  theme: "base16-light",
  readOnly: false,
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
});

const handleSumbit = () => {
  console.log(code.value)
  ElMessageBox.confirm(
    '你真的要提交代码吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElNotification({
        title: '成功',
        message: '已经成功提交',
        type: 'success',
      })
    })
    .catch(() => {
      ElNotification({
        title: '取消',
        message: '已取消提交',
        type: 'error',
      })
    })
}
const handleReset = () => {
  ElMessageBox.confirm(
    '你真的要重置代码吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElNotification({
        title: '成功',
        message: '已经成功重置',
        type: 'success',
      })
      // 重置代码
      if (cmRef.value?.cminstance) {
        // cmRef.value.cminstance.setOption 是 CodeMirror 实例的方法
        // 可以通过这个方法来设置 CodeMirror 的配置
        cmRef.value.cminstance.setOption("mode", selectedMode.value)
        // 根据语言切换示例代码
        if (selectedMode.value === 'python') {
          code.value = 'def hello():\n    print("Hello World!")'
        } else if (selectedMode.value === 'html') {
          code.value = '<div class="container">\n  <h1>Hello</h1>\n</div>'
        } else {
          code.value = `// 使用 ref 和 reactive
      import { ref, reactive } from 'vue'

      // 基本类型用 ref
      const count = ref(0)
      const increment = () => count.value++

      // 对象用 reactive
      const user = reactive({
        name: 'Alice',
        age: 25,
        updateName(newName) {
          this.name = newName
        }
      })`
        }
      }
    })
    .catch(() => {
      ElNotification({
        title: '取消',
        message: '已取消重置',
        type: 'error',
      })
    })
}
const handleSever = () => {
  ElNotification({
    title: '成功',
    message: '已保存代码',
    type: 'success',
  })
}
</script>

<style lang="less" scoped>
.vscode-editor {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .mode-select {
    width: 150px;
  }

  :deep(.CodeMirror) {
    font-size: 16px;
  }
}
</style>
