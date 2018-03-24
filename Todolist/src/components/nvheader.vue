<template>
	<div class="nav">
    <div class="nav-left" v-touch:tap="layerDisplay">
      <span class="avatar">{{avatar}}</span>
      <span class="avatar-name">{{avatarName}}</span>
    </div>
    <layer :layerShow="layerShow" :layerMessage="layerMessage" v-on:updateAvatar="updateAvatarText" v-on:updateLayerDisplay="updateLayerDisplay"></layer>
    <div class="search">
      <router-link :to="{'path': '/query'}">
        <img src="@/assets/img/query.png" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
import layer from './layer.vue'
import store from '@/assets/js/store'

export default {
  name: 'nvheader',
  prorp: ['title'],
  data() {
    return {
      layerShow: false,
      layerMessage: '修改名称',
      avatar: '默',
      avatarName: '默认用户'
    }
  },
  mounted: function() {
    this.editName()
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
      this.editName(val.text)
    },
    updateLayerDisplay: function() {
      this.layerShow = false
    },
    editName: function(name) {
      let localName = store.get('name') || '默认用户'
      /* eslint-disable */
      let newName = name ? name : localName

      this.avatar = newName.substr(0, 1)
      this.avatarName = newName
      store.set('name', newName)
    }
  },
  components: {
    layer
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
    rem(target, context = 64){
      if target == 0{
        return 0
      }
      return target / context + 0rem
    }
    .nav
      width 100%
      height rem(100)
      background #468f88
      .nav-left
        float left
        cursor pointer
        .avatar
          float left
          width rem(72)
          height rem(72)
          line-height rem(72)
          font-size rem(32)
          text-align center
          border-radius 50%
          background #6494e1
          margin rem(15)
          color #fff
        .avatar-name
          font-size rem(30)
          height rem(100)
          line-height rem(100)
          color #fff
      .search
        float right
        width rem(40)
        height rem(40)
        line-height rem(40)
        margin rem(30)
        cursor pointer
        img
          width 100%
          height 100%
</style>
