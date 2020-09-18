<template>
<div class=" d-flex flex-column flex-fill " >
    <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
        <b-navbar-brand>Nuevo usuario</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" variant="secondary" @click="$router.push('/usuarios')">Cancelar</b-button>
        </b-navbar-nav>
    </b-navbar>

    <div class="flex-fill overflow-auto p-4">
        <b-form @submit.stop.prevent="crearUsuario">
            <input v-model="persona.nombre" placeholder="nombre *" required>
            <input v-model="persona.primer_apellido" placeholder="Primer apellido *" required>
            <input v-model="persona.segundo_apellido" placeholder="Segundo apellido">
            <!--<input v-model="persona.email" placeholder="email">
            <input v-model="persona.password" placeholder="password">
            <input v-model="persona.password_confirmation" placeholder="password_confirmation">-->
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
            persona:{},
            errors:{},
            errorMessage:''
        }
    },
    methods:{
        crearUsuario(){
            this.$axios.post(`/personal-sct`, this.persona).then( () => this.$router.push('/usuarios'))
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