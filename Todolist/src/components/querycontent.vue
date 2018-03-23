<template>
	<div class="query-content">
		<div class="query-item" v-for="(itemData, index) in collections" :key="index">
			<div class="item-title">{{ itemData.name }}</div>
			<listTodo :item-data='itemData' :collections="collections" :list-type="listType"></listTodo>
		</div>
	</div>
</template>
<script>
import listTodo from '@/components/listTodo'

export default {
  name: 'querycontent',
  props: ['collections'],
  data() {
    return {
      itemTitle: '收件箱',
      itemData: '',
      listType: 'query'
    }
  },
  components: {
    listTodo
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
    .query-content
      width 100%
      height 100%
      background-color #7fbcb4
      .query-item
        position relative
        padding-top rem(25)
      .item-title
        width rem(162)
        height rem(73)
        line-height rem(73)
        font-size rem(23)
        text-align center
        color #fff
        background-color #4f9690
        margin 0 auto
        margin-bottom rem(20)
</style>
