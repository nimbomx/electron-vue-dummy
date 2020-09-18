<template>
  <div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand v-if="objeto">{{ objeto.nombre }}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" v-if="objeto" variant="secondary" @click="$router.push(`/cc/${objeto.cc_concurso_id}/documentos`)">Volver</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="actualizarObjeto">
          <div class="row">
            <b-form-group class="col" label="Etapa:" label-for="input-1">
                <b-form-input id="input-1" type="text" required
                v-model="objeto.etapa" placeholder="Etapa"></b-form-input>
                <validation-alert :errors="errors.etapa" />
            </b-form-group>

            <b-form-group class="col" label="Nombre:" label-for="input-2">
                <b-form-input id="input-2" type="text" required
                v-model="objeto.nombre" placeholder="Nombre"></b-form-input>
                <validation-alert :errors="errors.nombre" />
            </b-form-group>

          </div>

            <b-form-group  label="Descripción:" label-for="input-4">
                <b-form-textarea id="input-4" rows="3" max-rows="6"
                v-model="objeto.descripcion" placeholder="Descripción"></b-form-textarea>
                <validation-alert :errors="errors.descripcion" />
            </b-form-group>


        <b-button type="submit" variant="primary">Actualizar Documento</b-button>
      </b-form>
    <pre>{{ objeto }}</pre>
 </div>
  </div>
</template>

<script>
import ValidationAlert from '@/components/ValidationAlert'

export default {
    components:{
      ValidationAlert
    },
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
        this.$axios.get(`/cc/concurso/documento/${this.id}`).then( ({data}) => this.objeto = data)
    },
    methods:{
        actualizarObjeto(){
            this.$axios.put(`/cc/concurso/documento/${this.id}`, this.objeto).then( () => this.$router.push(`/cc/concurso/${id}/documentos`))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },

    }
    
}
</script>

<style>

</style>