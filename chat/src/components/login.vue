<template>
  <div class="loginBox">
      <div class="wrapper">
          <div class="inputWrapper">
            <div>用户名：</div>
            <input type="text" class="acount" v-model="acount">
          </div>
          <div class="inputWrapper">
            <div>密码：</div>
            <input type="password" class="password" v-model="password">
          </div>
          <div class="loginButton" @click="login">登陆</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      acount: '',
      password: ''
    }
  },
  components: {

  },
  methods: {
    login: function() {
      if (this.acount.trim() !== '' && this.password.trim() !== '') {
        this.$cookies.set('acount', this.acount)
        this.$cookies.set('state', 'login')
        this.$emit('loginshow')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.loginBox
  position absolute
  width 300px
  height 200px
  left 50%
  top 50%
  margin-top -100px
  margin-left -150px
  background-color #fff
  border 1px solid #cacaca
  font-size 15px
  .wrapper
    width 90%
    height 160px
    margin auto
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    & input
      outline none
      text-indent 5px
    .inputWrapper
      display flex
      line-height 35px
      margin-bottom 10px
      & > div
        width 60px
      .acount
        width 100%
        height 30px
        color #000
        flex 1
      .password
        width 100%
        height 30px
        color #000
        flex 1
    .loginButton
      width 120px
      height 45px
      line-height 45px
      border 1px solid #e4e3e3
      margin 20px auto
      text-align center
      background-color #ecebeb
      cursor pointer
      &:hover
        background-color #1da721
        color #fff
</style>
