<template>
	<div>
		<div class="item" v-touch:tap="layerDisplay">
			<i class="icon-create item-icon"></i>
			<span class="item-txt">{{ itemTxt }}</span>
		</div>
		<layer :layerShow="layerShow" :layerMessage="layerMessage"  v-on:updateAvatar="updateAvatarText" v-on:updateLayerDisplay="updateLayerDisplay"></layer>
	</div>
</template>
<script>
import layer from '@/components/layer'
import store from '@/assets/js/store'

export default {
  name: 'create',
  data() {
    return {
      layerShow: false,
      layerMessage: '清单名称',
      itemTxt: '创建清单',
      collections: []
    }
  },
  components: {
    layer
  },
  methods: {
    layerDisplay: function() {
      this.layerShow = true
    },
    updateAvatarText: function(val) {
      this.layerShow = val.layerShow
      if (!val.text) {
        return
      }
      this.addDefaultList(val)
      this.$emit('updateMailList')
    },
    updateLayerDisplay: function() {
      this.layerShow = false
    },
    addDefaultList: function(val) {
      let storeData = store.get('collections')
      let flag = false
      $.each(storeData, function(index, item) {
        if(item['name'].trim() === val.text.trim() && !flag){
          flag = true
        }
      })
      if (flag) {return}
      this.collections.push({
        'key': storeData.length,
        'name': val.text,
        'count': 0,
        'removeStatus': false,
        'todoList': [],
        'completeList': [],
        'defaultList': false
      })
      store.set('collections', this.collections)
    },
    initCollections: function() {
      this.collections = store.get('collections')
    }
  },
  created: function() {
    this.initCollections()
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
    .item
      position relative
      margin 0
      width 100%
      height rem(95)
      .icon-create
        background url("../assets/img/create-btn.png")
        background-size 100% 100%
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
        color #56abe4
</style>
