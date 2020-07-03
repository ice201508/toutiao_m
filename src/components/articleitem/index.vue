<template>
  <van-cell class="article-item" center>
    <div slot="title">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 封面类型，cover.type 0-无封面，1-1张封面图片，3-3张封面 -->
      <div class="img-three" v-if="article.cover.type === 3">
        <img v-for="perimg in article.cover.images" :key="perimg" :src="perimg" />
      </div>
      <div>
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div class="default-img" slot="default" v-if="article.cover.type === 1">
      <!-- <img :src="article.cover.images[0]" /> -->
      <van-image class="cover-item-img" fit="cover" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleMyItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-cell__label {
  text-align: left;
  span {
    margin-right: 20px;
  }
}
.img-three {
  display: flex;
  height: 163px;
  margin: 15px 0;
  img {
    flex: 1;
    height: 100%;
  }
}
.default-img {
  height: 146px;
  img {
    height: 100%;
  }
}
</style>
