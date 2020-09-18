<template>
  <div>
      <form @submit.stop.prevent="crearObjeto">
          <input v-model="objeto.nombre" placeholder="nombre">
          <input v-model="objeto.clave" placeholder="clave">
          <textarea v-model="objeto.descripcion" placeholder="descripcion"></textarea>
          <button type="submit">Crear {{ titulo }}</button>
      </form>
      {{ errorMessage }}
      <pre>{{ errors }}</pre>
  </div>
</template>

<script>
export default {
    data(){
        return {
            clave:'modulos',
            titulo:'Modulo',
            objeto:{},
            errors:{},
            errorMessage:''
        }
        
    },
    methods:{
        crearObjeto(){
            this.$axios.post(`/${this.clave}`, this.objeto).then( () => this.$router.push(`/${this.clave}`))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        }
    }
}
</script>

<style>

</style>