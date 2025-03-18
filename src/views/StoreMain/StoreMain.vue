<script lang="ts" setup>

</script>
<template>
  <div class="page-container">
    <el-backtop :right="70" :bottom="100" />
    <div class="block text-center">
      <el-carousel height="400px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="background"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="anchor">
      <div class="anchor-menu">
        <div class="anchor-img">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn0+fn09/preYaZpK2Un6mMmKJygIzP1dqRnKeXoapufIikr7jIz9a7wsnDytB2g4/W3eHGzNPr7/GJlKCFkZzu8fSzu8OwuMB6h5Ottb7k6O1/jJh1go9wforb4OWosbrn6+/g5OnM0tidprDe4ui+xc2lmZDZAAAAD3RSTlMAGAb08uPZx7+WlYJHLi0oJugQAAACSklEQVRo3uzQWwpCMRRD0fScvlvN/GcrilQu/jZwP7omsEnwY7PX7NzAc+3T8C+0yK1iC7iy4dzOh11mFEqUgOWRKJKea0eiTPpusUKhYngblBqfs5xSHgA0ijXAIsWiYVJuolOuo1KuIlMuwynnIPVO5ESWE7lh5MUuHeQmDANRGD7CvJDYcRJCnbQqhjYp0PvfrR7HpmJnDURiwb/ySJa/hcc2o4EgMzY2F1E9xPUqD7FsyBWbhUwAKr0RpCsAUxYyeMORKOeVIQsxQE3CasBkIQAKKVIAeCEv5EkQldrRHA8zcU5dI7r8X5MgSJW0RWzglzqkPokapLQMGXVozwgfRoPKMWL00pmRYxz2MuSNYlsY4n6OmBjpKcZISbEHIXSGXh8psHk0MrWh+YqcDMMdqnbJMXKIgxUhqdYjGH09qo+b7fplJCVc4aEO7TwSO6iAmHpJhe2Kw+X+P/n2nUoYu/rHv3+hWx2hv3btXgdBGAAC8OLeS5G/YBpJpQ10wMT3fzclMSxSU6FeMPYG1m+BkPYuQ834TsrvIx36CZmjHsiccyREAbkf2ev/JCEJ+VHEAXItIgEnQg9B4zpjDD4EWQCuzVakdQBsEKINNsToIEQos8FQIgwR2mbDcSkVUD2fSxkyq4UHCU8NXITo3r3jCUnIp0hTyikG6KXsASOnlE1M5ApP8ojIzYecIiK6qJaIqtDiNXu66EzIHyCE4uxAqQApZSallqUUzJSqnFH6U+YLjCEGZVLCGMcwZj6MwRJjekUckVHmcHfWmFSLfdqL3QAAAABJRU5ErkJggg==">
        </div>
        <a href="#">入门课<span>免费</span>
          <el-icon>
            <ArrowRight />
          </el-icon>
          <div class="desc">176+课程</div>
        </a>
      </div>
      <div class="anchor-menu">
        <div class="anchor-img">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAn1BMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn0+fn09/preYaUn6mZpK2MmKJygIxufInx9Pemr7mwuMDu8fTO1NmIk57k6e3h5eqCj5p/jJd8iJR4hZF1g49zgI7r7/Le4ufT2N7Jz9a7wsqyusKrtL2irLTa3+TW3OHo7PC4wMeRnKfQ1tvDytG+xc2dprDbfQP/AAAAD3RSTlMAGAb08uPZx7+WlYJHLi0oJugQAAACnUlEQVRo3u2afZOaMBCHOfF8b/fHaVAUFBXR+nae1+//2UqAElu0QyFJezc8fzjCODxkFxZi1hA0Br1OyyQJmK1Ob9Aw8jx1mySVZvfpN0Wjb5J0zH7jl2G0SQntm8F8eSZFPH/NxiEc8i3pWBptUkg7yUuflNKPg2WSUkwesC4pphtlpEmKaTaMASlnYPRIOT2jQ8rpGC1STsswSTmmQRqoJbUk4xNJgvGMoQRsNg6KSsIlSrMMi0mCyFHBEhSSjAGMLlYJLiMA40KSGbB2qRTuGpgVkjDAopJYACskAfBCJXkBUEv+hcQ7q5ccwKZqJOHU/jkOJNf4eetKluzEzklyWztzsFCqJGQAS4eyAPBGNOWFypUocVcAhhSzAbCKfOc132dLk9hD8HomonWgiC0i9tIke0RsKWHOo5WVa0wlSabIKriIVoQ949/dqhKRkLlNt9FK8ERaykvE+Y48SpmLEIm0VJGIYF0pF60sLcypLjkiYkf5aHEsfrPIyMmBn+3pXrToVZxARYnDb3E/yKK1zqJ1YuK3FSV05Mey8tEKfAALR46Edoh4zUWLJ4QdpdWul/RwXhotkZB3kiERaZknx/1OCS4TG1IkdExK/fCmhoUiIZIkdGXYxylZ2qI0LzaSH79nj1+z/uhN1JuNrehFwv5c710fRaJl6jCLn1Gl8EZFJ0H7eB47LEE8Z94Xkjg+KuA7hSR08is4TlRMQs5kuBrdg1ew9PMeq+HEoQeS4oyBb0STP13jtaSW/K1kZ8X4wMKyFsAy2d7JlGzxgKlEyTsecJUocS4Md2AXh/L8T3901pJa8oEkJimnqWUJUMtippZlWS0LzFqWynUs+mtpX9DRiKGlpURHc4yONh8dDUs6Wq80NpFpaYf7AWIkUjpvj2HYAAAAAElFTkSuQmCC">
        </div>
        <a href="#">项目库<span>实战</span>
          <el-icon>
            <ArrowRight />
          </el-icon>
          <div class="desc">6大行业</div>
        </a>
      </div>
      <div class="anchor-menu">
        <div class="anchor-img">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAD09P/////19/r09/r09/v09/rz9/r09/r19/r19vrz9/n0+Pv0+fn09/preYaUn6mMmKKZpK1ygIxufIh7h5Oyu8KwuMDt8PPk6O2RnKd3hJDW3ODO1Nm+xc1/i5fw8/elr7ihq7SKlaCHkp1wforq7vGZo63g5OnJ0Nbm6+/a3+TByc+6wcmrs7ynsLri5uuutr+DkJpTwb3/AAAADnRSTlMAGAb08uPZx7+WlYJHLbIzr4kAAAKJSURBVGje7dpbc6IwGMZxKrYe+zygiSKgoBzq2bbf/8NtpLXb3W1nWCTZbYf/RS68+U3IjKPktX7WGva7dzZqyL7r9oct689uem3UWrt38xvRGtioPXvQ+mUbHWip824z97fQ1O392z60GUp53UurA411Xs5lAK0NiodlQ2v2+YH1oLmeOpE2NNduWUNob2j1ob2+1YX2utYdtHdn2dCebcFADdIgb30jJD+lghUS6Skvi4QBKxeE5ZBcGVcoeSnkRHLsOxXyxyRPpZBUGTNUaqaUtBQiSAcVc0hRCiE5qoqMSDbId0LCw06t20eEizV2nh5kygkwp4sVF7EMcn0InjlXyIQraEQ2aYHIrQ7kwY8Y+QvHdd2AkVqnGpCA544BL400ILsw5SqcrcMoS+hytd5ePq8RQS7oA+uUe3UmIy49FEnWiRxILjcZj1CI51Ku60fiiAw4jRaYHf054pWP+pEJfT7JfQw8c1OowEwV8LzWgzxmyZST3VQIQYqiEHxrWwsy50YhOEhJSimFWnZwVYLnNa8FgQuFFJoPbLNxDA1nkr8gccRk7zlcQgeCy04eBAUDTyvibXyqkg1eSmTtyPxZkNlpn5LRo66v+q0YOwvv/NRSHzoQxABmuOR93R8SDfJPkey6vw5ZKSQhx+tqxnpMJqWQI8kscSuUZCSPpRBP8oqkVwpBKK8wQpRD4D25wfijBCle148K3Cfv+tceS3ICTMkHfFaDNMjfIgenSJKR40SkdIoOdSIbftK8RmTBT9rXiHi+4AcJP8a7/sMXnQ3SIF8IsaG9tpErQCOXmUauZY1cMBu5Kjdx6W9kfMHEIIaRkRITwzEmxnxMDCyZGL0yOERmZBzuBzhqL6w7jCw5AAAAAElFTkSuQmCC">
        </div>
        <a href="#">学习路径
          <el-icon>
            <ArrowRight />
          </el-icon>
          <div class="desc">176+课程</div>
        </a>
      </div>
      <div class="anchor-menu">
        <div class="anchor-img">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAeFBMVEUAAAD19/r09P/////19/r09/r09/v09/rz9/r09/rz9/n0+Pv0+fn09/preYbHzdTN09i6wch+i5aKlKDEy9KBjpmpsrzu8vWwuMChq7TY3eJ4hZFxf4vu8fXj6OzJz9ekrraSnaeNmKO+xsyWoap6iJPJ0NaJlJ/rDeZrAAAADXRSTlMAlhgG9PLj2ce/gkctAN5a7wAAAYZJREFUaN7t2ttygjAQgOHEBDm5ESyHAp4P7fu/YUenbazIADG7U5381858E4Sb7DKdiHnoS7CQ9EMeC9Zuwj2wmscnN4SIJFhPRuLPMQJAKbg6zGwKSE1nv+fQhn3l+ywiAMQCcUEiQC26PCwJqMnzA+OAHGdMeICcJ1gM6MWMA3qchYBeyHxAz2cS0JMMCHKINaQscjWsZWWKlJroLzNECjWid0Mkp0DUue0m6e30IFLBgPIHkQMFcqRA1C7tr/n5XWKAjK+gQJYUiDJCmsXgGmNkDoObO8QhDnkRpMzS+x3W9pCd6mq5toWsVHepLQRO3UhiDamPb/fbp0/2djlkFFLvF9d9fmAgTfsT1KF9jDXCSaobY4/yx9fZdcnzvl0OcYhDHOKQ10Wy4UhmjFTDkUojdq8HdZutMkJyNboc78pWV6BdPuvyFdY1uiaK8r8OBBzSRiSg55GMAEmGmSRjWZIBM8monGLoT7K+QLGIQbJSQrEcQ7HmQ7GwRLF6RbhERrIO9wUz4PxFyEs/7wAAAABJRU5ErkJggg==">
        </div>
        <a href="#">在线实训班<span>体系</span>
          <el-icon>
            <ArrowRight />
          </el-icon>
          <div class="desc">算法实体教材</div>
        </a>
      </div>
    </div>
    <div class="moudle">
      <div class="title">直播公开课
        <span class="other">更多<el-icon>
            <ArrowRight />
          </el-icon></span>
      </div>
      <div class="lecture">
        <div class="lecture-card" v-for="item in 4" :key="item">
          <img
            src="https://static.shiyanlou.com/prepare_match/1741743864097-%E5%A4%87%E8%B5%9B%E4%B8%93%E5%8C%BA%E5%8D%A1%E7%89%87pc.png"
            height="152" alt="">
          <div class="topic">03月13日 19:00 30天解锁赛场骗分技巧</div>
          <div class="lecture-time">
            <span>时间：3月13日 19:00</span>
            <span class="btn">查看回放</span>
          </div>
        </div>
      </div>
    </div>
    <div class="base">
      <div class="introduce">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/learn.png" alt="" style="width: 205px;">
      </div>
      <div class="mod">
        <img src="//static.nowcoder.com/fe/file/images/web/course/get.png" alt="" style="width: 131px;">
      </div>
      <ul class="live">
        <li class="radio">
          <div class="hd" style="background-image: url(//static.nowcoder.com//images-nk/res/course/head/8.png);">
            <h4>Java方向</h4>
          </div>
          <div class="item" v-for="item in 3" :key="item">
            <img
              src="https://uploadfiles.nowcoder.com/images/20200205/9398821_1580898882521_062F798501999A3D1CACBFB6DD65BFBB"
              alt="" style="width: 100%;display: block;">
            <div class="mask">
              <p>精华教程</p>
              <p>共4章</p>
              <p>
                <el-icon>
                  <User />
                </el-icon>
                3137549人学习
              </p>
            </div>
          </div>
        </li>
        <li class="radio">
          <div class="hd" style="background-image: url(https://static.nowcoder.com//images-nk/res/course/head/1.png);">
            <h4>C语言方向</h4>
          </div>
          <div class="item" v-for="item in 3" :key="item">
            <img
              src="https://uploadfiles.nowcoder.com/images/20200330/826546_1585563045511_5409C304FB9CF4DA37FCE1D446239ABE"
              alt="" style="width: 100%;display: block;">
            <div class="mask">
              <p>精华教程</p>
              <p>共4章</p>
              <p><el-icon>
                  <User />
                </el-icon>3137549人学习</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/alg.png" alt="" style="width: 131px;">
      </div>
      <div>
        <div class="course" v-for="item in 5" :key="item">
          <a href="#">
            <div class="pic">
              <img
                src="https://uploadfiles.nowcoder.com/images/20200917/59_1600326953543_106DF34AADDE51FDD3355A11AB52718C"
                alt="" style="width: 100%;">
            </div>
            <div class="detail">
              <div style="height: 30px;">
                <span class="price">￥399</span>
                <h3>算法基础提升班</h3>
              </div>
              <div class="count"><el-icon style="font-size: 14px; vertical-align: middle;">
                  <Management />
                </el-icon>
                <span style="font-size: 14px; vertical-align: middle;">共有4章</span>
                <el-button size="small" round style="float: right;margin-top: 2px;">学习</el-button>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/c.png" alt="" style="width: 131px;">
      </div>
      <div>
        <div class="course" v-for="item in 5" :key="item">
          <a href="#">
            <div class="pic">
              <img
                src="https://uploadfiles.nowcoder.com/images/20200917/59_1600326953543_106DF34AADDE51FDD3355A11AB52718C"
                alt="" style="width: 100%;">
            </div>
            <div class="detail">
              <div style="height: 30px;">
                <span class="price">￥399</span>
                <h3>算法基础提升班</h3>
              </div>
              <div class="count"><el-icon style="font-size: 14px; vertical-align: middle;">
                  <Management />
                </el-icon>
                <span style="font-size: 14px; vertical-align: middle;">共有4章</span>
                <el-button size="small" round style="float: right;margin-top: 2px;">学习</el-button>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="introduce">
        <img src="https://uploadfiles.nowcoder.com/files/20240604/853843163_1717485029232/mianshi.png" alt=""
          style="width: 205px;">
      </div>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/pra.png" alt="" style="width: 131px;">
      </div>
      <div class="course" v-for="item in 5" :key="item">
        <a href="#">
          <div class="pic">
            <img
              src="https://uploadfiles.nowcoder.com/images/20200917/59_1600326953543_106DF34AADDE51FDD3355A11AB52718C"
              alt="" style="width: 100%;">
          </div>
          <div class="detail">
            <div style="height: 30px;">
              <span class="price">￥399</span>
              <h3>算法基础提升班</h3>
            </div>
            <div class="count"><el-icon style="font-size: 14px; vertical-align: middle;">
                <Management />
              </el-icon>
              <span style="font-size: 14px; vertical-align: middle;">共有4章</span>
              <el-button size="small" round style="float: right;margin-top: 2px;">学习</el-button>
            </div>
          </div>
        </a>
      </div>
      <div class="course" v-for="item in 5" :key="item">
        <a href="#">
          <div class="pic">
            <img
              src="https://uploadfiles.nowcoder.com/images/20200917/59_1600326953543_106DF34AADDE51FDD3355A11AB52718C"
              alt="" style="width: 100%;">
          </div>
          <div class="detail">
            <div style="height: 30px;">
              <span class="price">￥399</span>
              <h3>算法基础提升班</h3>
            </div>
            <div class="count"><el-icon style="font-size: 14px; vertical-align: middle;">
                <Management />
              </el-icon>
              <span style="font-size: 14px; vertical-align: middle;">共有4章</span>
              <el-button size="small" round style="float: right;margin-top: 2px;">学习</el-button>
            </div>
          </div>
        </a>
      </div>
      <div class="introduce">
        <img src="https://uploadfiles.nowcoder.com/files/20240604/853843163_1717485097878/qiuzhi.png" alt=""
          style="width: 205px;">
      </div>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/pra.png" alt="" style="width: 131px;">
      </div>
      <ul class="list">
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
        <a href="#">
          <li>
            <div><img
                src="https://uploadfiles.nowcoder.com/images/20210517/59_1621253393261/36BB4B9CFBA8BABF1640B3B467623A11"
                alt=""></div>
          </li>
        </a>
      </ul>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/pra.png" alt="" style="width: 131px;">
      </div>
      <ul class="column">
        <li v-for="item in 4" :key="item">
          <div class="pic">
            <img
              src="https://uploadfiles.nowcoder.com/images/20240325/897353_1711363587217/C3F7A87073B4D4DEA19DE386241912E5"
              alt="">
          </div>
          <div class="detail">
            <h2>
              2024校招宝典——软件版本
            </h2>
            <div class="hd">
              牛客独家出品，理工科求职必备攻略，适合岗位： 软件开发、数据库分析、软件测试、前端后端开发
            </div>
            <span class="free-tag">试读</span>
            <span class="tag">软件篇</span>
          </div>
        </li>
      </ul>
      <div class="introduce">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/more-free-lessons.png" alt=""
          style="width: 205px;">
      </div>
      <div class="mod">
        <img src="https://static.nowcoder.com/fe/file/images/web/course/fre.png" alt="" style="width: 131px;">
      </div>
      <div class="example-pagination-block">
        <div class="example-demonstration">
          <div class="course" v-for="item in 5" :key="item">
            <a href="#">
              <div class="pic">
                <img
                  src="https://uploadfiles.nowcoder.com/images/20200917/59_1600326953543_106DF34AADDE51FDD3355A11AB52718C"
                  alt="" style="width: 100%;">
              </div>
              <div class="detail">
                <div style="height: 30px;">
                  <span class="price">￥399</span>
                  <h3>算法基础提升班</h3>
                </div>
                <div class="count"><el-icon style="font-size: 14px; vertical-align: middle;">
                    <Management />
                  </el-icon>
                  <span style="font-size: 14px; vertical-align: middle;">共有4章</span>
                  <el-button size="small" round style="float: right;margin-top: 2px;">学习</el-button>
                </div>
              </div>
            </a>
          </div>
        </div>
        <el-pagination background layout="prev, pager, next" :total="50" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page-container {
  background-color: #f4f7fa;
  min-height: 100vh;
  /* 确保背景色覆盖整个页面 */
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(https://dn-simplecloud.shiyanlou.com/assets/1741852849300_346947de8702cb58239f134ca6b34917);
}

.anchor {
  height: 100px;
  width: 1100px;
  /* 固定宽度 */
  position: absolute;
  top: 390px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  color: #212529;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 0 21px 0 24px;

  .anchor-menu {
    width: 240px;
    cursor: pointer;
    display: flex;
    padding: 16px 0;

    a {
      color: #15171a;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #42a5f5;
      }

      .desc {
        color: #6b7986;
        font-size: 14px;
        font-weight: 400;
        margin-top: 9px;
      }

      span {
        display: inline-block;
        background: #00a8eb;
        border-radius: 8px;
        color: #fff;
        font-size: 10px;
        font-weight: 400;
        height: 15px;
        line-height: 15px;
        margin-left: 2px;
        text-align: center;
        width: 30px;
      }

      .el-icon {
        height: 20px;
        margin-left: 4px;
        width: 20px;
      }
    }

    .anchor-img {
      height: 60px;
      margin-right: 20px;
      width: 60px;

      img {
        width: 100%;
      }
    }
  }
}

.moudle {
  width: 1200px;
  margin: 0 auto;

  .title {
    margin-top: 78px;
    color: #000;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;

    .other {
      float: right;
      color: #00a8eb;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .lecture {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);

    .lecture-card {
      background: #fff;
      border-radius: 8px;
      height: 240px;
      overflow: auto;
      padding: 12px 11px;
      transition: all .15s ease-in-out;

      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
      }

      img {
        border-radius: 8px;
        margin-bottom: 12px;
        width: 100%;
      }

      .topic {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .lecture-time {
        align-items: center;
        background: #f4f7fa;
        border-radius: 4px;
        color: #6b7986;
        display: flex;
        font-size: 12px;
        font-weight: 400;
        justify-content: space-between;
        padding: 4px 4px 4px 16px;

        .btn {
          background: #fff;
          border-radius: 4px;
          color: #00a8eb;
          cursor: pointer;
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          height: 32px;
          line-height: 32px;
          text-align: center;
          width: 98px;
        }
      }
    }
  }
}

.base {
  width: 1200px;
  margin: 0 auto;

  .introduce {
    text-align: center;
    margin-top: 30px;
    background-color: #fff;
  }

  .mod {
    margin-bottom: 20px;
    position: relative;
    height: 20px;
    margin-top: 20px;
  }

  .live {
    display: flex;
    justify-content: space-around;
  }

  .radio {
    width: 570px;
    height: 270px;
    overflow: hidden;
    border: 1px solid #eee;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    cursor: pointer;
    background-color: #fff;
    position: relative;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transform: translateY(-5px);

      .mask {
        display: block;
      }
    }

    .hd {
      margin-bottom: 20px;
      position: relative;
      height: 53px;
      width: 572px;

    }

    h4 {
      position: absolute;
      z-index: 2;
      padding: 0 25px;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      line-height: 53px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      max-width: 80%;
    }

    .item {
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0 28px;
      width: 130px;
      height: 177px;

    }

    .mask {
      display: none;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      text-align: center;
      padding: 15px 0 5px;
      margin: 0 auto;
      font-size: 14px;

    }
  }
}

.course {
  display: inline-block;
  width: 227px;
  // float: left;
  cursor: pointer;
  overflow: hidden;
  margin: 0 13px 15px 0;
  height: 225px;
  background-color: #fff;

  a {
    display: block;
    text-decoration: none;
    color: #5e5d5d;
  }

  .pic {
    font-size: 0;
    width: 226px;
    height: 144px;
    overflow: hidden;

    .count {
      font-size: 12px;
      color: #5e5d5d;
    }
  }
}

.detail {
  height: 75px;
  overflow: hidden;
  padding: 5px 10px 10px;
  position: relative;

  .price {
    float: left;
    background: #fff5dd;
    border: 1px solid #e8b339;
    color: #e8b339;
    border-radius: 4px;
    padding-right: 2px;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    float: left;
    color: #2c2c2c;
    height: 18px;
    line-height: 18px;
    margin-left: 15px;
    margin-top: 2px;
    width: 8em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.list {
  text-align: left;
  font-size: 0;
  display: flex;
  border-radius: 10px;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    position: relative;
    display: inline-block;
    vertical-align: top;
    max-width: 180px;
    max-height: 130px;
    overflow: hidden;
    font-size: 12px;
    border-radius: 10px;
    transition: top .1s cubic-bezier(.02, .01, .47, 1), box-shadow .1s cubic-bezier(.02, .01, .47, 1);
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  a {
    border-radius: 10px;

    &:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .16);
    }
  }
}

.column {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    width: 590px;
    height: 180px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    margin: 0 0 15px 0;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .08);
    cursor: pointer;
    border-radius: 10px;
    transition: all 250ms cubic-bezier(.02, .01, .47, 1);

    &:hover {
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .16);
    }

    .pic {
      width: 114px;
      padding: 6px 18px;
      float: left;
      background: #f5f7fa;

      img {
        width: 115px;
        margin: 0 auto;
        display: block;
      }
    }

    .detail {
      float: left;
      width: 420px;
      height: 100%;
      color: #333;
      background-color: #fff;

      h2 {
        display: inline-block;
        vertical-align: middle;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        max-width: 20em;
        font-size: 16px;
      }

      .hd {
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        max-width: 100%;
        margin-bottom: 10px;
      }

      .free-tag {
        color: #25bb9b;
        border: 1px solid #25bb9b;
        border-radius: 4px;
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        font-size: 12px;
        padding: 1px 4px;
        margin-right: 5px;
      }

      .tag {
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        max-width: 85%;
        color: #888;
        margin-left: 10px;
      }
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;

}
</style>
