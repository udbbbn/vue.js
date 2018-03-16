<template>
	<div class="list-wrap">
		<div class="input-wrap">
			<i class="icon-add"></i>
			<input type="text" class="list-input" placeholder="添加任务..." />
		</div>
	</div>
</template>
<script>
export default {
  name: 'mailcontent',
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .list-wrap
      width 100%
      height 100%
      background #7fbcb4
      padding-top 0.23438rem
      .input-wrap
        margin 0 auto
        margin-bottom 0.20313rem
        width 9.5625rem
        height 1.35938rem
        font-size 0.46875rem
        border-radius 0.07813rem
        background #4f9690
        .icon-add
          float left
          width 0.5625rem
          height 0.5625rem
          margin 0.39063rem
          background url('../assets/img/add.png')
          background-size 100% 100%
        input::-webkit-input-placeholder
          color #fff
        input::-moz-placeholder
          color #fff
        input::-ms-input-placeholder
          color #fff
        input::-webkit-input-placeholder
          color #fff
        .list-input
          display inline-block
          width 8.125rem
          height 99.9%
          color #fff
          border 0
          background #4f9690
</style>
