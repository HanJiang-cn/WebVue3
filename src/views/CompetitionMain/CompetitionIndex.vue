<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(true)
const checked2 = ref(false)
</script>
<template>
  <div>
    <el-backtop :right="70" :bottom="100" />
    <div class="block text-center">
      <el-carousel height="400px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="background">
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main">
      <div class="right">
        <div class="box">
          <div class="wrap">
            <div class="example-pagination-block">
              <div class="example-demonstration">
                <div class="item" v-for="item in 10" :key="item">
                  <div> <a class="link" href="/competition/detail"><img
                        src="https://publicqn.saikr.com/2024/12/31/contest677394887c30d1.918105771735627946742.png"
                        alt="" style="height: 100%;"></a>
                    <div class="detial"><a href="/competition/detail"><span class="hoticon"> TOP&nbsp;1</span>
                        2025年全国大学生英语竞赛</a>
                      <p class="plan"><span>主办方： </span>全国高等师范院校外语教学与研究协作组</p>
                      <p class="plan"><span>竞赛级别：</span>全国性</p>
                      <p class="plan"><span>报名时间：</span>2025年01月02日 ~ 2025年03月17日</p>
                      <p class="plan"><span>比赛时间：</span>2025年04月13日 ~ 2025年04月13日</p>
                    </div>
                  </div>
                  <div class="including">
                    <span>正在报名</span>
                    <div class="include"> 距离报名截止还有 <span class="day">1</span> 天</div>
                  </div>
                </div>

              </div>
              <div class="page"><el-pagination background layout="prev, pager, next" :total="50" /></div>
            </div>
          </div>
        </div>

      </div>
      <div class="left">
        <div class="section">
          <a href="#">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAcCAYAAAAJKR1YAAAAAXNSR0IArs4c6QAAA85JREFUWEetl11oHFUYht83220i6KYWf5Gi1oASK3bO2dCW0HQtVUQMaCUBfxC1ghcKVSuCXi31ooh/FfRCRVFqQbGCN4KaarYgxrieM8GQ9EaKxnqhvVDbYlI3O589yzbuz2zmTPDc7MW87/s9e2bON98QKZZovRtRtBa9vftYKi2ksHpL6a0EIEo9DeB5kFOIojsYhj+n8fto0wLtB7C7HvwTstmtnJw87lPIV5MWqARgW0P4NMjNNOZv34JJOm8g0boXIicAZJtCyVdpzONJhXyv+wMp9SiA12KCq8hkbmS5PCNKjSKbPcLJyd98AVp1XkAyMpLBsWMzELm2Q6EPaO3dks/fhijaC3JopbcxFkiKxS4Wi9G54hIED4F8e5l/vYhMZh0WF68HeRjAu7T2wZXsUjyQUo/Q2jdcoGzcuAZdXUcBXJZQ4Mn69Zdrv+SdNOaTtFBtQNLX141c7jgWFq7m7OxpCYK3QD7sEVwGcPHZ3bmqrp1Dd/d1nJiY9/AuSdqBtL4HIgcRRYNYtepyRNGhNIEtJ/ApGvNSGn87kFLfA9AAXFd+BsCFLYE/AujzLPILcrn1LJUWPfVoApKBgR2oVsfq5n8ArI4JegXAFwDeBLAusZDIDobhl4m6uqAZSOtxiBSWNZNjNOYW2bTpUlQq7qHdnFBsP619IjWQaK0gYjoY3W65Ln0FgKO0tr92AguFHpw8+TmAoY4Fya9pzNaVAL0IkT0djHMAhgGUQc7SmGCpR23ZshZnznwDoFPTnKO1V6YHUsod23wH40e0dlSUesdtDK3d1air7S7wHUQyMf4TtPaSlQD9AWBNrFHkZobhYcnnd4H8geWyg29aotQBAPe1+ckZGrMhPZDW8xDpiTF+Smtvrz0zWvfSmL/iwiUItoF040nzIg/RmJH0QEq5Qcs9tE13AyIbGIazSYHS378aPT2nY8aTB2jMe0n+c9eXjr0o9SGA0RbjOK3d7hsmSrmTeFGD/nfkctewVHKgXus/IK1vgshXLa4XaK3r2IlLtM5CxBVubKaP0drXE80NgubGqNT7AO5tuH6A1t7vEyhBMATyyJKWHMPw8K2NY4xPTjNQoXA+Tp36DCKDdfOvyOX6fD55RKmPAeys+cgQ1ep2Tk396QPRqGl/uQ4OXoD5+YP1RgiI7GMYPrtcsCjlQByQW+OoVO7i9LRrI6lX/IAGEFrvgcjes99h54HsOEaI1jdA5FuQ3RBx32xFGlNJTVI3LDtTy8DAekTRcxCZoLVxA77rTe4d6B58dwA6vQu9+byGfO+0/0H4L8U/Vyw4wrImAAAAAElFTkSuQmCC"
              alt="" style="height: 14px;">
            热门竞赛top50
          </a>
          <div class="short-name">
            竞赛类别
          </div>
          <div class="item-title">工科</div>
          <div class="item-content">
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
          </div>
          <div class="item-title">工科</div>
          <div class="item-content">
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
            <el-checkbox v-model="checked1" label="数学建模" size="large" />
            <el-checkbox v-model="checked2" label="船舶海洋" size="large" />
          </div>
          <div class="item-title">竞赛级别</div>
          <div class="item-content" style="margin-top: 15px;">
            <button>不限</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(https://publicqn.saikr.com/e7deb4a855005b2f2788b4d5c95b9de41737790598003.png);
}

.main {
  width: 85%;
  height: 100%;
  margin: 0 auto;
  margin-top: 40px;

  .left {
    float: left;
    width: 310px;
    margin-left: 18px;

    .section {
      border-radius: 4px;
      border: 1px solid #ecedf3;
      box-sizing: border-box;
      background: #fff;
      padding: 20px;

      a {
        min-width: 108px;
        margin-top: 0;
        background: #ffe6e6;
        color: #ff3232;
        text-decoration: none;
        display: inline-flex;
        height: 28px;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 4px;
        font-size: 14px;
        padding: 0 10px;
      }

      .short-name {
        color: #333;
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
        margin-top: 30px;
      }

      .item-title {
        color: #333;
        font-weight: 600;
        font-size: 14px;
        margin-top: 20px;
      }

      .item-content {
        display: flex;
        flex-direction: row;
        align-items: top;
        justify-content: space-between;
        flex-wrap: wrap;

        .el-checkbox {
          margin-right: 30px;
          width: 104px;
        }
      }
    }
  }

  .right {
    float: left;
    width: 900px;
    height: 100%;

    .box {
      width: 100%;
      height: 100%;
      background: #fff;

      .wrap {
        border-radius: 4px;
        border: 1px solid #ecedf3;
        box-sizing: border-box;
        background: #fff;
        padding: 0 20px 20px;
        max-width: calc(92vw - 334px);
        min-width: 680px;
        min-height: 200px;

        .item {
          display: flex;
          flex-direction: row;
          align-items: top;
          justify-content: space-between;
          position: relative;
          padding: 20px 0;
          border-top: 1px solid #ecedf3;

          .link {
            width: 231px;
            border-radius: 6px;
            overflow: hidden;
            height: 154px;
            margin-right: 16px;
            float: left;
          }

          .detial {
            float: left;
            position: relative;
            max-width: 450px;

            a {
              color: #333;
              height: 52px;
              display: flex;
              font-size: 20px;
              line-height: 26px;
              font-weight: 700;
              overflow: hidden;
              cursor: pointer;
              margin-bottom: 6px;
              text-decoration: none;
              align-items: top;
              justify-content: flex-start;
              flex: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              max-height: 52px;
              white-space: normal;
              word-break: break-word;

              &:hover {
                color: #22bfa7;
              }

              .hoticon {
                font-family: Helvetica-Bold;
                font-weight: 700;
                margin-right: 8px;
                margin-top: 4px;
                border-radius: 2px 4px;
                background: linear-gradient(135deg, #ff6161, #e71313);
                width: 50px;
                height: 18px;
                font-size: 12px;
                display: inline-flex;
                color: #fff8f5;
                align-items: center;
                justify-content: center;
                position: relative;
              }
            }

            .plan {
              font-size: 14px;
              line-height: 23px;
              color: #999;

              span {
                display: inline-block;
                width: 70px;
              }
            }
          }

          .including {
            float: right;

            span {
              color: #03b349;
            }

            .include {
              font-size: 12px;
              color: #999;
              margin-top: 3px;

              .day {
                font-size: 14px;
                color: #22bfa7;
                font-weight: 700;
                padding: 0 3px;
              }
            }
          }
        }
      }

      .page {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #ecedf3;

        .el-pagination {
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
