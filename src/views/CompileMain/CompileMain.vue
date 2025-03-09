<script lang="ts" setup>
import { ref } from 'vue'
import empty from '@/assets/empty-projects.svg'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const radio1 = ref('全部')
const radio2 = ref('全部')
const radio3 = ref('全部')
const radio4 = ref('全部')
</script>

<template>
  <div>
    <div class="title">
      <h2>试题库</h2>
     <div class="topic">
<span class="all"> <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">公共</el-menu-item>
    <el-menu-item index="2">我创建的</el-menu-item>
  </el-menu></span>
<div id="right"> <div class="right">
  <a href="#"> <el-button id="create" type="primary" round>新增试题</el-button></a>
  <span> <input placeholder="请输入题号或其他关键词进行搜索" type="text">
  </span>
 </div></div>
     </div>

    </div>
 <div class="menu">
  <div class="column">
    <span class="heading">方向</span>
    <div class="select">
      <div>
      <el-radio-group v-model="radio1" size="large">
        <el-radio-button label="全部" value="全部" />
      <el-radio-button label="Java" value="Java" />
      <el-radio-button label="Web" value="Web" />
      <el-radio-button label="C++" value="C++" />
      <el-radio-button label="多选" value="Pathon" />
    </el-radio-group>
  </div>
</div>
  </div>
   <div class="column">
    <span class="heading">知识点</span>
    <div>
    <el-radio-group v-model="radio2" size="large">
      <el-radio-button label="全部" value="全部" />
    </el-radio-group>
  </div>
  </div>
   <div class="column">
    <span class="heading">题型</span>
    <div class="select">
      <div>
      <el-radio-group v-model="radio3" size="large">
      <el-radio-button label="全部" value="全部" />
      <el-radio-button label="编程题" value="编程题" />
      <el-radio-button label="单选" value="单选" />
      <el-radio-button label="多选" value="多选" />
      <el-radio-button label="判断" value="判断" />
      <el-radio-button label="填空" value="填空" />
      <el-radio-button label="简答" value="简答" />
      <el-radio-button label="程序填空" value="程序填空" />
    </el-radio-group>
  </div>
</div>
  </div>
    <div class="column">
    <span class="heading">方向</span>
    <div class="select">
      <div>
      <el-radio-group v-model="radio4" size="large">
      <el-radio-button label="全部" value="全部" />
      <el-radio-button label="简单" value="简单" />
      <el-radio-button label="适中" value="适中" />
      <el-radio-button label="困难" value="困难" />
    </el-radio-group>
  </div>
</div>
  </div>
 </div>
 <div class="content">
  <img :src="empty">
<div class="empty-title">暂无试题</div>
<div class="no-combo-tips">点击左侧 + 按钮，即可添加文件夹管理个人素材。</div>
</div>
  </div>
</template>


<style lang="less" scoped>
.topic{
  font-size: 18px;
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #EBEBEB;
  padding-top:10px ;
  padding-bottom: 2px;
  .all{
    display: inline-block;
    width: 230px;
  }
  #right{
    float: right;
    width: 500px;
  }
 .right{
   display: flex;
    margin-top: 10px;
    height: 50px;
    width: 500px;
    a{
      display: inline-block;
    }
    #create{
      margin-right: 20px;
      margin-bottom: 30px;
      height: 35px;
    }
    span{
      display: inline-block;
      width: 200px;
      height: 35px;
    input{
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 19px;
    height: 35px;
    width: 369px;
    padding-left: 20px;
    background-color: #f6f7f9;
    border: none;
}

    }
 }
}
.column{
display: flex;
height: 46px;
padding-top: 10px;
.heading{
  display: inline-block;
  width: 50px;
  flex-shrink: 0;
  color: #9096a3;
  margin-right: 16px;
  margin-top: 10px;
  text-align-last: justify;
}
.select{
  display: inline-block;
  overflow: hidden;

}
}
.content{
  display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    padding-top: 20px;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    .empty-title{
      font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: rgb(93, 111, 143);
    margin-bottom: 8px;
    }
    .no-combo-tips{
      color: rgb(125, 140, 165);
    font-size: 12px;
    line-height: 14px;
    }

}

</style>
