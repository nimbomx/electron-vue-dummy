<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Editar tramite {{id}}</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/catalogos/tramites')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="actualizarTramite">
            <b-form-select size="sm" variant="outline-light" v-model="tramite.direccion_id" :options="direccionOpts"></b-form-select>
            <input v-model="tramite.numero_rutys" placeholder="RUTyS" required>
            <input v-model="tramite.nombre" placeholder="Nombre" required>
            <b-form-select size="sm" variant="outline-light" v-model="tramite.tipo" :options="tiposOpts"></b-form-select>
            <button type="submit">Actualizar Tramite</button>
        </b-form>
        <div class="m-2 p-2 border" v-if="tramite.variantes.length">
            <h6>Variantes</h6>
            <div v-for="variante in tramite.variantes" :key="variante.id">
                {{variante.nombre }}
            </div>
        </div>
        {{ errorMessage }}
        <pre>{{ errors }}</pre>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props:{
        id:[Number,String]
    },
    data(){
        return {
            tramite:{},
            errors:{},
            errorMessage:'',
            tiposOpts:[
                {value:null,text:'Elige un tipo de destinatario',disabled:true},
                {value:'concesionario',text:'Concesionario'},
                {value:'operador',text:'Operador'},
            ]
        }
    },
    computed:{
        ...mapState({
            direcciones: state => state.Cat.direcciones
        }),
        direccionOpts(){
            return [{
                value:null,text:'Dirección'
            },
            ..._.map(this.direcciones,d => {
                return {
                    value: d.id,
                    text: d.nombre
                }
            })]
        }
    },
    mounted(){
        this.$axios.get(`/catalogos/tramites/${this.id}`).then( ({data}) => this.tramite = data)
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
    },
    methods:{

        actualizarTramite(){
            this.$axios.put(`/catalogos/tramites/${this.id}`, this.tramite).then( () => this.$router.push('/catalogos/tramites'))
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