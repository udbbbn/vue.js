<template>
	<header class="nav-header">
		<img src="@/assets/img/arrow-left.png" class="icon-left" v-touch:tap="back">
		<span class="header-txt">{{ headerTxt }}</span>
	</header>
</template>
<script>
export default {
  name: 'mailheader',
  props: ['headerTxt'],
  data() {
    return {
    }
  },
  methods: {
    back: function() {
      history.back()
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
      background #468f88
      .icon-left
        float left
        width rem(100)
        height rem(100)
        margin-right rem(30)
      .header-txt
        width auto
        height rem(46)
        line-height rem(100)
        font-size rem(34)
        color #fff
</style>
