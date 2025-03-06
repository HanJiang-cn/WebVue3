<template>
     <div class="header">
          <div class="box">
             <span>Dynamic</span>
          </div>
             <div class="personal">
            <el-badge is-dot class="item">
                <el-icon size="20">
                    <Bell />
                </el-icon>
            </el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <el-dropdown :hide-on-click="false" >
                <span class="el-dropdown-link">
                    欢迎你，
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
             </div>
        </div>
</template>
<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    background-color: white;
    height: 60px;
    align-items: center;
    .box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 200px;
    background-color: #409EFF;
   span {
    width: 100px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    line-height: 60px;
   }
}
    .personal {
        float: right;
        height: 60px;
        display: flex;
        align-items: center;

        .el-dropdown-link {
            margin-left: 20px;
        }

        .item {
            margin-top: 10px;
            margin-right: 20px;
        }
    }
}

</style>