<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <van-nav-bar left-arrow @click-right="onClickRight" class="home-nav-bar" fixed>
      <div slot="left" class="navbar-left">
        <img :src="require('@/assets/logo.png')" alt="" />
      </div>
      <!-- <div slot="right" class="navbar-right">
        <van-search placeholder="请输入搜索关键词" />
      </div> -->
      <div slot="right" class="navbar-right">
        <van-button class="van-search" icon="search" to="/search" round size="small" type="info"
          >搜索</van-button
        >
      </div>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs
      class="home-tabs"
      v-model="active"
      color="#3296fa"
      line-width="18"
      animated
      swipeable
      @click="onClick"
    >
      <van-tab :title="item.name" :name="item.id" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <!-- 写成组件的形式，这样每点击一下tabbar都可以将对已的文章列表数据保存起来 -->
        <article-list :channelid="item.id"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="ht-icon" @click="popupClick">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="show"
      round
      @closed="popClose"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '95%' }"
      bind:close="onClose"
    >
      <channel-edit
        :channels="channels"
        :showEditWithPop="show"
        :activeIndex="active"
        @TOGGLE_CHANNEL="getIdFromChild"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user';
import articleList from './components/article-list.vue';
import ChannelEdit from './components/channel-edit.vue';

export default {
  name: 'home',
  data() {
    return {
      channels: [],
      show: false,
      active: 0
    };
  },
  components: {
    articleList,
    ChannelEdit
  },
  created() {
    this.getChannels();
  },
  methods: {
    onClick() {
      console.log(this.active);
    },
    async getChannels() {
      try {
        const res = await getUserChannels();
        this.channels = res.data.channels;
      } catch (err) {
        this.$toast.fail('获取用户频道信息失败');
      }
    },
    getIdFromChild(id) {
      this.active = id;
      this.show = false;
    },
    onClickRight() {},
    popupClick() {
      this.show = true;
    },
    popClose() {},
    onClose() {
      this.show = false;
      console.log(123);
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 180px;
  padding-bottom: 100px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    z-index: 1;
    overflow-y: auto;
  }
}
.home-nav-bar {
  color: #fff;
  background-color: #3296fa;

  .navbar-left {
    height: 72px;
    // 背景图片不生效
    // background: url('~@/assets/logo.png') no-repeat;
    img {
      height: 100%;
    }
  }
  .navbar-right {
    .van-search {
      width: 400px;
      .van-button__content {
        font-size: 26px;
      }
      .van-icon {
        color: #fff;
      }
    }
  }
}
.home-tabs {
  /deep/ .van-tabs__nav .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 88px;
  }
  .ht-icon {
    width: 66px;
    height: 88px;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    i {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 58px;
      background: url('~@/assets/gradient-gray-line.png') no-repeat;
      background-size: contain;
    }
  }
}
</style>
