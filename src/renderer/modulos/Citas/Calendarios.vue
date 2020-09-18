<template>
<div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Citas | Calendarios</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="obtenerCalendarios">Actualizar calendarios</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/citas/nuevo/calendario')">Nuevo calendario</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">Titulo</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="calendario in calendarios" :key="calendario.id" >
                        <td>
                            {{ calendario.clave }}
                        </td>
                        <td>
                            {{ calendario.titulo }}
    
                        </td>
                        <td><a @click="$router.push('/citas/calendario/' + calendario.id)">Editar</a> </td>
                        <!--<td><a @click="eliminar(calendario.id)">Eliminar</a> </td>-->
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
            calendarios:[]
        }
    },
    mounted(){
        this.setAppTitle('Citas | Calendarios');
        this.obtenerCalendarios();
    },
    methods:{
        obtenerCalendarios(){
            this.$axios.get('citas/calendarios').then( ({data}) => this.calendarios = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            if(!confirm('Confirmación')) return false
            this.$axios.delete('citas/calendarios/' + id).then( () => this.obtenerCalendarios() )
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