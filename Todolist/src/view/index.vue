<template>
	<div class="app">
    	<nvheader></nvheader>
    	<mailContent></mailContent>
    </div>
</template>
<script>
import nvheader from '@/components/nvheader'
import content from '@/components/content'

export default {
  name: 'index',
  data() {
    return {
    }
  },
  components: {
    nvheader,
    'mailContent': content
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    
</style>