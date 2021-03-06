<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.art_id" class="article-detail markdown-body">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>

          <!-- 在组件上面使用v-model，  默认的行为是 属性value的绑定，和事件input的绑定，我们这里也可以模拟 普通的input输入框上面的v-model指令 -->
          <!--
            :id_followed="article.is_followed"
            @FOLLOW_EVENT="article.is_followed = $event"

            model属性
           -->
          <!-- <FollowUser :userId="article.aut_id" v-model="article.is_followed" /> -->
          <FollowUser :userId="article.aut_id" v-model="article.is_followed" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="article.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <CommentList
          :articleId="article.art_id"
          :commentsList="commentsListParent"
          @REPLY_EVENT="onReplyHandler"
          @COMMENT_TOTAL_EVENT="commentsTotalCount = $event"
        />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleDetail">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="article.art_id">
      <van-button class="comment-btn" type="default" round size="small" @click="isShowPop = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="commentsTotalCount" color="#777" />
      <CollectArticle v-model="article.is_collected" :userId="article.art_id" />
      <LikeArticle v-model="article.attitude" :articleId="article.art_id" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 写评论的弹出层 -->
    <van-popup v-model="isShowPop" position="bottom">
      <CommentPost :target="article.art_id" @COMMENT_POST="commentPublish" />
    </van-popup>

    <!-- 回复评论的弹出层组件 -->
    <van-popup v-model="isShowCommentPop" position="bottom" :style="{ height: '100%' }">
      <CommentReply
        v-if="isShowCommentPop"
        :commentsList="commentsListParent"
        :comment="currReplyComment"
        @CLOSE_REPLY_EVENT="isShowCommentPop = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article';
import { ImagePreview } from 'vant';
import FollowUser from '@/components/follow-user';
import CollectArticle from '@/components/collect-article';
import LikeArticle from '@/components/like-article';
import CommentList from './components/comment-list';
import CommentPost from './components/comment-post';
import CommentReply from './components/comment-reply';

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide: function() {
    return {
      article_id: this.article_id
    };
  },
  props: {
    article_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: true,
      errorStatus: 0,
      commentsTotalCount: 0,
      isShowPop: false,
      commentsListParent: [],
      isShowCommentPop: false,
      currReplyComment: null
    };
  },
  created() {
    this.loadArticleDetail();
  },
  methods: {
    async loadArticleDetail() {
      this.loading = true;
      try {
        const { data } = await getArticleById(this.article_id);
        this.article = data;

        // this.$nextTick(function() {
        //   console.log(111, this.$refs['article-content']);
        // });
        // this.$nextTick.then(function() {
        //   console.log(111, this.$refs['article-content']);
        // });

        // 请求成功以后获取dom节点
        setTimeout(() => {
          // console.log(this.$refs['article-content']);
          this.previewImage();
        }, 0);
      } catch (err) {
        if (err.response && err.response.status == 404) {
          this.errorStatus = 404;
        }
      }
      this.loading = false;
    },
    previewImage() {
      const articleContentDom = this.$refs['article-content'];
      const imgsDom = articleContentDom.querySelectorAll('img');

      let images = [];
      console.log(imgsDom);

      imgsDom.forEach((img, index) => {
        images.push(img.src);
        img.addEventListener('click', function() {
          ImagePreview({
            images,
            startPosition: index
          });
        });
      });
    },
    // 发表评论组件
    commentPublish(e) {
      this.isShowPop = false;
      // 将子组件返回的数据添加到数组里面
      this.commentsListParent.unshift(e);
    },
    // 子组件 点击回复评论 按钮
    onReplyHandler(e) {
      console.log(e);
      this.isShowCommentPop = true;
      this.currReplyComment = e;
    }
  }
};
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
