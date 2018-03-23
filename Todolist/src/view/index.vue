<template>
    <div class="app">
      <nvheader></nvheader>
      <mailContent></mailContent>
      <create></create>
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
    }
  },
  components: {
    nvheader,
    'mailContent': indexContent,
    create
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
</style>
