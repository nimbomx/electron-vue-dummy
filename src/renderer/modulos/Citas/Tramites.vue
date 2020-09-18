<template>
<div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Citas | Tramites</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="obtenerTramites">Actualizar tramites</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/citas/nuevo/tramite')">Nuevo tramite</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">RUTyS</th>
                        <th class="border-top-0">Tramite</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0">Ubicaciones</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tramite in tramites" :key="tramite.id" >
                        <td>
                            {{ tramite.numero_rutys }}
                        </td>
                        <td>
                            <div v-if="tramite.direccion"><small class="text-muted">{{ tramite.direccion.nombre }}</small></div>
                            {{ tramite.nombre }} <b-badge v-if="tramite.variantes_count">{{tramite.variantes_count}}</b-badge>
    
                        </td>
                        <td><b-badge v-if="tramite.tipo" :variant="tramite.tipo == 'concesionario' ? 'info' : 'primary'">{{tramite.tipo}}</b-badge></td>
                        <td>
                            <small>
                            <ul class="m-0">
                                <li class="mx-0" v-for="calendario in tramite.calendarios" :key="calendario.id">
                                    {{calendario.titulo}} ({{calendario.pivot.duracion}} mins)
                                </li>
                            </ul>
                            </small>
                        </td>
                        <td><a @click="$router.push('/citas/tramite/' + tramite.id)">Editar</a> </td>
                        <!--<td><a @click="eliminar(tramite.id)">Eliminar</a> </td>-->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return {
            tramites:[]
        }
    },
    mounted(){
        this.setAppTitle('Citas | Tramites');
        this.obtenerTramites();
    },
    methods:{
        obtenerTramites(){
            this.$axios.get('citas/tramites').then( ({data}) => this.tramites = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            if(!confirm('Confirmación')) return false
            this.$axios.delete('citas/tramites/' + id).then( () => this.obtenerTramites() )
            //TODO: Mostrar alerta cuando no se pueda eliminar
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