<template>
  <div class="chatList">
      <div class="header">
          <div class="avatar"></div>
          <div class="content">
            <div class="name">{{name}}</div>
            <div class="sign">{{sign}}</div>
          </div>
      </div>
      <ul class="userList">
        <li v-for="(item, index) in List" :key="item[0].name" @click="updateShowIndex(item[0].name, index)">
          <img class="avatar" :src="item[0].avatar" />
          <div class="content">
            <div class="name">{{item[0].name}}</div>
            <div class="sign">{{item[0].sign}}</div>
            <div class="tip" ref="userList">有新消息</div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      name: '无名用户',
      sign: '这是一个懒惰的人的签名',
      List: [],
      tipDisplay: 'block'
    }
  },
  components: {

  },
  props: ['userName', 'userList', 'newTip'],
  methods: {
    setName: function() {
      this.name = this.$cookies.get('acount')
    },
    updateShowIndex: function(val, num) {
      this.$emit('updateShowIndex', val, num)
      this.$refs.userList[num].style.display = 'none'
    }
  },
  mounted() {
    this.setName()
  },
  watch: {
    'userName': function(val) {
      this.name = this.userName
    },
    'userList': function() {
      this.List = Object.assign([], this.userList)
    },
    'newTip': function(val) {
      let context = this
      this.List.forEach((item, index) => {
        if (item[0].name === context.newTip) {
          context.$refs.userList[index].style.display = context.tipDisplay
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
    .chatList
      width 240px
      height 100%
      display inline-block
      vertical-align top
      background-color #e0dede
      font-size 14px
      border 1px solid #cacaca
      border-right 0
      box-sizing border-box
      .header
        width 90%
        height 100px
        margin 0 auto
        display flex
        align-items center
        border-bottom 1px solid #bfbfbf
        .avatar
          width 50px
          height 50px
          background url('./avatar.jpg') 100%/ 100%
        .content
          width auto
          padding 0 0 0 10px
          flex 1
          .name
            font-size 16px
            margin-bottom 5px
          .sign
            font-size 13px
            color #929292
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
      .userList
        width 100%
        overflow-y auto
        & > li
          width 90%
          padding 0 5%
          height 70px
          display flex
          align-items center
          cursor pointer
          &:hover
            background-color #c3c3c3
          .avatar
            width 50px
            height 50px
            background-size 100% 100%
        .content
          width auto
          padding 0 0 0 10px
          flex 1
          position relative
          .name
            font-size 15px
            margin-bottom 5px
          .sign
            font-size 12px
            color #929292
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
          .tip
            position absolute
            right 5px
            top 10px
            color #7078d4
            display none
</style>
