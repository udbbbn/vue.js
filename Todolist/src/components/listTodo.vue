<template>
	<ul class="todo-list">
		<li class="list-item" v-for="item in todoList" v-if="item.queryStatus" v-bind:key="item">
			<span class="removeBtn" v-touch:tap="deleteItem($index)">删除</span>
			<div class="item"
				v-touch:swipeleft="hideDelete($index)"
				v-touch:swiperight="showDelete($index)">
				<i class="icon-select" v-touch:tap="complete($index)"></i>
				<span class="item-txt">{{ item.text }}</span>
			</div>
		</li>
	</ul>
</template>
<script>
export default {
  name: 'listTodo',
  props: ['todoList'],
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .list-item
      position relative
      margin 0 auto
      margin-bottom 0.20313rem
      width 9.5625rem
      height 1.35938rem
      font-size 0.46875rem
      border-radius 0.07813rem
      background #fff
      .removeBtn
        display none
        position absolute
        left 0
        top 0
        width 2.34375rem
        height 1.35938rem
        line-height 1.35938rem
        font-size 0.39063rem
        color #fff
        background #fe0032
        text-align center
        border-radius 0.07813rem 0 0 0.07813rem
        .icon-select
          display inline-block
          float left
          width 0.5625rem
          height 0.5625rem
          margin 0.39063rem
        .item-txt
          display inline-block
          width 8.125rem
          height 100%
          line-height 1.35938rem
          font-size 0.46875rem
          color #4b4b4b
</style>
