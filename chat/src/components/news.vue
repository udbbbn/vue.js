<template>
  <div class="news-Box">
      <div v-for="(item, index) in sortAllList" :key="index">
          <img :src="sendUserImg" alt="" :class="item[0] === 'send' ? 'avatar-right' : 'hid'">
          <img :src="receUserImg" alt="" :class="item[0] === 'rece' ? 'avatar-left' : 'hid'">
          <div :class="item[0] === 'send' ? 'send' : 'rece'">{{item[1].news}}</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      sendUserImg: 'http://localhost:8080/static/img/avatar.a18a141.jpg',
      receUserImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528184091&di=7bcb42fa3f4807b048e25f2f1f3dde09&imgtype=jpg&er=1&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201308%2F01%2F20130801113450_nBEQF.jpeg'
    }
  },
  props: ['sendList', 'recList', 'allList', 'userFlag'],
  computed: {
    sortAllList: function() {
      let context = this
      return context.allList.slice().filter((val) => {
        if (val[0] === 'rece') {
          return val[1].sender === context.userFlag
        } else {
          return val[1].receiver === context.userFlag
        }
      }).sort((a, b) => {
        return a[2] - b[2]
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.news-Box
  overflow-x hidden
  & > div
    width auto
    min-height 40px
    padding 5px 10px
    .send
      display inline-block
      float right
      padding 8px
      border-radius 5px
      background-color #88ec75
      position relative
      margin-right 10px
      margin-top 5px
      max-width 90%
      box-sizing border-box
      &:after
        width 0
        height 0
        border 10px solid transparent
        border-left 10px solid #88ec75
        position absolute
        right -15px
        top 8px
        content ' '
    .rece
      display inline-block
      float left
      padding 8px
      border-radius 5px
      background-color white
      position relative
      margin-left 10px
      margin-top 5px
      border 1px solid #eee
      max-width 90%
      box-sizing border-box
      &:before
        width 0
        height 0
        border 10px solid transparent
        border-right 10px solid white
        position absolute
        left -15px
        top 8px
        content ' '
    .avatar-right
      width 40px
      height 40px
      float right
    .avatar-left
      width 40px
      height 40px
      float left
    .hid
      display none
</style>
