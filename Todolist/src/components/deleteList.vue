<template>
	<div class="layer-wrap" v-show="deleteStatus">
		<div class="layer-content">
			<h3 class="layer-title">清单名称</h3>
			<div class="txt-content">您确定要删除该清单？</div>
			<div class="button-wrap">
				<button class="cancel" v-touch:tap.prevent="cancel">取消</button>
				<button class="confirm" v-touch:tap.prevent="confirm">确认</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'deleteList',
  props: ['deleteStatus'],
  data() {
    return {
    }
  },
  methods: {
    cancel: function() {
      this.$emit('deleteCancel')
    },
    confirm: function() {
      this.$emit('deleteConfirm')
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
    .layer-wrap
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)
      .layer-content
        position absolute
        left 50%
        top 50%
        margin-left rem(-280)
        margin-right rem(-130)
        width rem(500)
        height rem(230)
        border-radius rem(5)
        background #fff
        .layer-title
          margin-top 0
          margin-bottom rem(40)
          font-size rem(35)
        .txt-content
          font-size rem(30)
        .button-wrap
          position absolute
          right rem(20)
          bottom rem(20)
          width rem(200)
          height rem(80)
          button
            display inline-block
            margin 0
            padding 0
            width rem(100)
            height rem(80)
            font-size rem(25)
            color #14c48e
            border 0
            background #fff
          .confirm
            float right
          .cancel
            float right
</style>
