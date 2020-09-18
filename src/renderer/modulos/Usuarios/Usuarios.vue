<template>
<div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Usuarios</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="obtenerUsuarios">Actualizar personal</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/nuevo/usuario')">Nuevo usuario</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0">Correo</th>
                        <th class="border-top-0"></th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuarios" :key="usuario.id" >
                        <td>
                            {{ usuario.nombre }}
                            {{ usuario.primer_apellido }}
                            {{ usuario.segundo_apellido }}
                        </td>
                        <td>
                            <div v-if="usuario.acceso">
                                {{ usuario.acceso.email }}
                            </div>
                        </td>
                        <td><a @click="$router.push('/usuario/' + usuario.id)">Editar</a> </td>
                        <td><a @click="eliminar(usuario.id)">Eliminar</a> </td>
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
            usuarios:[]
        }
    },
    mounted(){
        this.setAppTitle('Usuarios');
        this.obtenerUsuarios();
    },
    methods:{
        obtenerUsuarios(){
            this.$axios.get('personal-sct').then( ({data}) => this.usuarios = data )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            if(!confirm('Confirmación')) return false
            this.$axios.delete('personal-sct/' + id).then( () => this.obtenerUsuarios() )
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