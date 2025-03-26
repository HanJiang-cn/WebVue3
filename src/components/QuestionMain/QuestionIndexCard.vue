<script setup lang="ts">

</script>

<template>
  <div class="card" style="width: 100%; height: 100px;">
    <div class="project">
      <h3>Manager</h3>
      <button>开始解答</button>
      <div class="condtion">
        <span>通过率： 0%</span>
        <span> 分数： 20</span>
        <span> 难度： 低</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  display: flex;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-right: 20px;
  padding: 20px;
  box-shadow:
    0px 2px 6px #0000000a,
    0px 4px 8px #00000005,
    0px 6px 12px #00000005;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow:
      0px 4px 16px #0000000a,
      0px 8px 32px #0000000a,
      0px 12px 48px #0000000a
  }

  .project {
    width: 100%;

    button {
      float: right;
      background-color: #29bdb9;
      border-radius: 2px;
      font-size: 14px;
      line-height: 28px;
      padding: 7px 15px;
      margin-top: 20px;
      text-align: center;
      color: #fff;
      text-decoration: none;
      cursor: pointer;
      border: #29bdb9;
    }

    .condtion {
      padding: 10px 0;

      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
