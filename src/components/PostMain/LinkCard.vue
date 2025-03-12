<script setup lang="ts">
interface Props {
  url: string
  title: string
  description: string
  logo: string
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  title: '',
  description: '',
  logo: '',
})
</script>


<template>
  <div class="linkcard">
    <a :href="props.url" target="_blank">
      <el-text class="description" truncated>{{ props.title }}<br><el-text truncated>{{ props.description
      }}</el-text></el-text>
      <div class="logo">
        <img alt="logo" width="70px" height="70px" :src="props.logo" />
      </div>
    </a>
  </div>
</template>

<style lang="less" scoped>
/* 卡片 */
.linkcard {
  width: 30%;
  background-color: rgba(59, 130, 246, 0.08);
  border-radius: 8px;
  padding: 8px 16px 8px 8px;
  transition: 0.5s ease all;
  margin-top: 15px;


  /* 卡片鼠标悬停 */
  &:hover {
    background-color: rgba(59, 130, 246, 0.12);
  }

  /* 链接样式 */
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  /* 描述链接文字 */
  .description {
    flex: 1;
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    color: #1a1a1a;
    margin: 0 0 0 16px;
    transition: color 0.5s;

    /* 描述链接文字2 */
    span {
      font-size: 14px;
    }
  }

  /* logo图片 */
  .logo img {
    width: 80px;
    object-fit: contain;
  }
}
</style>
