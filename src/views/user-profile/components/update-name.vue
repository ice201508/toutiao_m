<template>
  <div class="update-name">
    <!-- 内容布局： 头部导航栏 + 下面的文本输入框 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />

    <div class="name-input">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateProfile } from '@/api/user';

export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    };
  },
  methods: {
    async onConfirm() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        await updateProfile({
          name: this.localName
        });

        this.$emit('input', this.localName);
        this.$emit('close');
        this.$toast.success('更新昵称请求成功');
      } catch (err) {
        this.$toast.fail('更新昵称请求失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.update-name {
  /deep/.van-nav-bar.van-hairline--bottom {
    background-color: #fff;
  }
  /deep/.van-nav-bar .van-nav-bar__title.van-ellipsis {
    color: #000;
  }
  .name-input {
    padding: 15px;
  }
}
</style>
