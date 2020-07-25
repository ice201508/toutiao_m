<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count == 0 ? '暂无评论' : `${comment.reply_count}条评论`">
      <van-icon slot="left" name="cross" @click="$emit('CLOSE_REPLY_EVENT')"></van-icon>
    </van-nav-bar>

    <div class="main-scroll">
      <!-- 头部展示默认组件 -->
      <CommentItem :comment="comment" />
      <!-- 下面就是 评论的回复列表展示， 也是comments-ist组件的复用 -->
      <van-cell title="全部评论"></van-cell>
      <CommentList :articleId="comment.com_id" :type="'c'" />
    </div>

    <!-- 下面就是底部的发表评论按钮 -->
    <div class="post-wrap">
      <van-button class="pinlun-btn" size="small" round @click="isShowCommentCCPop = true"
        >写评论</van-button
      >
    </div>

    <van-popup v-model="isShowCommentCCPop" position="bottom">
      <CommentPost :target="comment.com_id" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item';
import CommentList from './comment-list';
import CommentPost from './comment-post';

export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShowCommentCCPop: false
    };
  }
};
</script>

<style lang="less" scoped>
.main-scroll {
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid rgb(228, 226, 226);
  .pinlun-btn {
    text-align: center;
    width: 60%;
  }
}
</style>
