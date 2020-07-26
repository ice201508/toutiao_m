<template>
  <div class="update-name">
    <!-- 内容布局： 头部导航栏 + 下面的文本输入框 -->
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" />

    <div class="name-input">
      <van-field
        v-model="message"
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
export default {
  name: 'UpdateName',
  data() {
    return {
      message: ''
    };
  }
};
</script>

<style lang="less" scoped>
.update-name {
  .van-nav-bar {
    background-color: #fff;
  }
  /deep/.van-nav-bar .van-nav-bar__title {
    color: #000;
  }
  .name-input {
    padding: 15px;
  }
}
</style>
