<template>
	<header class="nav-header">
		<img src="@/assets/img/arrow-left.png" v-touch:tap="back">
		<input type="text" placeholder="搜索..." v-model="titleCopy"/>
	</header>
</template>
<script>

export default {
  name: 'queryheader',
  props: ['title'],
  data() {
    return {
      titleData: ''
    }
  },
  methods: {
    back: function() {
      history.back()
    },
    toggleInput: function() {
    }
  },
  computed: {
    titleCopy: {
      get: function() {
        this.titleData = this.title
        return this.titleData
      },
      set: function(newVal) {
        this.$emit('queryUpdateTitle', newVal)
        this.$emit('queryToggleInput')
      }
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    rem(target, context = 64){
      if target == 0{
        return 0
      }
      return target / context + 0rem
    }
    .nav-header
      width 100%
      height rem(100)
      background-color #468f88
      box-shadow 0 5px 5px #ccc
      img
        float left
        width rem(100)
        height rem(100)
        margin-right rem(30)
      input
        width rem(460)
        height rem(46)
        line-height rem(34)
        margin-top rem(25)
        font-size rem(30)
        color #fff
        background-color #468f88
</style>
