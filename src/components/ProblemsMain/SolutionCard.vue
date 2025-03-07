<!-- eslint-disable vue/block-lang -->
<script setup></script>

<template>
  <div class="card">
    <div class="left">
      <el-avatar :size="25" style="margin-left: 3px;" />
    </div>
    <div class="right">
      <div class="top">
        <div class="top-time-name">
          <p>力扣官方题解</p>
          <p>2023-04-09 10:30</p>
        </div>
        <p>分割回文数 Ⅲ</p>
        <el-text truncated line-clamp="3">
          方法一：动态规划 我们用 f[i][j] 表示对于字符串 S 的前 i 个字符，将它分割成 j 个非空且不相交的回文串，<br>最少需要修改的字符数。在进行状态转移时，我们可以枚举第 j 个回文串的起始位置
          i0，<br>那么就有如下的状态转移方程： f[i][j] = min(f[i0][j - 1] + cost(S, i0 + 1, i)) 其中 cost(S, l, r) 表示将 S <br>中第 l 个到第 r
          个字符组成的子串变成回文串，最少需要修改的字符数。
        </el-text>
      </div>
      <div class="bottom">
        <el-row>
          <el-text>
            <EyeOutlined />
            123
          </el-text>
          <el-text>
            <MessageOutlined />
            123
          </el-text>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  // width: 80vh;
  display: flex;
  justify-content: first baseline;
  padding: 10px;

  .left {
    // float: left;
    margin-right: 10px;
  }

  .right {
    width: 75vh;

    .bottom {
      border-bottom: 1px solid #0000001a;
      padding: 10px 0;

      .el-text {
        margin-right: 10px;

      }
    }

    .top {
      .top-time-name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      p {
        font-size: 14px;
        margin-bottom: 5px;

        &:first-child {
          color: #0000008c;
        }
      }
    }


  }
}
</style>
