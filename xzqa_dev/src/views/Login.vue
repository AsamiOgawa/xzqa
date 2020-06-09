<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="欢迎来到Vue前端">
      <!-- 返回首页 -->
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- 跳转注册 -->
      <router-link to="/register" slot="right" class="register-link">注册</router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 表单控件区域开始 -->
    <div>
      <mt-field type="text" placeholder="请输入用户名" label="用户名" v-model="name" :state="nameState"></mt-field>
      <mt-field type="password" placeholder="请输入密码" label="密码" v-model="pwd" :state="pwdState"></mt-field>
      <button class="login-btn" @click="login">快速登录</button>
    </div>
    <!-- 表单控件区域结束 -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      // 初始化登录表单
      name: '',
      nameState: '',
      pwd: '',
      pwdState: ''
    }
  },
  methods: {
    // 引入共享仓库的登录方法
    ...mapMutations(['loggedUserInfo']),
    // 用户登录
    login() {
      // 判断用户名是否为空
      if (!this.name) {
        this.nameState = 'error'
        this.$toast({ message: '请输入用户名' })
        return
      }
      // 判断登录密码是否为空
      if (!this.pwd) {
        this.pwdState = 'error'
        this.$toast({ message: '请输入密码' })
        return
      }
      // 发送登录信息
      var data = {
        username: this.name,
        password: this.md5(this.pwd)
      }
      this.axios
        .post(`login`, this.qs.stringify(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(res => {
          if (res.data.code === 201) {
            this.$toast({ message: '用户名或密码错误' })
          } else {
            this.loggedUserInfo(res.data.results[0])
            // 判断用户跳转登录页面前想看到的页面，如个人设置页面
            if (this.$route.query.path) {
              this.$router.push(this.$route.query.path)
            } else {
              this.$router.push('/')
            }
            this.$toast({ message: '登录成功' })
          }
        })
    }
  }
}
</script>

<style scoped>
.register-link {
  text-decoration: none;
}
.login-btn {
  font-size: 14px;
  width: 100%;
  line-height: 40px;
  background: #26a2ff;
  color: #fff;
  margin: 12px auto;
  border: none;
  outline: none;
  border-radius: 0;
}
</style>