<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell title="单元格" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="updateNamePopShow = true" />
    <van-cell title="性别" is-link :value="user.gender == 0 ? '男' : '女'" />
    <van-cell title="生日" is-link :value="user.birthday" />

    <!-- 下面就是各个模块的修改功能 -->
    <van-popup v-model="updateNamePopShow" position="bottom" :style="{ height: '100%' }">
      <UpdateName v-if="updateNamePopShow" @close="updateNamePopShow = false" v-model="user.name" />
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '@/api/user';
import UpdateName from './components/update-name';

export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  data() {
    return {
      user: {},
      updateNamePopShow: false
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
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
