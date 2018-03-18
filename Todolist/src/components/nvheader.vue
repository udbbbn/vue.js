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
    .nav
      width 100%
      height 1.5625rem
      background #468f88
      .nav-left
        float left
        cursor pointer
        .avatar
          float left
          width 1.125rem
          height 1.125rem
          line-height 1.125rem
          font-size 0.5rem
          text-align center
          border-radius 50%
          background #6494e1
          margin 0.23438rem
          color #fff
        .avatar-name
          font-size 0.46875rem
          height 1.5625rem
          line-height 1.5625rem
          color #fff
      .search
        float right
        width 0.625rem
        height 0.625rem
        line-height 0.625rem
        margin 0.46875rem
        cursor pointer
        img
          width 100%
          height 100%
</style>
