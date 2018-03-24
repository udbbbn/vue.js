<template>
  <ul class="content-wrap">
     <router-link :to="{'path': '../mailbox', params: { userId: 0 }, query: {title: '收件箱', key: '0'}}">
      <li class="mailbox item">
        <i class="item-icon icon-mailbox"></i>
        <span class="item-txt">收件箱</span>
        <span class="item-num">{{ defaultNum }}</span>
      </li>
    </router-link>
      <ul class="new-list" v-for="(item, index) in collections" :key="index">
        <li class="list" v-if="!item.defaultList">
          <span class="removeBtn" :class="{'active': item.removeStatus}" v-touch:tap.stop="showDeleteLayer(index)">删除</span>
              <div class="item" :class="{'remove': item.removeStatus}"
                v-touch:left="hideDelete(index)"
                v-touch:right="showDelete(index)">
                <router-link :to="{'path': '../mailbox', params: { userId: index + 1 }, query: {title: item.name, key: item.key}}">
                <i class="item-icon icon-newList"></i>
                <span class="item-txt">{{ item.name }}</span>
                <span class="item-num">{{ item.count }}</span>
                </router-link>
              </div>
        </li>
      </ul>
  </ul>
</template>
<script>
import store from '@/assets/js/store'
import $ from 'webpack-zepto'

export default {
  name: 'indexContent',
  data() {
    return {
      editStatus: false,
      layerStatus: false,
      leftStatus: false,
      deleteStatus: false,
      layerMessage: '清单名称',
      newVal: '',
      deleteIndex: '',
      defaultNum: 0,
      listCollection: [],
      collections: [],
      defaultList: ''
    }
  },
  methods: {
    addList: function() {
      let key = Math.random()
      this.collections.push({
        'key': key,
        'name': this.newVal,
        'count': 0,
        'removeStatus': false,
        'defaultList': false,
        'todoList': [],
        'completeList': []
      })
      store.set('collections', this.collections)
    },
    addDefaultList: function() {
      this.collections.push({
        'key': '0',
        'name': '收件箱',
        'count': 0,
        'removeStatus': false,
        'todoList': [],
        'completeList': [],
        'defaultList': true
      })
      store.set('collections', this.collections)
    },
    initCollections: function() {
      let _t = this
      this.collections = store.get('collections') || []
      let noDefault = this.collections.every(function(item, index) {
        return !item['defaultList']
      })
      if (noDefault) {
        _t.addDefaultList()
      }
    },
    initNum: function() {
      let _t = this
      $.each(_t.collections, function(index, item) {
        if (item['defaultList']) {
          _t.defaultNum = item['count']
        }
      })
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
      $.each(_t.collections, function(index, item) {
        if (+_index === index) {
          item['removeStatus'] = status
          console.log(item)
        }
      })
    },
    showDeleteLayer: function(index) {
      this.deleteStatus = true
      this.deleteIndex = index
    }
  },
  created: function() {
    this.initCollections()
    this.initNum()
  },
  watch: {
    'collections': function() {

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
    .content-wrap
      width rem(640)
      height 100%
      .item
        position relative
        margin 0
        width 100%
        height rem(95)
      .mailbox
        border-bottom 1px solid #efefef
        .item-icon
          position absolute
          display inline-block
          left 0
          top 0
          width rem(30)
          height rem(30)
          margin rem(32)
        .item-txt
          position absolute
          display inline-block
          left rem(100)
          top 0
          height rem(95)
          line-height rem(95)
          font-size rem(33)
          color #212121
        .item-num
          position absolute
          right rem(24)
          height rem(95)
          line-height rem(95)
          font-size rem(20)
          color #9f9f9f
        .icon-mailbox
          background url('../assets/img/mailbox.png')
          background-size 100% 100%
      .list
        position relative
        border-bottom 1px solid #efefef
        .removeBtn
          display none
          position absolute
          left 0
          top 0
          width rem(150)
          height rem(95)
          line-height rem(95)
          font-size rem(25)
          color #fff
          background #fe0032
          text-align center
          border-radius rem(5) 0 0 rem(5)
          &.active
            display inline-block
        .remove
          transform translateX(rem(150))
        .icon-newList
          background url("../assets/img/plan.png")
          background-size 100% 100%
        .item-txt
          position absolute
          display inline-block
          left rem(100)
          top 0
          height rem(95)
          line-height rem(95)
          font-size rem(33)
          color #212121
        .item-num
          position absolute
          right rem(24)
          height rem(95)
          line-height rem(95)
          font-size rem(20)
          color #9f9f9f
</style>
