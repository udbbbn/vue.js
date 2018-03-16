<template>
	<div class="query-content">
		<div class="query-item">
			<div class="item-title">{{ itemTitle }}</div>
			<listTodo></listTodo>
		</div>
	</div>
</template>
<script>
import listTodo from '@/components/listTodo'

export default {
  name: 'querycontent',
  props: ['itemTitle'],
  data() {
    return {
    }
  },
  components: {
    listTodo
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .query-content
      width 100%
      height 100%
      background-color #7fbcb4
      .query-item
        position relative
        padding-top 0.39063rem
      .item-title
        width 2.53125rem
        height 1.14063rem
        line-height 1.14063rem
        font-size 0.35938rem
        text-align center
        color #fff
        background-color #4f9690
        margin 0 auto
        margin-bottom 0.3125rem
</style>
