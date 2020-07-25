<template>
  <div>
    回复评论组件
  </div>
</template>

<script>
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped></style>
