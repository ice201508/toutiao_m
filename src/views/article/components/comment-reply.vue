<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count == 0 ? '暂无评论' : `${comment.reply_count}条评论`">
      <van-icon slot="left" name="cross" @click="$emit('CLOSE_REPLY_EVENT')"></van-icon>
    </van-nav-bar>
    <!-- 头部展示默认组件 -->
    <CommentItem :comment="comment" />
    <!-- 下面就是 评论的回复列表展示， 也是comments-ist组件的复用 -->
    <van-cell title="全部评论"></van-cell>
    <CommentList :articleId="comment.com_id" :type="'c'" />
  </div>
</template>

<script>
import CommentItem from './comment-item';
import CommentList from './comment-list';

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList
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
