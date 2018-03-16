<template>
	<div class="mailbox">
		<mailheader></mailheader>
		<mailcontent></mailcontent>
	</div>
</template>
<script>
import mailheader from '@/components/mailheader'
import mailcontent from '@/components/mailcontent'

export default {
  name: 'mailbox',
  data() {
    return {
    }
  },
  components: {
    mailheader,
    mailcontent
  }
}
</script>

<style rel="stylesheet" href="" lang="stylus">
    .mailbox
      width 100%
      height 100%
      overflow hidden
</style>
