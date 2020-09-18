<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Editar tramite {{id}}</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/citas/tramites')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-button variant="danger" size="sm" class="mb-2" @click="desactivarTramite">Desactivar Tramite</b-button>
        <div>
            <div>RUTyS: <b>{{ tramite.numero_rutys }}</b></div>
            <div>Tramite: <b>{{ tramite.nombre }}</b> <b-badge v-if="tramite.tipo" :variant="tramite.tipo == 'concesionario' ? 'info' : 'primary'">{{tramite.tipo}}</b-badge></div>
            <b-button size="sm" @click="cargarRequisitos(tramite)">requisitos</b-button> {{tramite.requisitos ? 'ok' : ''}}
        </div>
        <div class="m-2 p-2 border" v-if="tramite.variantes && tramite.variantes.length">
            <h6>Variantes</h6>
            <div v-for="variante in tramite.variantes" :key="variante.id">
                {{variante.nombre }} <b-button size="sm" @click="cargarRequisitos(tramite,variante)">requisitos</b-button> {{variante.requisitos ? 'ok' : ''}}
            </div>
        </div>
        <hr>
        <div class="row w-100">
            
            <div class="m-2 p-2 border col">
                <div v-for="calendario in calendariosDiff" :key="calendario.id">
                    {{ calendario.titulo }} <a href="#" @click.prevent="definirDuracion(calendario)"><b-icon-plus /></a>
                </div>
            </div>
            <div class="m-2 p-2 border col">
                <div v-for="calendario in tramite.calendarios" :key="calendario.id">
                    {{ calendario.titulo }} ({{calendario.pivot.duracion}} mins)<a href="#" @click.prevent="detach(calendario.id)"><b-icon-trash /></a>
                </div>
            </div>
        </div>

        <!--<b-form @submit.stop.prevent="actualizarUsuario">
            

            <button type="submit">Actualizar Usuario</button>
        </b-form>-->
        {{ errorMessage }}
        <pre>{{ errors }}</pre>
    </div>
        <b-modal id="modal-duracion" :title="calendario ? calendario.titulo : ''" hide-footer >
        <div v-if="calendario">
            <b-form @submit.prevent.stop="attach">
                <b-form-group
                    label="Duración:"
                    label-for="input-1"
                    description="Duración en minutos de la cita"
                >
                    <b-form-input
                    id="input-1"
                    v-model="duracion"
                    type="number"
                    required
                    placeholder="Duración"
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" size="sm" variant="primary">Agregar</b-button>
            </b-form>
        </div>
    </b-modal>
    <b-modal id="modal-carga-requisitos" :title="`Requisitos para ${tramite.nombre}`" hide-footer >
        <CargaRequisitosModal v-if="dropURL" :url="dropURL" :token="token" :tramite="tramite" :variante="variante" />
    </b-modal>
</div>
</template>

<script>
import { mapState } from 'vuex'
import CargaRequisitosModal from './CargaRequisitosModal'
export default {
    props:{
        id:[Number,String]
    },
    components:{
        CargaRequisitosModal
    },
    data(){
        return {
            variante:{},
            tramite:{},
            calendarios:[],
            calendario:null,
            duracion:20,
            errors:{},
            errorMessage:'',

            dropURL:false
        }
    },
    computed:{
        calendariosDiff(){
            return _.differenceBy(this.calendarios,this.tramite.calendarios,'id')
        },
        ...mapState({
            token: state => state.App.token,
        }),
    },
    mounted(){
        this.obtenerTramite()
        this.obtenerCalendars();
    },
    methods:{
        obtenerTramite(){
            this.$axios.get(`/citas/tramites/${this.id}`).then( ({data}) => this.tramite = data)
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },
        obtenerCalendars(){
            this.$axios.get('citas/calendarios').then( ({data}) => this.calendarios = data )
        },
        desactivarTramite(){
            this.$axios.get(`/citas/tramites/${this.id}/desactivar`, this.tramite).then( () => this.$router.push('/citas/tramites'))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },
        definirDuracion(calendar){
            this.calendario = calendar
            this.$bvModal.show('modal-duracion')
            /**/
        },
        attach(){
            this.$axios.put(`/citas/tramites/${this.id}/attach`, {calendar_id:this.calendario.id,duracion:this.duracion}).then( ({data}) => {
                this.tramite = data
            })
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            }).then( () => {
                this.$bvModal.hide('modal-duracion')
            } )
        },
        detach(id){
            this.$axios.put(`/citas/tramites/${this.id}/detach`, {calendar_id:id}).then( ({data}) => {
                this.tramite = data
            })
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },
        actualizarUsuario(){
            this.$axios.put(`/citas/tramites/${this.id}`, this.tramite).then( () => this.$router.push('/citas/tramites'))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },
        cargarRequisitos(tramite,variante=null){
            //this.$refs.myVueDropzone.dropzone.options.url = `${window.config.apiPath}/${this.tramite.id}/${this.variante ? this.variante.id+'/' : '' }cargar-requisitos`
            //this.$refs.myVueDropzone.dropzone.options.headers = {Authorization: `bearer ${this.token}`}
            this.tramite = tramite
            this.variante = variante
            this.dropURL=`${window.config.apiPath}/citas/tramites/${this.tramite.id}/${this.variante ? this.variante.id+'/' : '' }cargar-requisitos`
            
            this.$bvModal.show('modal-carga-requisitos')
        },
    }
}
</script>

<style>

</style>