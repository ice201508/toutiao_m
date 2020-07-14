<template>
  <div>
    文章详情页面
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article_id: {
      // Invalid prop: type check failed for prop "article_id". Expected String with value "1255464589978501120", got Object
      // type: String,
      type: [Number, String, Object],
      required: true
    }
  },
  created() {
    console.log(this.article_id);
  }
};
</script>

<style lang="less" scoped></style>
