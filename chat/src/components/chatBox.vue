<template>
  <div class="chatBox">
    <chatList :userName="userName" :userList="userList" v-on:updateShowIndex="updateShowIndex" :newTip="newTip"></chatList>
    <chatRoom :allList="allList" :socket="socket" :userList="userList" :showIndex="showIndex" :userFlag="userFlag"></chatRoom>
    <login v-if="loginShow" v-on:loginshow="loginshow"></login>
  </div>
</template>

<script>
import chatRoom from './chatRoom'
import * as io from 'socket.io-client'
import chatList from './chatList/chatList'
import login from './login'

export default {
  name: 'chatBox',
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
      this.socket = io.connect('http://localhost:8033/chat')
      this.socket.on('connect', () => {
        console.log(`socket 连接成功！`)
        this.socket.emit('login', {
          userId: this.$cookies.get('acount')
        })
        this.userName = this.$cookies.get('acount')
      })
      this.socket.on('message', (data) => {
        console.log(`接收到消息: ${data}`)
        this.$set(this.allList, this.allList.length, ['rece', JSON.parse(data), +new Date()])
        this.newTip = JSON.parse(data).sender
      })
      this.socket.on('disconnect', () => {
        // this.socket.emit('message', '离开房间')
      })
      this.socket.on('userLogin', (data) => {
        data = JSON.parse(data)
        console.log(data)
        // this.addDBData(data)
        this.initUserList(data)
      })
      this.socket.on('userLeave', (data) => {
        data = JSON.parse(data)
        this.initUserList(data)
      })
    },
    loginshow: function() {
      this.loginShow = false
      this.init()
    },
    isLogin: function() {
      // 检测是否登录
      if (this.$cookies.get('acount') && this.$cookies.get('state') === 'login') {
        console.log('已经登录了！')

        this.init()

        this.loginShow = false
        this.userName = this.$cookies.get('acount')
      }
    },
    updateShowIndex: function(val, num) {
      this.showIndex = num
      this.userFlag = val
    },
    addDBData: function(data) {
      // 将用户连接情况写入数据库
      // const DBopenRequest = window.indexedDB.open('chat', 1)
      // this.db = DBopenRequest
      // let transaction = this.db.transaction('user', 'readwrite')
      // let objectStore = transaction.objectStore('user')
      // objectStore.add({
      //   'avatar': data.avatar,
      //   'name': data.userId,
      //   'sign': data.sign
      // })
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
    }
  },
  mounted: function() {
    this.isLogin()
    // this.initDBoperat()
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
