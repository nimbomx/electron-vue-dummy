<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Nuevo tramite</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/citas/tramites')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="activarTramite">
            <b-form-select size="sm" variant="outline-light" v-model="tramite" :options="tramitesOpts"></b-form-select>
            <button type="submit">Activar Tramite</button>
        </b-form>
        {{ errorMessage }}
        <pre>{{ errors }}</pre>
    </div>



</div>
</template>

<script>
export default {
    data(){
        return {
            tramites:[],
            tramite:null,

            calendario:{
                clave:'',
                titulo:'',
                modulo_id:5
            },
            errors:{},
            errorMessage:''
        }
    },
    computed:{
        tramitesOpts(){
            return [{
                value:null,text:'Tramites', disabled: true
            },
            ..._.map(this.tramites,c => {
                return {
                    value: c.id,
                    text: `${c.numero_rutys}. ${c.nombre}`
                }
            })]
        }
    },
    mounted(){
        this.obtenerTramites()
    },
    methods:{
        obtenerTramites(){
            this.$axios.get('/citas/tramites/inactivos').then( ({data}) => this.tramites = data )
        },
        activarTramite(){
            this.$axios.get(`/citas/tramites/${this.tramite}/activar`, this.calendario).then( () => this.$router.push('/citas/tramites'))
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