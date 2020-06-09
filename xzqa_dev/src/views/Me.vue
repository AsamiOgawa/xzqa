<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 单元格区域开始 -->
    <div class="setting">
      <mt-cell title="个人设置" isLink to="/setting">
        <img src="@/assets/setting.png" slot="icon" />
      </mt-cell>
      <mt-cell title="我的文章" isLink to="/posts">
        <img src="@/assets/article.png" slot="icon" />
        <mt-badge size="small">{{articleNum}} 篇</mt-badge>
      </mt-cell>
    </div>
    <!-- 单元格区域结束 -->
    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="activeTabbar">
      <mt-tab-item id="index">
        <img src="@/assets/home_enable.png" slot="icon" v-if="activeTabbar === 'index'" />
        <img src="@/assets/home_disable.png" slot="icon" v-else />
        首页
      </mt-tab-item>
      <mt-tab-item id="me">
        <img src="@/assets/me_enable.png" slot="icon" v-if="activeTabbar === 'me'" />
        <img src="@/assets/me_disable.png" slot="icon" v-else />
        我的
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['articleNum'])
  },
  data() {
    return {
      activeTabbar: 'me'
    }
  },
  watch: {
    activeTabbar() {
      if (this.activeTabbar === 'index') {
        this.$router.push('/')
      } else {
        this.$router.push('/me')
      }
    }
  }
}
</script>

<style scoped>
.mint-cell img {
  width: 20px;
  height: 20px;
}
</style>