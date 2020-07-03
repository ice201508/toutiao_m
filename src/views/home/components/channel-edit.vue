<template>
  <div class="chancel-edit">
    <!-- 先使用假数据，将html结构和样式代码书写完成 -->
    <van-cell title="我的频道" size="large">
      <van-button type="danger" round size="small" plain>编辑</van-button>
    </van-cell>
    <!-- 使用宫格插件，格子间距 -->
    <van-grid :gutter="10" :column-num="4">
      <van-grid-item class="channel-item" v-for="value in channels" :key="value.id">
        <div slot="text">
          <span>{{ value.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" size="large" />
    <van-grid :gutter="10">
      <van-grid-item class="channel-item" v-for="value in 24" :key="value" text="+文字">
        <div slot="text">
          <span>{{ value }}12312321233</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.chancel-edit {
  padding-top: 85px;
  font-size: 32px;
  .channel-item {
    font-size: 28px;
    /deep/ .van-grid-item__content--center {
      width: 160px;
      height: 86px;
      background-color: #f4f5f6;
      white-space: nowrap;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
/deep/ .van-cell__title {
  line-height: 60px;
}
</style>
