<template>
    <div class=" d-flex flex-column flex-fill " >
         <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand  class="align-self-center">Inscripción forzada</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/inscripciones')">Cancelar</b-button>

            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <b-form class="m-4" @submit.stop.prevent="onSubmit" @reset="resetForm" v-if="inscripcion">
                <div class="row">

                <b-form-group class="col-4" label-size="sm" label-for="input-0" label="Gafete:">
                    <b-form-input size="sm"
                    id="input-0"
                    v-model="inscripcion.gafete_invalido"
                    type="text"
                    required
                    placeholder="Gafete"
                    ></b-form-input>
                    <validation-alert class="mt-2" :errors="errors.gafete_invalido" />
                </b-form-group>

                <b-form-group class="col-8" label-size="sm" label-for="input-1" label="Nombre(s):">
                    <b-form-input size="sm"
                    id="input-1"
                    v-model="inscripcion.nombre"
                    type="text"
                    required
                    placeholder="Nombre(s)"
                    ></b-form-input>
                    <validation-alert class="mt-2" :errors="errors.nombre" />
                </b-form-group>
                </div>
                <div class="row">

                    <b-form-group class="col" id="input-group-2" label-for="input-2" label-size="sm"
                        label="Primer apellido:"
                    >
                        <b-form-input id="input-2" type="text" size="sm" required
                            v-model="inscripcion.primer_apellido"
                            placeholder="Primer apellido"
                        ></b-form-input>
                        <validation-alert class="mt-2" :errors="errors.primer_apellido" />
                    </b-form-group>

                    <b-form-group class="col" id="input-group-2" label-for="input-2" label-size="sm"
                        label="Segundo apellido:"
                    >
                        <b-form-input id="input-2" type="text" size="sm"
                            v-model="inscripcion.segundo_apellido"
                            placeholder="Segundo apellido"
                        ></b-form-input>
                    </b-form-group>
                </div>

                <b-form-group id="input-group-3" label="Municipio:" label-for="input-3" label-size="sm">
                    <b-form-select size="sm"
                    id="input-3"
                    v-model="inscripcion.municipio_id"
                    :options="sortedMunicipios"
                    required
                    ></b-form-select>
                    <validation-alert class="mt-2" :errors="errors.municipio_id" />
                </b-form-group>
                <b-form-group label="Zona:" label-for="input-10" label-size="sm">
                    <b-form-select size="sm"
                    id="input-10"
                    v-model="inscripcion.zona_id"
                    :options="sortedZonas"
                    required
                    ></b-form-select>
                    <validation-alert class="mt-2" :errors="errors.zona_id" />
                </b-form-group>
                <b-form-group label="Modalidad:" label-for="input-11" label-size="sm">
                    <b-form-select size="sm"
                    id="input-11"
                    v-model="inscripcion.modalidad_id"
                    :options="sortedModalidades"
                    required
                    ></b-form-select>
                    <validation-alert class="mt-2" :errors="errors.modalidad_id" />
                </b-form-group>


                <b-button type="submit" :disabled="validandoInscripcion" variant="primary">Guardar Inscripción</b-button>
                <b-button type="reset" variant="danger">Borrar formulario</b-button>
            </b-form>

        </div>

    </div>


</template>

<script>
import { mapActions, mapState } from 'vuex'
import ValidationAlert from '@/components/ValidationAlert'

export default {
    components:{
      ValidationAlert
    },
    data(){
        return {
            inscripcion:null,
            empty:{
                gafete_invalido:null,
                municipio_id:null,
                zona_id:null,
                modalidad_id:null,
                nombre:null,
                primer_apellido:null,
                segundo_apellido:null,
            },

            validandoInscripcion:false,

            errors:{},
            errorMessage:''
        }
    },
    mounted(){
        this.resetForm()
    },
    computed:{
        ...mapState({
            concurso: state => state.CC.concurso,
            municipios: state => state.Cat.municipios,
            zonas: state => state.Cat.zonas,
            modalidades: state => state.Cat.modalidades
        }),
        sortedMunicipios(){
            return [{value: null,text: "Elige un municipio", disabled: true}].concat(_.map(_.sortBy(this.municipios, ['nombre']),(value,key) => {
                return { value: value.id, text: value.nombre}
            }))
        },
        sortedZonas(){
            return [{value: null,text: "Elige una zona", disabled: true}].concat(_.map(_.sortBy(this.zonas, ['nombre']),(value,key) => {
                return { value: value.id, text: value.nombre}
            }))
        },
        sortedModalidades(){
            return [{value: null,text: "Elige una modalidad", disabled: true}].concat(_.map(_.sortBy(this.modalidades, ['nombre']),(value,key) => {
                return { value: value.id, text: value.nombre}
            }))
        }
    },
    methods:{ 
        resetForm(){
            this.inscripcion = _.clone(this.empty)
        },
        onSubmit(){
            this.validandoInscripcion=true;
            this.resetErrors();
            this.inscripcion.cc_concurso_id = this.concurso.id
            this.$axios.post('cc/inscripcion/forzada',this.inscripcion).then( ({data}) => {
                this.$router.push('/cc/inscripcion/'+ data.id)
            }).catch( ({response}) => this.printErrors(response.data))
            .then( () => {
                this.validandoInscripcion=false;
            })
        },
        printErrors(data){
          if(data.message == 'Credentials failed'){
            this.errorMessage = 'Error de autenticación, revisa tus credenciales'
          }else{
            this.errors = data.errors
          }
        },
        resetErrors(){
          this.errors={}
          this.errorMessage=''
        },
        ...mapActions([,'setTitle']),
        setAppTitle(title){
            this.setTitle(title)
        }
    }
}
</script>

<style>

</style>