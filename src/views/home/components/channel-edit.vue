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
    <!-- 没有获取推荐频道的接口，但是有获取所有频道接口和用户频道接口的  api， 两个相减，就是我们需要的推荐的频道接口 -->
    <van-cell title="频道推荐" size="large" />
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        @click="onAddChannel(value)"
      >
        <div slot="text">
          <van-icon name="plus"></van-icon>
          <span>{{ value.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel';

export default {
  name: 'ChannelEdit',
  props: {
    // 我的频道
    channels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      allChannel: []
    };
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    async getAllChannels() {
      // 之前这样写完了已经，展示没问题，但是在添加的时候，应该是我的频道新增，推荐频道删除对应的栏目， 所以用方法就不是很合适，只会在进入这个组件的时候执行一次，后面就不会执行了，所有应该使用计算属性，只要想对应this上面的值一发生改变，就执行对应的函数
      try {
        const res = await getAllChannels();
        this.allChannel = res.data.channels;
      } catch (err) {
        console.log('‘获取失败');
      }
    },
    onAddChannel(param) {
      this.channels.push(param);
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannel.filter((item) => {
        return (
          this.channels.findIndex((childItem) => {
            return item.id === childItem.id;
          }) === -1
        );
      });
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
    /deep/ .van-icon {
      margin-right: 4px;
      top: 6px;
      font-size: 32px;
    }
  }
}
/deep/ .van-cell__title {
  line-height: 60px;
}
</style>
