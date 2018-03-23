<template>
	<div class="mailbox">
		<mailheader :headerTxt="headerTxt"></mailheader>
		<mailcontent :iKey="key"></mailcontent>
	</div>
</template>
<script>
import mailheader from '@/components/mailheader'
import mailcontent from '@/components/mailcontent'

export default {
  name: 'mailbox',
  data() {
    return {
      headerTxt: '',
      key: ''
    }
  },
  components: {
    mailheader,
    mailcontent
  },
  created: function() {
    let query = this.$router.currentRoute.query
    let title = query && query.title
    let key = query && query.key
    this.headerTxt = title
    this.key = key
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .mailbox
      width 100%
      height 100%
      position relative
</style>
