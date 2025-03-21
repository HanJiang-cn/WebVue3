<!-- eslint-disable vue/block-lang -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  url: String,
  title: String
})

const showQrcode = ref(false)

const shareWeChat = () => {
  // 微信分享逻辑
}

const shareWeibo = () => {
  // const shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(props.url)}&title=${encodeURIComponent(props.title)}`
  // window.open(shareUrl, '_blank', 'width=550,height=400')
}
</script>

<template>
  <div class="share-wrapper">
    <el-popover placement="left" trigger="hover">
      <template #reference>
        <el-button type="primary" circle class="share-button">
          <el-icon>
            <Share />
          </el-icon>
        </el-button>
      </template>

      <div class="share-panel">
        <div class="share-item" @click="shareWeChat">
          <WechatOutlined />
          <span>微信</span>
        </div>
        <div class="share-item" @click="shareWeibo">
          <WeiboOutlined />
          <span>微博</span>
        </div>
        <div class="share-item" @click="showQrcode = true">
          <el-icon>
            <Iphone />
          </el-icon>
          <span>二维码</span>
        </div>
      </div>
    </el-popover>

    <el-dialog v-model="showQrcode" title="分享二维码" width="300px">
      <vue-qrcode :value="props.url" :width="256" />
    </el-dialog>
  </div>
</template>
