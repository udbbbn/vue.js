<template>
	<div class="layer-wrap" v-show="layerShow">
		<div class="layer-content">
			<h3 class="layer-title">{{ layerMessage }}</h3>
			<input class="layer-input" type="text" :placeholder="layerMessage" v-model="newVal" />
			<div class="bottom-wrap">
				<button class="cancel" v-touch:tap="cancel">取消</button>
				<button class="commit" v-touch:tap="commit">确认</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'layer',
  props: ['layerShow', 'layerMessage'],
  data() {
    return {
      newVal: ''
    }
  },
  methods: {
    commit: function() {
      this.$emit('updateAvatar', { text: this.newVal, layerShow: false })
    },
    cancel: function() {
      this.$emit('updateLayerDisplay')
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
      background-color rgba(0, 0, 0, .5)
      z-index 100
      .layer-content
        position absolute
        left 50%
        top 50%
        margin-left rem(-280)
        margin-top rem(-180)
        padding rem(30)
        width rem(500)
        height rem(300)
        border-radius rem(5)
        background #fff
        .layer-title
          font-size rem(30)
          margin rem(30) 0
        .layer-input
          font-size rem(30)
          width rem(500)
          height rem(50)
          border 0
          border-bottom 1px solid #ccc
          margin 0.5666rem 0
        .bottom-wrap
          position absolute
          right rem(20)
          bottom rem(20)
          width rem(200)
          height rem(80)
          button
            margin 0
            padding 0
            width rem(100)
            height rem(80)
            font-size rem(25)
            color #14c48e
            border 0
            background #fff
          .cancel
            float right
          .commit
            float right
</style>
