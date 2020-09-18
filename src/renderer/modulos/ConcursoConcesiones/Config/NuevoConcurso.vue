<template>
  <div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Nuevo concurso</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/config')">Cancelar</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto p-4">
      <b-form @submit.stop.prevent="crearObjeto">
          <div class="row">
            <b-form-group class="col-9" label="Nombre:" label-for="input-1">
                <b-form-input id="input-1" type="text" required
                v-model="objeto.nombre" placeholder="Nombre"></b-form-input>
                <validation-alert :errors="errors.nombre" />
            </b-form-group>

            <b-form-group class="col-3" label="Clave:" label-for="input-2" description="La clave debe ser única">
                <b-form-input id="input-2" type="text" required
                v-model="objeto.clave" placeholder="Clave"></b-form-input>
                <validation-alert :errors="errors.clave" />
            </b-form-group>

          </div>
       

        <div class="row">
            <b-form-group class="col" label="Fecha de Publicación:" label-for="input-4">
                <b-form-input id="input-4" type="date" 
                v-model="objeto.publicacion_convocatoria" ></b-form-input>
                <validation-alert :errors="errors.publicacion_convocatoria" />
            </b-form-group>

            <b-form-group class="col" label="No. de concesiones:" label-for="input-7">
                <b-form-input id="input-7" type="number" 
                v-model="objeto.no_concesiones" placeholder="No. de concesiones"></b-form-input>
                <validation-alert :errors="errors.no_concesiones" />
            </b-form-group>
        </div>

        <div class="row">
            <b-form-group class="col" label="Zona:" label-for="input-3">
                <b-form-input id="input-3" type="text" required
                v-model="objeto.zona_id" placeholder="Zona"></b-form-input>
                <validation-alert :errors="errors.zona_id" />
            </b-form-group>

            <b-form-group class="col" label="Modalidad:" label-for="input-5">
                <b-form-input id="input-5" type="text" required
                v-model="objeto.modalidad_id" placeholder="Modalidad"></b-form-input>
                <validation-alert :errors="errors.modalidad_id" />
            </b-form-group>
        </div>

        <b-form-group label="Municipios:" label-for="input-6">
            <b-form-input id="input-6" type="text" 
            v-model="objeto.municipio_ids" placeholder="Municipios"></b-form-input>
            <validation-alert :errors="errors.municipio_ids" />
        </b-form-group>

        <b-button type="submit" variant="primary">Crear Concurso</b-button>
      </b-form>

  </div>
  </div>
</template>

<script>

import ValidationAlert from '@/components/ValidationAlert'

export default {
    components:{
      ValidationAlert
    },
    data(){
        return {
            titulo:'Concurso',
            objeto:{},
            errors:{},
            errorMessage:''
        }
        
    },
    methods:{
        crearObjeto(){
            this.$axios.post(`/cc/concurso`, this.objeto).then( () => this.$router.push('/cc/config'))
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