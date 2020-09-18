<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Editar calendario {{id}}</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/citas/calendarios')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="actualizarUsuario">
            <input v-model="calendario.clave" placeholder="Clave" required>
            <input v-model="calendario.titulo" placeholder="Titulo" required>
            <button type="submit">Actualizar Usuario</button>
        </b-form>
        {{ errorMessage }}
        <pre>{{ errors }}</pre>
    </div>
</div>
</template>

<script>
export default {
    props:{
        id:[Number,String]
    },
    data(){
        return {
            calendario:{},
            errors:{},
            errorMessage:''
        }
    },
    mounted(){
        this.$axios.get(`/citas/calendarios/${this.id}`).then( ({data}) => this.calendario = data)
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
    },
    methods:{
        actualizarUsuario(){
            this.$axios.put(`/citas/calendarios/${this.id}`, this.calendario).then( () => this.$router.push('/citas/calendarios'))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        }
    }
}
</script>

<style>

</style>