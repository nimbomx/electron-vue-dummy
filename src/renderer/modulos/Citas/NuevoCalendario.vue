<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Nuevo calendario</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/citas/calendarios')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="crearUsuario">
            <input v-model="calendario.clave" placeholder="Clave" required>
            <input v-model="calendario.titulo" placeholder="Titulo" required>
            <button type="submit">Crear Usuario</button>
        </b-form>
        {{ errorMessage }}
        <pre>{{ errors }}</pre>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            calendario:{
                clave:'',
                titulo:'',
                modulo_id:5
            },
            errors:{},
            errorMessage:''
        }
    },
    methods:{
        crearUsuario(){
            this.$axios.post(`/citas/calendarios`, this.calendario).then( () => this.$router.push('/citas/calendarios'))
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