<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="欢迎来到Vue前端">
      <!-- 未登录状态 -->
      <div slot="right" class="shortcut" v-if="!isLogged">
        <router-link to="/login">
          <mt-button>登录</mt-button>
        </router-link>
        <router-link to="/register">
          <mt-button>注册</mt-button>
        </router-link>
      </div>
      <!-- 已登录状态 -->
      <div slot="right" class="shortcut" v-else>
        <mt-button @click="logout">注销</mt-button>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item
        v-for="(item, i) in categoryList"
        :key="i"
        :id="`${item.id}`"
      >{{item.category_name}}</mt-tab-item>
      <!-- <mt-tab-item id="1">UI</mt-tab-item> -->
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <mt-tab-container
      v-model="active"
      v-infinite-scroll="loadMord"
      infinite-scroll-distance="10"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-immediate-check="true"
    >
      <mt-tab-container-item v-for="(item1, i1) in categoryList" :key="i1" :id="`${item1.id}`">
        <!-- 单一文章信息区域开始 -->
        <div class="infoItem" v-for="(item2, i2) in articleList" :key="i2">
          <!-- 文章标题开始 -->
          <div class="infoItemHead">
            <router-link :to="`/article/${item2.id}`">{{item2.subject}}</router-link>
          </div>
          <!-- 文章标题结束 -->
          <!-- 文章内容区域开始 -->
          <div class="infoItemContent">
            <div class="infoItemImg">
              <router-link :to="`/article/${item2.id}`">
                <img v-lazy="`${item2.image}`" />
              </router-link>
            </div>
            <div class="infoItemDesc">{{item2.description}}</div>
          </div>
          <!-- 文章内容区域结束 -->
        </div>
        <!-- 单一文章区域结束 -->
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 面板区域结束 -->
    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="activeTabbar" fixed>
      <mt-tab-item id="index">
        <img src="@/assets/home_enable.png" slot="icon" v-if="activeTabbar == 'index'" />
        <img src="@/assets/home_disable.png" slot="icon" v-else />
        首页
      </mt-tab-item>
      <mt-tab-item id="me">
        <img src="@/assets/me_enable.png" slot="icon" v-if="activeTabbar == 'me'" />
        <img src="@/assets/me_disable.png" slot="icon" v-else />
        我的
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 默认设置顶部选项卡与面板
      active: '1',
      // 默认设置底部选项卡
      activeTabbar: 'index',
      // 文章分类数据
      categoryList: [],
      // 默认分类下的文章列表
      articleList: [],
      // 默认当前页为第一页
      pagenum: 1,
      // 默认开启无限滚动
      busy: false,
      pageCount: 0
    }
  },
  created() {
    // 获取文章分类选项
    this.axios.get(`category`).then(res => {
      this.categoryList = res.data.results
    })
    // 获取默认分类下的文章列表
    this.getArticle()
  },
  methods: {
    // 获取指定分类下的文章数据
    getArticle() {
      // 发送请求前开启加载组件(busy)
      this.busy = true
      this.$indicator.open({
        text: '加载中',
        spinnerText: 'snake'
      })
      // 正在发送请求
      this.axios.get(`list/${this.active}/${this.pagenum}`).then(res => {
        this.pageCount = res.data.pageCount
        res.data.results.forEach(item => {
          this.articleList.push(item)
        })
        // 接收服务器响应，关闭加载组件(free)
        this.busy = false
        this.$indicator.close()
      })
    },
    // 无线滚动事件
    loadMord() {
      this.pagenum++
      if (this.pagenum <= this.pageCount) {
        this.getArticle()
      }
    },
    // 引入共享仓库的登出方法
    ...mapMutations(['logoutUserInfo']),
    // 点击注销登出用户
    logout() {
      this.logoutUserInfo()
      this.$toast({ message: '退出成功' })
    }
  },
  watch: {
    active() {
      this.articleList = []
      this.pagenum = 1
      this.getArticle()
    },
    activeTabbar() {
      if (this.activeTabbar === 'index') {
        this.$router.push('/')
      } else {
        this.$router.push('/me')
      }
    }
  },
  computed: {
    ...mapState(['isLogged'])
  }
}
</script>

<style scoped>
.shortcut a {
  color: #fff;
  margin-left: 10px;
  text-decoration: none;
}
.infoItemHead {
  font-size: 16px;
  color: #1a1a1a;
  line-height: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
.infoItemHead a {
  color: #1a1a1a;
  text-decoration: none;
}
.infoItemContent {
  display: flex;
  align-items: center;
}
.infoItemImg a {
  display: block;
  width: 112px;
  height: 78px;
  border-radius: 5px;
  margin-right: 15px;
  overflow: hidden;
}
.infoItemImg img {
  width: 100%;
  /* border-radius: 5px;
  margin-right: 15px; */
}
.infoItemDesc {
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #444;
  height: 66px;
  overflow: hidden;
}
.mint-tab-container {
  margin-bottom: 53px;
}
.infoItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #b8bbbf;
}
</style>