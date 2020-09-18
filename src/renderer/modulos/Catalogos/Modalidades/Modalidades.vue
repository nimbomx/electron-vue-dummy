<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            Modalidades ({{modalidades.length}})
            <button @click="actualizarModalidades()">Actualizar</button>
        </div>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">ID</th>
                        <th class="border-top-0">Clave</th>
                        <th class="border-top-0">Modalidad</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody v-if="modalidades">
                    <tr v-for="modalidad in sortedModalidades" :key="modalidad.id" >
                        <td>
                            <small>{{ modalidad.id }}</small>
                        </td>
                        <td>
                            <small>{{ modalidad.clave }}</small>
                        </td>
                        <td>
                            {{ modalidad.nombre }}
                            <small class="text-muted">{{ modalidad.alias }}</small>
                        </td>
                        <td><a @click="$router.push('/catalogos/modalidades/modalidad/' + modalidad.id)">Editar</a> </td>
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
            modalidades: state => state.Cat.modalidades
        }),
        sortedModalidades(){
            return _.sortBy(this.modalidades, ['nombre'])
        }
    },
    mounted(){
        this.setAppTitle('Catálogos - Modalidades');
        if(!this.modalidades.length) this.actualizarModalidades();
    },
    methods:{
        ...mapActions([,'setTitle','actualizarModalidades']),

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