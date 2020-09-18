<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            Direcciones ({{direcciones.length}})
            <button @click="actualizarDirecciones()">Actualizar</button>
        </div>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">ID</th>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">Dirección</th>
                        <th class="border-top-0">Titular</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody v-if="direcciones">
                    <tr v-for="direccion in sortedDirecciones" :key="direccion.id" >
                        <td>
                            <small>{{ direccion.id }}</small>
                        </td>
                        <td>
                            <small>{{ direccion.clave }}</small>
                        </td>
                        <td>
                            {{ direccion.nombre }}
                        </td>
                        <td>
                            {{ direccion.titular ?  direccion.titular.nombre : ''}}
                            {{ direccion.titular ?  direccion.titular.primer_apellido : ''}}
                            {{ direccion.titular ?  direccion.titular.segundo_apellido : ''}}
                        </td>
                        <td><a @click="$router.push('/catalogos/direcciones/direccion/' + direccion.id)">Editar</a> </td>
                        <!--<td><a @click="eliminar(modulo.id)">Eliminar</a> </td>-->
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

        }
    },
    computed:{
        ...mapState({
            direcciones: state => state.Cat.direcciones
        }),
        sortedDirecciones(){
            return _.sortBy(this.direcciones, ['nombre'])
        }
    },
    mounted(){
        this.setAppTitle('Catálogos - Direcciones');
        if(!this.direcciones.length) this.actualizarDirecciones();
    },
    methods:{
        ...mapActions([,'setTitle','actualizarDirecciones']),

        eliminar(id){
            //TODO: confirmar eliminación
            //this.$axios.delete('modulos/' + id).then( () => this.obtenerModulos() )

            //TODO: Mostrar alerta cuando no se pueda eliminar
        },
        
        setAppTitle(title){
            this.setTitle(title)
        }
    }
}

</script>

<style>

</style>