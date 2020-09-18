<template>
    <div class=" d-flex flex-column flex-fill " >
         <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand  class="align-self-center">Buscar Operador ({{ operadores.length }})</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="obtenerOperadores()">Actualizar</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/inscripciones')">Cancelar</b-button>

            </b-navbar-nav>
        </b-navbar>

        <div class="p-2">
            <b-input-group>
                <b-form-input v-focus placeholder="Buscar operador" ref="search" v-model="term"  @keydown.enter="search" @keydown.esc="clearSearch" />
                <b-input-group-append>
                <b-button @click="search" variant="outline-info">Buscar</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>


        <div class="flex-fill overflow-auto ">
            <b-overlay :show="searching" rounded="sm">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Gafete</th>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="operador in searchResultsFiltered" :key="operador.id" >
                        <td>{{ operador.gafete | folio }}</td>
                        <td>{{ operador.nombre }}</td>
                        <td>
                            <span v-if="operador.inscrito">Inscrito</span>
                            <b-button v-else @click="inscribir(operador)" size="sm">Inscribir</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </b-overlay>
        </div>

        <b-modal id="modal-1" title="Detalles del operador">
            <div v-if="operador" class="my-4">
                <div>Gafete: <b>{{ operador.gafete | folio }}</b></div>
                <div>Nombre: <b>{{ operador.nombre }}</b></div>
                <div>Fecha de registro: <b v-if="operador.fecha_registro">{{ operador.fecha_registro | moment("DD [de] MMMM [de] Y" ) }}</b></div>
                <div>Zona: <b v-if="operador.zona">{{ operador.zona.nombre }}</b></div>
                <div>Municipio: <b v-if="operador.municipio">{{ operador.municipio.nombre }}</b></div>
                <div>Modalidad: <b v-if="operador.modalidad">{{ operador.modalidad.nombre }}</b></div>
            </div>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <validation-alert :errors="errors.gafete" />
                    <validation-alert :errors="errors.zona_id" />
                    <validation-alert :errors="errors.municipio_id" />
                    <validation-alert :errors="errors.modalidad_id" />
                <b-button
                    :disabled="validandoInscripcion"
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="iniciarInscripcion()"
                >
                    Iniciar inscripción
                </b-button>
                </div>
            </template>
        </b-modal>


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
            //operadores:[],
            operador:null,
            searching:false,
            term:null,
            searchResults:[],
            options:{ 
                keys: [{name: 'nombre'}] ,
                shouldSort:true,
                distance: 60,
                findAllMatches: false,
                tokenize: true,
                matchAllTokens:true
            },
            validandoInscripcion:false,

            errors:{},
            errorMessage:''
        }
    },

    computed:{
        ...mapState({
            operadores: state => state.CC.operadores,
            inscripciones: state => state.CC.inscripciones,
            concurso: state => state.CC.concurso,
        }),
        gafetesInscritos(){
            return _.map(this.inscripciones,'gafete')
        },
        searchResultsFiltered(){
            return _.map(this.searchResults, (r) => {
                if(this.gafetesInscritos.includes(r.gafete)) { r.inscrito = 1 }
                return r;
            });
        }
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones - Buscar Operador');
        if(!this.operadores.length) this.obtenerOperadores();
    },
    methods:{
        ...mapActions(['setOperadores','setTitle']),
        obtenerOperadores(){
            this.$axios.get('cc/operadores').then( ({data}) => this.setOperadores(data) )
        },
        inscribir(operador){
            this.resetErrors();
            this.operador = operador
            this.$bvModal.show('modal-1')
        },
        iniciarInscripcion(){
            this.validandoInscripcion=true;
            this.resetErrors();
            this.operador.cc_concurso_id = this.concurso.id
            this.$axios.post('cc/inscripcion',this.operador).then( ({data}) => {
                this.$bvModal.hide('modal-1')
                this.$router.push('/cc/inscripcion/'+ data.id)
            }).catch( ({response}) => this.printErrors(response.data))
            .then( () => {
                this.validandoInscripcion=false;
            })
        },
        //Search
        clearSearch(){
            this.searchResults = []
            this.term = null;
        },
        search(){
            if(!this.term) {
                this.searchResults = [];
                return 
            }
            this.searching = true
            let term = this.term;
            setTimeout( () => {
                if(isNaN(this.term)){
                this.$search(this.term, this.operadores, this.options).then(results => {
                    this.searchResults = results
                    this.searching = false
                })
                }else{
                    this.searchResults = (_.filter(this.operadores, (o) => {
                        return o.gafete === (this.term*1)
                    }))
                    this.searching = false
                }
            },300)

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

        //App
        setAppTitle(title){
            this.setTitle(title)
        }
    }
}

</script>

<style>

</style>