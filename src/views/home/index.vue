<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar left-arrow @click-right="onClickRight" class="home-nav-bar">
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
    <van-tabs class="home-tabs" v-model="active" animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="ht-icon">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 1
    };
  },
  methods: {
    onClickRight() {
      console.log(123);
    }
  }
};
</script>

<style lang="less" scoped>
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
