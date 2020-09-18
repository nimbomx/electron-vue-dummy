<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            Municipios de San Luis Potosí <sup>24</sup> ({{municipios.length}})
            <button @click="actualizarMunicipios()">Actualizar</button>
        </div>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">ID</th>
                        <th class="border-top-0">Municipio</th>
                        <th class="border-top-0">Zona</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody v-if="municipios">
                    <tr v-for="municipio in sortedMunicipios" :key="municipio.id" >
                        <td>
                            <small>{{ municipio.id }}</small>
                        </td>
                        <td>
                            {{ municipio.nombre }}
                            <small class="text-muted">{{ municipio.clave_municipio }}</small>
                        </td>
                        <td>
                            <small class="text-muted">{{ municipio.zona_id }}</small>
                        </td>
                        <td><a @click="$router.push('/catalogos/municipios/municipio/' + municipio.id)">Editar</a> </td>
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
            municipios: state => state.Cat.municipios
        }),
        sortedMunicipios(){
            return _.sortBy(this.municipios, ['nombre'])
        }
    },
    mounted(){
        this.setAppTitle('Catálogos - Municipios');
        if(!this.municipios.length) this.actualizarMunicipios();
    },
    methods:{
        ...mapActions([,'setTitle','actualizarMunicipios']),

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