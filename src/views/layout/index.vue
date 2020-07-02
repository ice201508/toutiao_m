<template>
  <div>
    <!-- 通用路由出口 -->
    <router-view></router-view>
    <!-- 底部的导航栏 -->
    <van-tabbar route class="my-tabbar" safe-area-inset-bottom>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont iconshipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.my-tabbar {
  i.iconfont {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>
