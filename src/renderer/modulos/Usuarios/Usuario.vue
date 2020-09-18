<template>
    <div class=" d-flex flex-column flex-fill " >
        <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand>Editar usuario</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="$router.push('/usuarios')">Cancelar</b-button>
            </b-navbar-nav>
        </b-navbar>

        <div v-if="persona" class="flex-fill overflow-auto p-4">
            <b-form @submit.stop.prevent="actualizarUsuario">

                <input v-model="persona.nombre" placeholder="nombre *" required>
                <input v-model="persona.primer_apellido" placeholder="Primer apellido *" required>
                <input v-model="persona.segundo_apellido" placeholder="Segundo apellido">
                <!--<input v-model="persona.email" placeholder="email">-->
                <button type="submit">Actualizar Usuario</button>
            </b-form>
            <!--<b-form @submit.stop.prevent="actualizarContrasena">
                <input v-model="pass.oldpassword" placeholder="oldpassword">
                <input v-model="pass.password" placeholder="password">
                <input v-model="pass.password_confirmation" placeholder="password_confirmation">
                <button type="submit">Actualizar Usuario</button>
            </b-form>-->

            <!--<h3>Modulos</h3>
            <pre>{{ persona.modulos}}</pre>-->
            <hr>
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
            persona:{},
            errors:{},
            errorMessage:'',
            pass:{}
        }
    },
    mounted(){
        this.$axios.get(`/personal-sct/${this.id}`).then( ({data}) => this.persona = data)
    },
    methods:{
        actualizarUsuario(){
            this.$axios.put(`/personal-sct/${this.id}`, this.persona).then( () => this.$router.push('/usuarios'))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        },
        /*actualizarContrasena(){
            this.$axios.put(`/personal-sct/${this.id}/password`, this.pass).then( () => this.$router.push('/usuarios'))
            .catch( e => {
                this.errors = e.response.data.errors
                this.errorMessage = e.response.data.message
            })
        }*/
    }
    
}
</script>

<style>

</style>