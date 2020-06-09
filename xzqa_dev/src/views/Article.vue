<template>
  <div class="article">
    <!-- 顶部导航开始 -->
    <mt-header title="欢迎来到Vue前端">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 文章区域开始 -->
    <div>
      <!-- 文章标题信息 -->
      <div class="header">
        <div class="headerInfo">{{articleInfo.subject}}</div>
        <div class="headerDate">{{moment.unix(articleInfo.created_at).format('Y年MM月DD日 HH:mm')}}</div>
      </div>
      <!-- 作者基本信息 -->
      <div class="author">
        <div class="authorAvator">
          <img :src="articleInfo.avator" />
        </div>
        <div class="authorInfo">
          <div>{{articleInfo.nickname}}</div>
          <div class="authorArtNum">
            共
            <mt-badge size="small">{{articleInfo.article_number}}</mt-badge>&nbsp;篇
          </div>
        </div>
      </div>
      <!-- 文章正文 -->
      <div class="articleTxt">{{articleInfo.content}}</div>
    </div>
    <!-- 文章区域结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章id
      id: '',
      // 文章相关信息(包括作者信息)
      articleInfo: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getAuthorInfo()
  },
  methods: {
    getAuthorInfo() {
      this.axios.get(`article/${this.id}`).then(res => {
        this.articleInfo = res.data.results[0]
      })
    }
  }
}
</script>

<style scoped>
.article {
  background: #f6f6f6;
  height: 100vh;
}
.header {
  margin-bottom: 7px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.headerInfo {
  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;
}
.headerDate {
  margin-top: 5px;
  font-size: 14px;
  color: #646464;
}
.author {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-bottom: 7px;
  padding: 10px 0;
  background: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.authorAvator {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  margin-left: 15px;
}
.authorAvator img {
  width: 100%;
}
.authorInfo {
  margin-left: 13px;
}
.authorArtNum {
  margin-top: 3px;
}
.articleTxt {
  margin-top: 5px;
  padding: 10px;
  background-color: #fff;
  line-height: 1.7;
}
.articleTxt p {
  margin: 0;
  padding: 5px 0;
}
</style>