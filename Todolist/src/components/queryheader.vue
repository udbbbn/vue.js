<template>
	<header class="nav-header">
		<img src="@/assets/img/arrow-left.png" v-touch:tap="back">
		<input type="text" placeholder="搜索..." :input="toggleInput" />
	</header>
</template>
<script>

export default {
  name: 'queryheader',
  data() {
    return {
    }
  },
  methods: {
    back: function() {
      history.back()
    },
    toggleInput: function() {

    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .nav-header
      width 100%
      height 1.5625rem
      background-color #468f88
      box-shadow 0 5px 5px #ccc
      img
        float left
        width 1.5625rem
        height 1.5625rem
        margin-right 0.46875rem
      input
        width 7.1875rem
        height 0.71875rem
        line-height 0.71875rem
        margin-top 0.434rem
        font-size 0.49125rem
        color #fff
        background-color #468f88
</style>
