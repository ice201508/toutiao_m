<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <input type="file" hidden ref="file" @change="onChange" />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="updateNamePopShow = true" />
    <van-cell
      title="性别"
      is-link
      :value="user.gender == 0 ? '男' : '女'"
      @click="updateGenderPopShow = true"
    />
    <van-cell title="生日" is-link :value="user.birthday" @click="updateBirthdayPopShow = true" />

    <!-- 下面就是各个模块的修改功能 -->
    <van-popup v-model="updateNamePopShow" position="bottom" :style="{ height: '100%' }">
      <UpdateName v-if="updateNamePopShow" @close="updateNamePopShow = false" v-model="user.name" />
    </van-popup>

    <!-- 性别的popup -->
    <van-popup v-model="updateGenderPopShow" position="bottom">
      <UpdateGender
        v-if="updateGenderPopShow"
        @close="updateGenderPopShow = false"
        v-model="user.gender"
      />
    </van-popup>

    <!-- 时间的popup -->
    <van-popup v-model="updateBirthdayPopShow" position="bottom">
      <UpdateBirthday
        v-if="updateBirthdayPopShow"
        @close="updateBirthdayPopShow = false"
        v-model="user.birthday"
      />
    </van-popup>

    <!-- 头像的popup -->
    <van-popup v-model="updatePhotoPopShow" position="bottom" style="height: 100%">
      <UpdatePhoto v-if="updatePhotoPopShow" @close="updatePhotoPopShow = false" :img="img" />
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '@/api/user';
import UpdateName from './components/update-name';
import UpdateGender from './components/update-gender';
import UpdateBirthday from './components/update-birthday';
import UpdatePhoto from './components/update-photo.vue';

export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},
      updateNamePopShow: false,
      updateGenderPopShow: false,
      updateBirthdayPopShow: false,
      updatePhotoPopShow: false,
      img: null
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
    },
    onChange() {
      const data = this.$refs.file.files[0];
      this.img = window.URL.createObjectURL(data);
      this.updatePhotoPopShow = true;
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
