<template>
	<ul class="content-wrap">
		<router-link :to="{'path': '../mailbox', params: { userId: 0 }, query: {title: '收件箱', key: '0'}}">
			<li class="mailbox item">
				<i class="item-icon icon-mailbox"></i>
				<span class="item-txt">收件箱</span>
				<span class="item-num">{{ defaultNum }}</span>
			</li>
		</router-link>
	</ul>
</template>
<script>
export default {
  name: 'content',
  data() {
    return {
      'defaultNum': 0
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .content-wrap
      width 10rem
      height 100%
      .item
        position relative
        margin 0
        width 100%
        height 1.48438rem
      .mailbox
        border-bottom 1px solid #efefef
        .item-icon
          position absolute
          display inline-block
          left 0
          top 0
          width 0.46875rem
          height 0.46875rem
          margin 0.5rem
        .item-txt
          position absolute
          display inline-block
          left 1.5625rem
          top 0
          height 1.48438rem
          line-height 1.48438rem
          font-size 0.51563rem
          color #212121
        .item-num
          position absolute
          right 0.375rem
          height 1.48438rem
          line-height 1.48438rem
          font-size 0.3125rem
          color #9f9f9f
        .icon-mailbox
          background url('../assets/img/mailbox.png')
          background-size 100% 100%
</style>
