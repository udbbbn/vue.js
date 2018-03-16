<template>
	<header class="nav-header">
		<img src="@/assets/img/arrow-left.png" class="icon-left">
		<span class="header-txt"></span>
	</header>
</template>
<script>
export default {
  name: 'mailheader',
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .nav-header
      width 100%
      height 1.5625rem
      background #468f88
      .icon-left
        float left
        width 1.5625rem
        height 1.5625rem
        margin-right 0.46875rem
      .header-txt
        width auto
        height 1.5625rem
        line-height 1.5625rem
        font-size 0.625rem
        color #fff
</style>