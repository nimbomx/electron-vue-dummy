<template>
    <b-button size="sm" :disabled="working" @click="clicked"> <slot>Click</slot></b-button>
</template>

<script>


export default {
   data(){
       return {
           working:false
       }
   },
   methods:{
       clicked(){
           if(this.working) return false
           this.working = true
           this.$emit('clicked')
       }
   }
}
</script>

<style>

</style>