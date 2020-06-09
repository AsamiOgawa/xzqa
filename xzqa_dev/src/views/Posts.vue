<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="我的文章">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 复选框区域开始 -->
    <div class="check-region">
      <!-- 控制全选/非全选 -->
      <mt-checklist v-model="toggleValue" :options="toggleOptions" @change="handler"></mt-checklist>
      <!-- 删除文章按钮 -->
      <div class="confirm-del">
        <a href="#" @click="delArticle">删除</a>
      </div>
      <!-- 文章选项 -->
      <mt-checklist v-model="posts" :options="articleOptions"></mt-checklist>
    </div>
    <!-- 复选框区域结束 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 控制全选变量
      toggleValue: [],
      toggleOptions: [
        {
          label: '全选',
          value: '1'
        }
      ],
      // 复选框选项
      posts: [],
      articleOptions: []
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    // 使共享仓库(store)的方法变成自己的组件化
    ...mapMutations(['removeArticles']),
    // 控制全选/非全选
    handler() {
      this.posts = []
      if (this.toggleValue[0] === '1') {
        this.articleOptions.forEach(item => {
          this.posts.push(item.value)
        })
      }
    },
    // 确认删除文章
    delArticle() {
      if (!this.posts.length) {
        this.$messagebox.alert('请选择删除的文章', '系统提示')
      } else {
        this.$messagebox
          .confirm('确认删除文章吗？删除后不可恢复文章', '系统提示')
          .then(action => {
            this.axios.post(`removearticles`, 'id=' + this.posts)
            // this.posts = []
            // this.getArticles()
            var a = this.articleOptions
            var b = this.posts
            this.articleOptions = a.filter(v => {
              // 原理：从数据源articleOptions对象中删除已选中的posts数组里面的选项
              // 通过indexOf的方法，查找当前posts数组中已选中的选项，
              // 没找到则返回 -1
              // 即我们需要找到“没有被选中的”
              // 优点：删除成功后不用再次请求服务器了，节省资源
              return b.indexOf(v.value) === -1
            })
            this.$toast({
              message: '删除成功',
              position: 'middle'
            })
            this.removeArticles(b.length)
            this.posts = []
          })
          .catch(() => {})
      }
    },
    // 获取指定用户的文章列表
    getArticles() {
      this.axios.get(`articlelist?uid=${this.id}`).then(res => {
        this.articleOptions = res.data.results
      })
    }
  },
  computed: {
    ...mapState(['id'])
  },
  watch: {
    posts() {
      console.log(this.posts)
    }
  }
}
</script>

<style scoped>
.check-region {
  position: relative;
}
.confirm-del {
  position: absolute;
  right: 10px;
  top: 6px;
  padding: 3px;
}
.confirm-del a {
  display: block;
  width: 60px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  border-radius: 15px;
  background-color: #002a4b;
  color: #fff;
  text-decoration: none;
}
</style>