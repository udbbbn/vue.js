<template>
	<div class="query-wrap">
		<queryheader></queryheader>
		<querycontent :itemTitle="itemTitle"></querycontent>
	</div>
</template>
<script>
import queryheader from '@/components/queryheader'
import querycontent from '@/components/querycontent'
import store from '@/assets/js/store'

export default {
  name: '',
  data() {
    return {
      itemTitle: '收件箱',
      collections: []
    }
  },
  components: {
    querycontent,
    queryheader
  },
  mounted: function() {

  },
  methods: {
    initQueryList: function() {
      // let _this = this
      this.collections = store.get('collections')
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .query-wrap
      width 100%
      height 100%
      overflow hidden
</style>
