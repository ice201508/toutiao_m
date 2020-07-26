<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell title="单元格" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" />
    <van-cell title="性别" is-link :value="user.gender == 0 ? '男' : '女'" />
    <van-cell title="生日" is-link :value="user.birthday" />
  </div>
</template>

<script>
import { getProfile } from '@/api/user';

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getProfile();
        this.user = data;
      } catch (err) {
        this.$toast('获取用户信息失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/.van-nav-bar {
    background-color: #3296fa;
    .van-nav-bar__left .van-icon,
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
