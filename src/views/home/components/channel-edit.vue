<template>
  <div class="chancel-edit">
    <!-- 先使用假数据，将html结构和样式代码书写完成 -->
    <van-cell title="我的频道" size="large" :border="false">
      <van-button type="danger" round size="small" plain @click="isShowEdit = !isShowEdit">{{
        isShowEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>
    <!-- 使用宫格插件，格子间距 -->
    <van-grid :gutter="10" :border="false" class="my-grid">
      <van-grid-item
        class="channel-item"
        :class="{ 'is-edit': isShowEdit && value.id !== 0 }"
        v-for="value in channels"
        :key="value.id"
      >
        <van-icon v-show="isShowEdit && value.id !== 0" slot="icon" name="clear" />
        <span slot="text">{{ value.name }}</span>
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
          <van-icon class="icon-plus" name="plus"></van-icon>
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
      allChannel: [],
      isShowEdit: false
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
      // 单向数据流问题， 数组的push不算更改
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
    width: 160px;
    height: 86px;
    font-size: 28px;
    /deep/ .van-grid-item__content--center {
      background-color: #f4f5f6;
      white-space: nowrap;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      // position: relative;
    }
    /deep/ .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon {
        position: absolute;
        top: -8px;
        right: 8px;
        font-size: 30px;
        color: #cacaca;
      }
    }
    /deep/ .van-icon.icon-plus {
      margin-right: 4px;
      top: 6px;
      font-size: 32px;
    }
  }
}
/deep/ .van-cell__title {
  line-height: 60px;
}
/deep/ .channel-item.is-edit .van-grid-item__content {
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.14);
}
</style>
