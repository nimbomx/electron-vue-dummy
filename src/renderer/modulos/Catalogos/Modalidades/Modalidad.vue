<template>
  <div>
      <form @submit.stop.prevent="actualizarObjeto">
          <input v-model="objeto.nombre" placeholder="nombre">
          <input v-model="objeto.clave" placeholder="clave">
          <textarea v-model="objeto.descripcion" placeholder="descripcion"></textarea>
          <button type="submit">Actualizar Municipio</button>
      </form>
      {{ errorMessage }}
      <pre>{{ errors }}</pre>
  </div>
</template>

<script>
export default {
    props:{
        id:[Number,String]
    },
    data(){
        return {
            objeto:{},
            errors:{},
            errorMessage:'',
            pass:{}
        }
    },
    mounted(){
        this.$axios.get(`/catalogos/modalidades/${this.id}`).then( ({data}) => this.objeto = data)
    },
    methods:{
        actualizarObjeto(){
            this.$axios.put(`/catalogos/modalidades/${this.id}`, this.objeto).then( () => this.$router.push('/catalogos/municipios'))
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