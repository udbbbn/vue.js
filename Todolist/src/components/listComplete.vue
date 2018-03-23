<template>
	<div>
		<div class="completed" v-touch:tap="showCompleted">{{ completeTxt }}</div>
		<ul class="completed-ul" v-if="completeState">
			<li class="list-item" v-for="(item, index) in completeList" :key="index">
				<i class="icon-select selected"></i>
				<div class="item-txt completed-txt">{{ item.text }}</div>
			</li>
		</ul>
		<div class="completed-clear" v-touch:tap="clearCompleted" v-if="completeState">{{ completeTxtClear }}</div>
	</div>
</template>
<script>
import store from '@/assets/js/store'

export default {
  name: 'listComplete',
  props: ['itemData', 'collections'],
  data() {
    return {
      completeState: false,
      completeTxt: '显示未完成任务',
      completeTxtClear: '清空已完成任务',
      completeList: []
    }
  },
  methods: {
    saveCollection: function() {
      store.set('collections', this.collections)
    },
    showCompleted: function() {
      this.completeState = !this.completeState
      if (this.completeState) {
        this.completeTxt = '已完成任务'
      } else {
        this.completeTxt = '显示已完成任务'
      }
    },
    clearCompleted: function() {
      this.itemData['completeList'] = []
      this.completeList = []
      this.saveCollection()
    }
  },
  watch: {
    'itemData.completeList': function(newVal, oldVal) {
      this.completeList = newVal
      console.log(this.completeList)
    }
  },
  created: function() {
    this.completeList = this.itemData.completeList
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

    .completed,
    .completed-clear
      margin 0 auto
      width rem(226)
      height rem(70)
      line-height rem(70)
      font-size rem(24)
      color #fff
      text-align center
      background #4f9690
    .completed-ul
      padding-top rem(13)
      .list-item
        position relative
        margin 0 auto
        margin-bottom rem(13)
        width rem(612)
        height rem(87)
        font-size rem(30)
        border-radius rem(5)
        background #fff
        .icon-select
          display inline-block
          float left
          width rem(36)
          height rem(36)
          margin rem(25)
        .selected
          background: url('../assets/img/selected.png')
          background-size 100% 100%
        .item-txt
          display inline-block
          width rem(520)
          height 100%
          line-height rem(87)
          font-size rem(30)
          color #4b4b4b
</style>
