<template>
    <div class="chatRoom">
      <div v-for="(item) in List" :key="item[0].name" v-show="item[0].name === userFlag">
        <div class="newsBox">
            <news :allList="allList" :userFlag="userFlag"></news>
        </div>
        <div class="sendBox">
            <div class="sendInput" contenteditable="true" ref="inputBox" @keyup.enter="send" @keyup="GetChinese">
            </div>
            <div class="inputBox" @click="send">发 送</div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import news from './news'
export default {
  data() {
    return {
      acount: this.$cookies.get('acount')
    }
  },
  props: ['allList', 'socket', 'userList', 'showIndex', 'userFlag'],
  components: {
    news
  },
  methods: {
    send: function() {
      let news = this.$refs.inputBox[this.showIndex].innerText.trim()
      if (news === '') {
        return
      }
      this.oneNews = this.$refs.inputBox[this.showIndex].innerText.trim()
      let sendSetting = {
        sender: this.acount,
        receiver: this.userFlag,
        news: this.oneNews
      }
      this.$set(this.allList, this.allList.length, ['send', sendSetting, +new Date()])
      this.socket.emit('message', JSON.stringify(sendSetting))
      this.$refs.inputBox[this.showIndex].innerText = ''
    },
    GetChinese: function() {
      let strValue = this.$refs.inputBox[this.showIndex].innerHTML.trim()
      if (strValue !== null && strValue !== '') {
        let reg = />(([\w\d\u4e00-\u9fa5])+)</g
        if (reg.test(strValue)) {
          this.$refs.inputBox[this.showIndex].innerHTML = RegExp.$1
        }
      }
    }
  },
  computed: {
    List: function() {
      return this.userList.slice()
    }
  }
}
</script>

<style scoped lang="stylus">
    .chatRoom
      width calc(100% - 245px)
      display inline-block
      font-size 14px
      .newsBox
        width 100%
        height 600px
        border 1px solid #cacaca
        box-sizing border-box
        overflow-y auto
      .sendBox
        width 100%
        height 200px
        border 1px solid #cacaca
        border-top 0
        box-sizing border-box
        .sendInput
          width 98%
          height 155px
          outline: none
          padding-top 5px
          margin 0 auto
          overflow-y auto
          &::-webkit-scrollbar
            display none
        .inputBox
          padding 4px 15px
          background-color #ecebeb
          border 1px solid #e4e3e3
          color #716767
          margin-bottom 10px
          margin-right 10px
          float right
          text-align center
          cursor pointer
          &:hover
            background-color #1da721
            color #fff
</style>
