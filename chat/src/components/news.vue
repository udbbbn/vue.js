<template>
  <div class="news-Box">
      <div v-for="(item, index) in sortAllList" :key="index">
          <div :class="item[0] === 'send' ? 'send' : 'rece'">{{item[1].news}}</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

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
    min-height 30px
    padding 5px 0
    .send
      display inline-block
      float right
      padding 8px
      border-radius 5px
      background-color #88ec75
      position relative
      margin-right 10px
      &:after
        width 0
        height 0
        border 10px solid transparent
        border-left 10px solid #88ec75
        position absolute
        right -15px
        content ' '
    .rece
      display inline-block
      float left
      padding 8px
      border-radius 5px
      background-color white
      position relative
      margin-left 10px
      &:before
        width 0
        height 0
        border 10px solid transparent
        border-right 10px solid white
        position absolute
        left -15px
        content ' '
</style>
