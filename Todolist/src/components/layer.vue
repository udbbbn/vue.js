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
        margin-left -4.375rem
        margin-top -2.8125rem
        padding 0.46875rem
        width 7.8125rem
        height 4.6875rem
        border-radius 0.07813rem
        background #fff
        .layer-title
          font-size 0.54688rem
          margin 0.5666rem 0
        .layer-input
          font-size 0.46875rem
          width 7.8125rem
          height 0.78125rem
          border 0
          border-bottom 1px solid #ccc
          margin 0.5666rem 0
        .bottom-wrap
          position absolute
          right 0.3125rem
          bottom 0.3125rem
          width 3.125rem
          height 1.25rem
          button
            margin 0
            padding 0
            width 1.5625rem
            height 1.25rem
            font-size 0.39063rem
            color #14c48e
            border 0
            background #fff
          .cancel
            float right
          .commit
            float right
</style>
