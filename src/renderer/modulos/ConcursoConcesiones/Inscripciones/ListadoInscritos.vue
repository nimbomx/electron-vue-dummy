<template>
    <div class=" d-flex flex-column flex-fill " v-if="concurso" >
         <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Inscripciones - {{ concurso.nombre }}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="warning" @click="$router.push('/cc/nueva/inscripcion/forzada')">Forzar Inscripción</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/nueva/inscripcion')">Nueva Inscripción</b-button>

            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th class="border-top-0">Folio</th>
                        <th class="border-top-0">Gafete</th>
                        <th class="border-top-0">Nombre</th>
                        <th class="border-top-0">Inscripción</th>
                        <th class="border-top-0"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="inscripcion in usuarios" :key="inscripcion.id" >
                        <td>{{ inscripcion.id | folio}}</td>
                        <td v-if="inscripcion.gafete">
                            {{ inscripcion.gafete | folio }}
                        </td>
                        <td v-if="inscripcion.gafete_invalido">
                            <i class="text-muted">{{ inscripcion.gafete_invalido }}</i>
                        </td>
                        <td>
                           
                            {{ inscripcion.nombre }}
                            {{ inscripcion.primer_apellido }}
                            {{ inscripcion.segundo_apellido }}
                        </td>
                        <td v-if="inscripcion.fecha_inscripcion">
                            <b-icon class="mr-2" :variant="inscripcion.inscripcion_procedente ? 'success' : 'danger'" :icon="inscripcion.inscripcion_procedente ? 'check-circle-fill' : 'x-circle-fill'"></b-icon>
                            <small>{{ inscripcion.fecha_inscripcion | moment("DD [de] MMMM [de] Y" )  }}</small>
                        </td>
                        <td v-else>
                            <b-icon variant="warning" icon="exclamation-circle-fill"></b-icon>
                        </td>
                        
                        <td><b-button size="sm" @click="$router.push('/cc/inscripcion/' + inscripcion.id)">Editar</b-button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else class=" d-flex flex-column flex-fill justify-content-center align-items-center">
        <b-alert show class="m-4 text-center">No hay concursos activos</b-alert>
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
            concurso: state => state.CC.concurso,
            usuarios: state => state.CC.inscripciones,
        }),
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones - Inscripciones');
        if(!this.concurso) 
            this.obtenerConcurso();
        else
            this.obtenerUsuarios();
    },
    methods:{
        ...mapActions(['setConcurso','setTitle','actualizarConcurso','setInscripciones']),
        obtenerConcurso(){
            this.actualizarConcurso();
            this.obtenerUsuarios();
        },
        obtenerUsuarios(){
            this.$axios.get('cc/inscripcion').then( ({data}) => this.setInscripciones(data) )
        },
        eliminar(id){
            //TODO: confirmar eliminación
            this.$axios.delete('cc/inscripcion/' + id).then( () => this.obtenerUsuarios() )
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