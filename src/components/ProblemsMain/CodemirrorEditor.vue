<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref, reactive, computed, defineEmits } from "vue"
import { useRouter } from "vue-router"
import { submitQuestionApi } from "@/api/question"
// import { Editor, EditorConfiguration } from "codemirror"
import { ElMessageBox, ElNotification } from "element-plus"
import Codemirror from "codemirror-editor-vue3"
// 语言包
import "codemirror/mode/clike/clike.js" // java
import "codemirror/mode/python/python.js" // python
import "codemirror/mode/htmlmixed/htmlmixed.js" // html
import "codemirror/mode/javascript/javascript.js" // javascript

import "codemirror/theme/base16-light.css"

// 语法检查
import "codemirror/mode/javascript/javascript.js"
import "codemirror/addon/lint/lint.css"
import "codemirror/addon/lint/lint.js"
import "codemirror/addon/lint/json-lint"

// 代码内容
const code = ref(
  `public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
);
const cmRef = ref()

const emit = defineEmits(["TestResultsData"])
const router = useRouter()
// 添加语言切换相关代码
const selectedMode = ref("text/x-java")
// 通过selectedMode获取选择器的name属性值
const selectedModeName = computed(() => {
  return languageOptions.find((item) => item.mode === selectedMode.value)?.name || "";
})
const languageOptions = [
  {
    name: "JavaScript",
    mode: "javascript",
  },
  {
    name: "Python",
    mode: "text/x-python",
  },
  {
    name: "java",
    mode: "text/x-java",
  },
  {
    name: "HTML",
    mode: "text/html",
  },
]

const handleModeChange = () => {
  // cmRef.value.cminstance 是 CodeMirror 实例
  if (cmRef.value?.cminstance) {
    // cmRef.value.cminstance.setOption 是 CodeMirror 实例的方法
    // 可以通过这个方法来设置 CodeMirror 的配置
    // 这里我们设置 mode 为 selectedMode.value
    cmRef.value.cminstance.setOption("mode", selectedMode.value)
    // 根据语言切换示例代码
    if (selectedMode.value === 'text/x-python') {
      code.value = 'def hello():\n    print("Hello World!")'
    } else if (selectedMode.value === 'text/html') {
      code.value = '<div class="container">\n  <h1>Hello</h1>\n</div>'
    } else if (selectedMode.value === 'text/x-java') {
      code.value = `public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
    } else if (selectedMode.value === 'javascript') {
      code.value = `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`
    }
  }
}

// 配置 CodeMirror 实例
const cmOptions = reactive({
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
    .then(async () => {
      const res = await submitQuestionApi({
        code: code.value,
        language: selectedModeName.value,
        questionId: router.currentRoute.value.query.id
      })
      emit("TestResultsData", res.data)
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
        // 这里我们设置 mode 为 selectedMode.value
        cmRef.value.cminstance.setOption("mode", selectedMode.value)
        // 根据语言切换示例代码
        if (selectedMode.value === 'text/x-python') {
          code.value = 'def hello():\n    print("Hello World!")'
        } else if (selectedMode.value === 'text/html') {
          code.value = '<div class="container">\n  <h1>Hello</h1>\n</div>'
        } else if (selectedMode.value === 'text/x-java') {
          code.value = `public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`
        } else if (selectedMode.value === 'javascript') {
          code.value = `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`
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
</script>

<template>
  <div class="vscode-editor">
    <!-- 添加语言选择器 -->
    <div class="top">
      <el-select v-model="selectedMode" @change="handleModeChange" class="mode-select">
        <el-option v-for="item in languageOptions" :value="item.mode" :label="item.name" :key="item" />
      </el-select>
      <div>
        <el-button type="primary" @click="handleSumbit">提交</el-button>
        <el-button type="primary" @click="handleReset">重置</el-button>
      </div>
    </div>
    <Codemirror v-model:value="code" :options="cmOptions" ref="cmRef" class="edit" height="90%" width="100%">
    </Codemirror>
  </div>
</template>

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
