<template>
    <div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Concursos</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button lass="mr-1" size="sm" variant="secondary" @click="clearConcurso">Limpiar Concurso</b-button>
                <b-button class="mr-4" size="sm" variant="secondary" @click="actualizarConcurso">Actualizar Concurso</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/nuevo/concurso')">Nuevo Concurso</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">No. concesiones</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="modulo in modulos" :key="modulo.id" >
                        <td>{{ modulo.nombre }}</td>
                        <td>{{ modulo.clave }}</td>
                        <td>{{ modulo.no_concesiones }}</td>
                        <td><a @click="$router.push('/cc/concurso/' + modulo.id)">Editar</a> </td>
                        <td><a @click="eliminar(modulo.id)">Eliminar</a> </td>

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
            modulos:[]
        }
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones - Configuración');
        this.obtenerModulos();
    },
    methods:{
        obtenerModulos(){
            this.$axios.get('cc/concurso').then( ({data}) => this.modulos = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            this.$axios.delete('cc/concurso/' + id).then( () => this.obtenerModulos() )

            //TODO: Mostrar alerta cuando no se pueda eliminar
        },
        ...mapActions(['clearConcurso','setTitle','actualizarConcurso']),
        setAppTitle(title){
            this.setTitle(title)
        }
    }
}

</script>

<style>

</style>