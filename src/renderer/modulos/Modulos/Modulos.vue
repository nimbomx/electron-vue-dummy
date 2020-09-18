<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            Modulos
            <button @click="$router.push('nuevo/modulo')">Nuevo Modulo</button>
        </div>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Id</th>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">Descripción</th>
                        <th class="border-top-0">Personal</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="modulo in modulos" :key="modulo.id" >
                        <td>{{ modulo.id }}</td>
                        <td>{{ modulo.nombre }}</td>
                        <td>{{ modulo.clave }}</td>
                        <td>{{ modulo.descripcion }}</td>
                        <td>{{ modulo.personal_count }}</td>
                        <td><a @click="$router.push('/modulo/' + modulo.id)">Editar</a> </td>
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
        this.setAppTitle('Modulos');
        this.obtenerModulos();
    },
    methods:{
        obtenerModulos(){
            this.$axios.get('modulos').then( ({data}) => this.modulos = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            this.$axios.delete('modulos/' + id).then( () => this.obtenerModulos() )

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