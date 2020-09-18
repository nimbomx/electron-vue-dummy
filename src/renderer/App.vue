<template>
  <component :is="layout"></component>
</template>

<script>
const remote = require('electron').remote
import DefaultLayout from '@/layouts/Default'
import EmptyLayout from '@/layouts/Empty'

  export default {
    name: 'sctslp',
    components:{
      DefaultLayout,
      EmptyLayout
    },
    data(){
      return {
        layout:'default-layout'
      }
    },
    $bus:{
      layout(layoutName){
        this.layout = layoutName +'-layout'
      },
      title(title){
        title = title ? `${title} |` : ''
        remote.getCurrentWindow().setTitle(`${title} SCT SLP v${remote.app.getVersion()}`);
      }

    },
  }
</script>
