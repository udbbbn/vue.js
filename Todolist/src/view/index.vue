<template>
    <div class="app">
      <nvheader></nvheader>
      <mailContent :upMailListFlag="upMailListFlag"></mailContent>
      <create v-on:updateMailList="updateMailList"></create>
    </div>
</template>
<script>
import nvheader from '@/components/nvheader'
import indexContent from '@/components/content'
import create from '@/components/create'

export default {
  name: 'index',
  data() {
    return {
      upMailListFlag: ''
    }
  },
  components: {
    nvheader,
    'mailContent': indexContent,
    create
  },
  methods: {
    updateMailList: function() {
      this.upMailListFlag++
    }
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
</style>
