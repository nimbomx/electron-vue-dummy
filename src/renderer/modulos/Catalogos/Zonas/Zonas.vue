<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            Zonas ({{zonas.length}})
            <button @click="actualizarZonas()">Actualizar</button>
        </div>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">ID</th>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">Zona</th>
                        <th class="border-top-0">Descripción</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody v-if="zonas">
                    <tr v-for="zona in sortedZonas" :key="zona.id" >
                        <td>
                            <small>{{ zona.id }}</small>
                        </td>
                        <td>
                            <small>{{ zona.clave }}</small>
                        </td>
                        <td>
                            {{ zona.nombre }}
                        </td>
                        <td>
                            <small class="text-muted">{{ zona.descripcion }}</small>
                        </td>
                        <td><a @click="$router.push('/catalogos/zonas/zona/' + zona.id)">Editar</a> </td>
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
            zonas: state => state.Cat.zonas
        }),
        sortedZonas(){
            return _.sortBy(this.zonas, ['nombre'])
        }
    },
    mounted(){
        this.setAppTitle('Catálogos - Zonas');
        if(!this.zonas.length) this.actualizarZonas();
    },
    methods:{
        ...mapActions([,'setTitle','actualizarZonas']),

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