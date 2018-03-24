<template>
	<ul class="todo-list">
		<li class="list-item" v-for="(item, index) in todoList" v-bind:key="index" v-if="item.queryStatus | showQuery(item.queryStatus, listType)">
			<span class="removeBtn" :class="{'active': item.removeStatus}" v-touch:tap="deleteItem(index)">删除</span>
			<div class="item" :class="{'remove': item.removeStatus}"
				v-touch:left="hideDelete(index)"
				v-touch:right="showDelete(index)">
				<i class="icon-select unselect" v-touch:tap="complete(index)"></i>
				<span class="item-txt">{{ item.text }}</span>
			</div>
		</li>
	</ul>
</template>
<script>
import store from '@/assets/js/store'
import $ from 'webpack-zepto'

export default {
  name: 'listTodo',
  props: ['itemData', 'collections', 'listType'],
  data() {
    return {
      todoList: [],
      completeList: []
    }
  },
  mounted: function() {
    this.todoList = this.itemData.todoList
    this.completeList = this.itemData.completeList
  },
  watch: {
    'itemData.todoList': function(newVal, oldVal) {
      this.todoList = newVal
    },
    'itemData.completeList': function(newVal, oldVal) {
      this.completeList = newVal
    }
  },
  methods: {
    saveCollection: function() {
      store.set('collections', this.collections)
    },
    deleteItem: function(index) {
      return () => {
        var _t = this
        var _index = index
        $.each(_t.todoList, function(index, item) {
          if (_index === index) {
            _t.todoList.splice(index, 1)[0]
          }
        })
        this.itemData['count'] = this.todoList.length
        this.saveCollection()
      }
    },
    showDelete: function(index) {
      return () => {
        this.toggleDelete(index, true)
      }
    },
    hideDelete: function(index) {
      return () => {
        this.toggleDelete(index, false)
      }
    },
    toggleDelete: function(index, status) {
      var _t = this
      var _index = index
      $.each(_t.todoList, function(index, item) {
        if (+_index === index) {
          item['removeStatus'] = status
        }
      })
    },
    complete: function($index) {
      return () => {
        let todoList = this.todoList
        let completeList = this.completeList
        $.each(todoList, function(index, item) {
          if (+$index === index) {
            let complete = todoList.splice(index, 1)[0]
            completeList.push(complete)
          }
        })
        this.itemData['count'] = this.todoList.length
        this.saveCollection()
      }
    },
    showQuery: function(val, type) {
      if (type === 'query') {
        return val
      } else {
        return true
      }
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
    .list-item
      position relative
      margin 0 auto
      margin-bottom rem(13)
      width rem(612)
      height rem(87)
      font-size rem(30)
      border-radius rem(5)
      background #fff
      .removeBtn
        display none
        position absolute
        left 0
        top 0
        width rem(150)
        height rem(87)
        line-height rem(87)
        font-size rem(25)
        color #fff
        background #fe0032
        text-align center
        border-radius rem(5) 0 0 rem(5)
        &.active
          display inline-block
      .item
        &.remove
          transform: translateX(2.34375rem)
        .unselect
          background: url('../assets/img/unselect.png')
          background-size 100% 100%
        .icon-select
          display inline-block
          float left
          width rem(36)
          height rem(36)
          margin rem(25)
        .item-txt
          display inline-block
          width rem(520)
          height 100%
          line-height rem(87)
          font-size rem(30)
          color #4b4b4b
</style>
