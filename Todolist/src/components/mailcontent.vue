<template>
  <div class="list-wrap">
    <div class="list-calc">
       <div class="input-wrap">
        <i class="icon-add"></i>
        <input type="text" class="list-input" placeholder="添加任务..." v-on:keyup.enter="add" v-model="newTodo"/>
      </div>
      <listTodo :item-data.sync="itemData" :collections.sync="collections"></listTodo>
      <listComplete :item-data.sync="itemData" :collections.sync="collections"></listComplete>
    </div>
  </div>
</template>
<script>
import listTodo from './listTodo'
import listComplete from './listComplete'
import store from '@/assets/js/store'
import $ from 'webpack-zepto'

export default {
  name: 'mailcontent',
  props: ['iKey'],
  data() {
    return {
      todoList: [],
      completeList: [],
      count: '',
      newTodo: '',
      collections: [],
      itemData: ''
    }
  },
  methods: {
    saveCollection: function() {
      store.set('collections', this.collections)
    },
    add: function() {
      if (this.newTodo.trim() === '') {
        return
      }
      let storeData = store.get('collections')
      let flag = false
      let key = this.$router.currentRoute.query.key
      let _t = this
      $.each(storeData[key].todoList, function(index, item) {
        if (item['text'] === _t.newTodo && !flag) {
          flag = true
        }
      })
      if (flag) {
        this.newTodo = ''
        return
      }
      this.todoList.push({
        text: this.newTodo,
        removeStatus: false
      })// 更新todolist
      this.newTodo = ''
      this.itemData['count'] = this.todoList.length //  更新count
      this.saveCollection()
    },
    initItemData: function(key) {
      var _t = this
      this.collections = store.get('collections')
      $.each(this.collections, function(index, item) {
        if (item['key'] === key) {
          _t.itemData = item
        }
      })
      this.todoList = this.itemData['todoList']
      this.completeList = this.itemData['completeList']
    }
  },
  components: {
    listTodo,
    listComplete
  },
  created: function() {
    this.initItemData(this.iKey)
    this.$on('list_saveCollection', function() {
      this.saveCollection()
    })
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
    .list-wrap
      width 100%
      height 100%
      padding-top rem(15)
      background #7fbcb4
      .list-calc
        height "calc(100% - %s)" % rem(130)
        overflow-y auto
        overflow-x hidden
        .input-wrap
          margin 0 auto
          margin-bottom rem(13)
          width rem(612)
          height rem(87)
          font-size rem(30)
          border-radius rem(5)
          background #4f9690
          .icon-add
            float left
            width rem(36)
            height rem(36)
            margin rem(25)
            background url('../assets/img/add.png')
            background-size 100% 100%
          input::-webkit-input-placeholder
            color #fff
          input::-moz-placeholder
            color #fff
          input::-ms-input-placeholder
            color #fff
          input::-webkit-input-placeholder
            color #fff
          .list-input
            display inline-block
            width rem(520)
            height 99.9%
            color #fff
            border 0
            background #4f9690
</style>
