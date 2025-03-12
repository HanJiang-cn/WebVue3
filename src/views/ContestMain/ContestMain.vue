<template>
  <div class="container">
    <div class="logo"><img src="/src/assets/cup.png" alt=""></div>
    <div class="title">
      <h1>全国 竞赛</h1>
    </div>
    <div class="title_tow">
      <p>快来参加每周排位赛，提升你的界排名</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 1170px;
  height: 389px;
  text-align: center;

  .logo {
    width: 870px;
    height: 150px;
    text-align: center;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 40px;

    img {
      width: 147.05px;
      height: 150px;
    }
  }

  .title {
    width: 870px;
    height: 81px;
    text-align: center;
    margin: 0 auto;

    h1 {
      width: 870px;
      height: 43px;
      color: #b3b3b3;
      font-weight: 100;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 0.5em;
    }
  }

  .title_tow {
    width: 870px;
    height: 20px;
    margin: 0 auto;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    font-weight: 300;
    color: grey;
  }
}
</style>
