<template>
        
        <div v-if="url">
            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
            <pre>{{variante}}</pre>
            <small v-if="variante">El archivo de requisitos de la variante será el que se mostrará</small>
        </div>

</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    props:{
        url:[String,Boolean],
        token:[String]
,        tramite:[Object],
        variante:[Object,null]
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    data() {
        return {
            dropzoneOptions: {
                url:this.url,
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: {Authorization: `Bearer ${this.token}`}
            }
        }
    },




}
</script>

<style>

</style>