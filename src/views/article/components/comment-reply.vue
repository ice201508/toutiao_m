<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count == 0 ? '暂无评论' : `${comment.reply_count}条评论`">
      <van-icon slot="left" name="cross" @click="$emit('CLOSE_REPLY_EVENT')"></van-icon>
    </van-nav-bar>
    <!-- 头部展示默认组件 -->
    <CommentItem :comment="comment" />
  </div>
</template>

<script>
import CommentItem from './comment-item';

export default {
  name: 'CommentReply',
  components: {
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
