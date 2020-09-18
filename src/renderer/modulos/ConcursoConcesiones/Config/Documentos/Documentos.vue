<template>
    <div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Documentos</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/concurso/' + id)">Volver</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Etapa</th>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0">Descripción</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody v-if="concurso">
                    <tr v-for="documento in concurso.documentos" :key="documento.id" >
                        <td>{{ documento.etapa }}</td>
                        <td>{{ documento.nombre }}</td>
                        <td>{{ documento.descripcion }}</td>
                        <td><a @click="$router.push('/cc/documento/' + documento.id)">Editar</a> </td>
                        <td><!--<a @click="eliminar(documento.id)">Eliminar</a> --></td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    props:{
        id: [Number,String]
    },
    data(){
        return {
            concurso:{}
        }
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones -  Configuración - Documentos');
        this.obtenerModulos();
    },
    methods:{
        obtenerModulos(){
            this.$axios.get(`cc/concurso/${this.id}/documentos`).then( ({data}) => this.concurso = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            this.$axios.delete('cc/concurso/' + id).then( () => this.obtenerModulos() )

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