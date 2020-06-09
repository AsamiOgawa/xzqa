<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="个人设置">
      <router-link to="/me" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 个人设置logo区域开始 -->
    <div class="setting-logo">
      <div class="logo-box">
        <img src="@/assets/img/4.jpg" />
      </div>
    </div>
    <!-- 个人设置logo区域结束 -->
    <!-- 表单控件区域开始 -->
    <div>
      <mt-field type="text" label="用户昵称" placeholder="请输入用户昵称" :state="nameState" v-model="name"></mt-field>
      <mt-field type="password" label="新密码" placeholder="请输入新密码" :state="pwdState" v-model="pwd"></mt-field>
      <mt-field
        type="password"
        label="确认密码"
        placeholder="请再一次输入密码"
        :state="conPwdState"
        v-model="conPwd"
      ></mt-field>
      <button class="confirm-btn" @click="handler">确认修改</button>
    </div>
    <!-- 表单控件区域结束 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      name: '',
      nameState: '',
      pwd: '',
      pwdState: '',
      conPwd: '',
      conPwdState: ''
    }
  },
  created() {
    this.name = this.nickName
  },
  methods: {
    // 将共享仓库的修改用户方法复制到此组件中
    ...mapMutations(['updateUserInfo']),
    // 点击修改按钮修改用户的个人信息
    handler() {
      // 校验用户昵称是否为空
      if (!this.name) {
        return (this.nameState = 'error')
      } else {
        this.nameState = 'success'
      }
      // 新密码的正则表达式
      var pwdReg = /^[a-zA-Z0-9_]{8,20}$/
      if (pwdReg.test(this.pwd)) {
        this.pwdState = 'success'
      } else {
        return (this.pwdState = 'error')
      }
      // 校验确认密码是否与新密码一致
      if (this.pwd !== this.conPwd) {
        return (this.conPwdState = 'error')
      } else {
        this.conPwdState = 'success'
      }
      // 提交表单
      var data = {
        id: this.uid,
        name: this.name,
        password: this.pwd
      }
      this.axios.post(`profile`, this.qs.stringify(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      // 同步仓库的用户个人信息数据
      this.updateUserInfo(name)
    }
  },
  computed: {
    ...mapState(['uid', 'nickName'])
  }
}
</script>

<style scoped>
.setting-logo {
  display: flex;
  justify-content: center;
  padding: 17px 0;
}
.logo-box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.setting-logo img {
  width: 100%;
}
.confirm-btn {
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