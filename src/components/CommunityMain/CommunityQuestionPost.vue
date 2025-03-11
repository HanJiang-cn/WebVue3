<!-- eslint-disable vue/block-lang -->
<script setup>

</script>

<template>
  <div class="card">
    <div class="left">
      <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    </div>
    <div class="right">
      <div class="top">
        <div class="top-time-name">
          <p>算法题解社区</p>
          <p>2023-04-09 10:30</p>
        </div>
        <p>分割回文串 III - 动态规划解法</p>
        <el-text truncated line-clamp="3">
          方法一：动态规划 - 定义 f[i][j] 表示前 i 个字符分割成 j 个回文串的最小修改次数。
          状态转移时枚举第 j 个回文串的起始位置 i0，转移方程为：
          f[i][j] = min(f[i0][j-1] + cost(S, i0+1, i))，
          其中 cost 函数计算子串变为回文的最小修改次数。通过预处理回文判断可以优化时间复杂度。
        </el-text>
      </div>
      <div class="bottom">
        <el-row>
          <el-text>
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                d="M512 160c320 0 512 192 512 352 0 160-192 352-512 352-320 0-512-192-512-352 0-160 192-352 512-352z m0 64c-247.36 0-448 142.656-448 288 0 145.312 200.64 288 448 288 247.36 0 448-142.688 448-288 0-145.344-200.64-288-448-288z m0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448z m0 64a160 160 0 1 0 0 320 160 160 0 0 0 0-320z">
              </path>
            </svg>
            852 浏览
          </el-text>
          <el-text>
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                d="M469.333 768h85.334v-85.333h-85.334V768z m-170.666-384v85.333h597.333V384H298.667z m0 213.333v85.334h597.333v-85.334H298.667zM128 256v597.333h768V256H128z m85.333 85.333h597.334v426.667H213.333V341.333z">
              </path>
            </svg>
            45 讨论
          </el-text>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.card {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 15px;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.left {
  width: 40px;
  display: flex;
  justify-content: center;
}

.right {
  flex: 1;
}

.top-time-name {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.top-time-name p:first-child {
  font-weight: 600;
  color: #1a1a1a;
}

.top-time-name p:last-child {
  font-size: 0.9em;
  color: #666;
}

.top>p {
  font-size: 1.2em;
  font-weight: 500;
  color: #2c3e50;
  margin: 12px 0;
}

.el-text {
  color: #4a5568;
  line-height: 1.6;
  font-size: 0.95em;
  /* 多行省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom {
  margin-top: 15px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.el-row {
  display: flex;
  gap: 25px;
}

.el-text {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #718096;
}

.el-text svg {
  width: 16px;
  height: 16px;
  fill: #a0aec0;
}
</style>
