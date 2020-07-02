<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'home',
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
</style>
