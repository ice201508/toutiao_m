<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="followLoading"
      loading-text="加载中"
      loading-type="spinner"
      loading-size="16px"
      :disabled="btnDisabled"
      v-if="is_followed"
      @click="handlerFollow"
      >关注</van-button
    >
    <van-button
      class="follow-btn"
      v-else
      loading-text="加载中"
      loading-type="spinner"
      loading-size="16px"
      :loading="followLoading"
      :disabled="btnDisabled"
      round
      size="small"
      @click="handlerFollow"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { addFollowAjax, deleteFollowAjax } from '@/api/user';

export default {
  name: 'FollowUser',
  model: {
    prop: 'is_followed',
    event: 'FOLLOWED_EVENT'
  },
  props: {
    userId: {
      type: [Number, String],
      required: true
    },
    is_followed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      btnDisabled: false,
      followLoading: false
    };
  },
  methods: {
    async handlerFollow() {
      this.followLoading = true;
      try {
        this.btnDisabled = true;
        if (this.is_followed) {
          // 已关注， 取消关注
          await deleteFollowAjax(this.userId);
        } else {
          await addFollowAjax(this.userId);
        }
        this.btnDisabled = false;
        this.$emit('FOLLOWED_EVENT', !this.is_followed);
      } catch (err) {
        this.btnDisabled = false;
        if (err.response && err.response.status == 400) {
          return this.$toast('自己不能关注自己');
        }
        this.$toast('关注用户失败');
      }
      this.followLoading = false;
    }
  }
};
</script>

<style lang="less" scoped></style>
