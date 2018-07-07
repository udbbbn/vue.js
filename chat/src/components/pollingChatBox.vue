<template>
  <div class="chatBox">
    <chatList :userName="userName" :userList="userList" v-on:updateShowIndex="updateShowIndex" :newTip="newTip"></chatList>
    <chatRoom :allList="allList" :userList="userList" :showIndex="showIndex" :userFlag="userFlag"></chatRoom>
    <login v-if="loginShow" v-on:loginshow="loginshow"></login>
  </div>
</template>

<script>
import chatRoom from './pollingChatRoom'
import chatList from './chatList/chatList'
import login from './login'

export default {
  name: 'pollingChatBox',
  data() {
    return {
      oneNews: '',
      allList: [],
      loginShow: true,
      userName: '',
      userList: [],
      socket: '',
      showIndex: 0,
      userFlag: '',
      newTip: 0
    }
  },
  components: {
    chatRoom,
    chatList,
    login
  },
  methods: {
    formatTime: (timeStamp) => {
      let date = new Date(timeStamp)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes() + ':'
      let s = date.getSeconds()
      let result = Y + M + D + h + m + s
      return result
    },
    init: function() {
      let ctx = this
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8033/polling',
        data: {
          acount: this.$cookies.get('acount')
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data === '暂无消息') {
            this.init()
            return
          }
          this.$set(this.allList, this.allList.length, ['rece', res.data, +new Date()])
          this.newTip = res.data.sender
          this.init()
        })
        .catch(function(error) {
          console.log(error)
          ctx.init()
        })
    },
    loginshow: function() {
      this.loginShow = false
    },
    isLogin: function() {
      // 检测是否登录
      if (this.$cookies.get('acount') && this.$cookies.get('state') === 'login') {
        console.log('已经登录了！')
        this.login()
        this.loginShow = false
        this.userName = this.$cookies.get('acount')
      }
    },
    updateShowIndex: function(val, num) {
      this.showIndex = num
      this.userFlag = val
    },
    initUserList: function(data) {
      let name = this.userName
      this.userList = Object.assign([])
      for (let i of data) {
        if (i.name !== name) {
          this.$set(this.userList, this.userList.length, [{
            avatar: i.avatar,
            name: i.name,
            sign: i.sign
          }])
        }
      }
    },
    login: function() {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8033/login',
        data: {
          acount: this.$cookies.get('acount')
        }
      })
        .then((res) => {
          this.initUserList(res.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    leave: function() {
      console.log('leave')
    },
    beforeunloadHandler: function(e) {
      this.$ajax({
        method: 'post',
        url: 'http://localhost:8033/leave',
        data: {
          acount: this.$cookies.get('acount')
        }
      })
        .then((res) => {
          this.initUserList(res.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  mounted: function() {
    this.isLogin()
    this.init()
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  destroyed: function() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .chatBox
    width 940px
    height 800px
    background-color #f5f5f7
    font-size 0
    position relative
</style>
