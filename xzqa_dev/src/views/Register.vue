<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="欢迎来到Vue前端">
      <!-- 返回首页 -->
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- 跳转登录 -->
      <router-link to="/login" slot="right" class="login-link">登录</router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 注册表单区域开始 -->
    <div>
      <mt-field
        type="text"
        label="用户名"
        placeholder="用户名的长度必须在5~12位"
        v-model="name"
        :state="nameState"
        @blur.native.capture="checkUsername"
      ></mt-field>
      <mt-field
        type="password"
        label="密码"
        placeholder="密码长度必须在8~20位"
        v-model="pwd"
        :state="pwdState"
        @blur.native.capture="checkPassword"
      ></mt-field>
      <mt-field
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        v-model="conPwd"
        :state="conPwdState"
        @blur.native.capture="checkConPassword"
      ></mt-field>
      <button class="register-btn" @click="register">免费注册</button>
    </div>
    <!-- 注册表单区域结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 初始化注册表单
      name: '',
      nameState: '',
      pwd: '',
      pwdState: '',
      conPwd: '',
      conPwdState: ''
    }
  },
  methods: {
    // 用户名的校验规则
    checkUsername() {
      var nameReg = /^[a-zA-Z0-9]{5,12}$/
      if (!nameReg.test(this.name)) {
        this.nameState = 'error'
        this.$toast({ message: '用户名的长度必须在5~12位' })
        return false
      } else {
        this.nameState = 'success'
        return true
      }
    },
    // 密码的校验规则
    checkPassword() {
      var pwdReg = /^[a-zA-Z0-9_]{8,20}$/
      if (!pwdReg.test(this.pwd)) {
        this.pwdState = 'error'
        this.$toast({ message: '密码长度必须在8~20位' })
        return false
      } else {
        this.pwdState = 'success'
        return true
      }
    },
    // 校验密码是否与确认密码一致
    checkConPassword() {
      if (!this.conPwd || this.pwd !== this.conPwd) {
        this.conPwdState = 'error'
        this.$toast({ message: '新密码与确认密码必须保持一致' })
        return false
      } else {
        this.conPwdState = 'success'
        return true
      }
    },
    // 校验表单通过后提交注册信息给服务器
    register() {
      if (
        this.checkUsername() &&
        this.checkPassword() &&
        this.checkConPassword()
      ) {
        var data = {
          username: this.name,
          password: this.md5(this.pwd)
        }
        this.axios
          .post(`register`, this.qs.stringify(data), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then(res => {
            if (res.data.code === 201) {
              this.$toast({ message: '用户名已被注册' })
            }
            if (res.data.code === 200) {
              this.$messagebox.alert('注册成功', '系统提示')
              this.$router.push('/login')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.login-link {
  text-decoration: none;
}
.register-btn {
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