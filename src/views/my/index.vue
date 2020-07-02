<template>
  <div>
    <!-- 已登陆 -->
    <!-- <div v-if="$store.state.token" class="user-login"> -->
    <div v-if="token" class="user-login">
      <div class="ul-one" v-if="userInfo">
        <div class="ulo-1">
          <img :src="userInfo.photo" :alt="userInfo.name" />
        </div>
        <div class="ulo-2">{{ userInfo.name }}</div>
        <div class="ulo-3">编辑资料</div>
      </div>
      <ul class="ul-two" v-if="userInfo">
        <li>
          <div>{{ userInfo.art_count }}</div>
          <div>头条</div>
        </li>
        <li>
          <div>{{ userInfo.follow_count }}</div>
          <div>关注</div>
        </li>
        <li>
          <div>{{ userInfo.fans_count }}</div>
          <div>粉丝</div>
        </li>
        <li>
          <div>{{ userInfo.like_count }}</div>
          <div>获赞</div>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="user-container" v-else>
      <div class="not-login-btn" @click="$router.push('/login')">
        <div class="user-box">
          <img :src="require('@/assets/mobile.png')" alt="" />
        </div>
        <div class="user-text">登陆&nbsp;/&nbsp;注册</div>
      </div>
    </div>
    <van-grid clickable :column-num="2" class="grid-icon">
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont iconshoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont iconlishi"></i>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link url="video" />
    <van-cell title="小智同学" is-link to="my" />
    <van-button class="logout-btn" block v-if="token" @click="onLogout">退出登录</van-button>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user';
// https://www.cnblogs.com/tugenhua0707/p/9794423.html
// vuex的辅助函数，主要是帮助我们 将一些简写的属性和方法， 映射为this.$store.state/commit xxxx
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'mypage',
  data() {
    return {
      userInfo: null
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    async init() {
      try {
        const res = await getUserProfile();
        this.userInfo = res.data;
      } catch (err) {
        this.$toast.fail('获取用户信息失败');
      }
    },
    ...mapMutations(['setToken']),
    onLogout() {
      this.$dialog
        .confirm({
          message: '确认退出吗？'
        })
        .then(() => {
          // this.$store.commit('setToken', null);
          this.setToken(null);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.user-container {
  height: 360px;
  background: url('~@/assets/banner.png') no-repeat;
  // background: "require('@/assets/banner.png')" no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .not-login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .user-box {
      width: 132px;
      height: 132px;
      border-radius: 50%;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-text {
      margin-top: 15px;
      // letter-spacing: 0.2em;
      font-size: 30px;
      color: #fff;
    }
  }
}
.user-login {
  height: 360px;
  background: url('~@/assets/banner.png') no-repeat;
  .ul-one {
    padding: 70px 40px 20px;
    overflow: hidden;
    font-size: 32px;
    vertical-align: bottom;
    .ulo-1 {
      float: left;
      width: 132px;
      height: 132px;
      border-radius: 50%;
      border: 1px solid #eee;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .ulo-2 {
      float: left;
      margin: 0 24px;
      height: 132px;
      line-height: 132px;
      color: #fff;
    }
    .ulo-3 {
      float: right;
      background-color: #fff;
      padding: 6px 12px;
      border-radius: 50px;
      margin-top: 40px;
      font-size: 26px;
    }
  }
  .ul-two {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      flex: 1 1 auto;
      text-align: center;
      color: #fff;
      & div:nth-child(1) {
        font-size: 32px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      & div:nth-child(2) {
        font-size: 24px;
      }
    }
  }
}
.grid-icon {
  margin-bottom: 10px;
  i {
    font-size: 40px;
  }
  i.iconshoucang {
    color: #eb5253;
  }
  i.iconlishi {
    color: #ff9d1d;
  }
}
.logout-btn {
  margin-top: 10px;
  color: #d86262;
}
</style>
