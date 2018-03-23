<template>
	<div class="query-wrap">
		<queryheader :title="title" v-on:queryUpdateTitle="updateTitle"
    v-on:queryToggleInput="initQueryList"
    ></queryheader>
		<querycontent :collections="collections"></querycontent>
	</div>
</template>
<script>
import queryheader from '@/components/queryheader'
import querycontent from '@/components/querycontent'
import store from '@/assets/js/store'
import $ from 'webpack-zepto'

export default {
  name: '',
  data() {
    return {
      collections: [],
      queryCollections: [],
      title: ''
    }
  },
  components: {
    querycontent,
    queryheader
  },
  methods: {
    initQueryList: function() {
      let _t = this
      this.collections = store.get('collections')

      $.each(this.collections, function(index, item) {
        let todoList = item.todoList
        for (let i = todoList.length - 1; i >= 0; i--) {
          let text = todoList[i]['text']
          if ((text.indexOf(_t.title) !== -1) && _t.title.length !== 0) {
            item.todoList[i].queryStatus = true
            item.todoList[i].showQuery = true
          }
        }
      })
    },
    updateTitle: function(newVal) {
      this.title = newVal
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
