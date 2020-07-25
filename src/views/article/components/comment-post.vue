<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button class="post-btn" @click="commentPublish" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addCommentAjax } from '@/api/comment';

export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async commentPublish() {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        });
        const { data } = await addCommentAjax({
          target: this.target,
          content: this.message,
          art_id: null
        });

        this.message = '';
        console.log('看看后端返回的大数字问题：', data);
        this.$toast.success('发表评论成功');
        this.$emit('COMMENT_POST', data.new_obj);
      } catch (err) {
        this.$toast('发表评论失败');
      }
    }
  }
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
