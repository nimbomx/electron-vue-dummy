<template>
  <div class="flex-fill d-flex align-items-center justify-content-center">
    

    <b-card
    title="Formulario de Acceso"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
   <b-card-text>

      <form v-if="!recover.token" @submit.stop.prevent="acceder" class="d-flex flex-column">
            <input class="form-control mb-2" type="email" v-model="credenciales.email" placeholder="Correo electrónico">
            <validation-alert :errors="errors.email" />
            <input v-focus ref="password" class="form-control mb-2" type="password" v-model="credenciales.password" placeholder="Contraseña">
            <button class="btn btn-sm btn-primary" type="submit">Iniciar sesión</button>
        </form>
        <b-alert v-if="errorMessage" show variant="danger">{{ errorMessage }}</b-alert>




        <button class="btn btn-sm btn-link" v-if="!recover.token" @click="restaurarContrasena">¿Olvidó su contraseña?</button>
        <div v-if="recover.token && !user">
          Un código de restauración fue enviado a su correo electrónico
          <form @submit.stop.prevent="restaurar" >
          <input class="form-control text-center" ref="code" v-model="recover.pin" placeholder="C Ó D I G O">
          <validation-alert :errors="errors.pin" />

          </form>
          <a @click.stop.prevent="recover.token = null" href="#">Cancelar</a>
        </div>
        <form v-if="user" @submit.stop.prevent="definirNuevaContrasena">
        <input class="form-control" type="password" ref="newpassword" v-model="nueva.password" placeholder="Nueva contraseña">
        <validation-alert :errors="errors.password" />
        <input class="form-control" type="password" v-model="nueva.password_confirmation" placeholder="Confirmación de contraseña">
        <button class="btn btn-sm btn-primary" type="submit">Establecer contraseña</button>
        </form>
    </b-card-text>

    </b-card>

  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import ValidationAlert from '@/components/ValidationAlert'

  export default {
    name: 'formulario-acceso',
    components:{
      ValidationAlert
    },
    computed:{
        ...mapState({
            lastuser: state => state.App.user,
        }),
    },
    data(){
        return{
            credenciales:{
                email:'',
                password:''
            },
            recover: {
              token:null,
              email:null,
              pin:null
            },
            user:null,
            nueva:{},

            errors:{},
            errorMessage:''
        }
    },
    mounted(){
      this.credenciales.email = this.lastuser ? this.lastuser.email : ''
    },
    methods: {
        ...mapActions(['setAuth','setToken','setUser']),
        acceder () {
          this.resetErrors()
            this.$axios.post('acceso-sct',this.credenciales).then( ({data}) => {
                this.setAuth(true);
                this.setToken(data.token);
                this.setUser(data.user);
            }).catch( ({response}) => this.printErrors(response.data))
        },
        printErrors(data){
          if(data.message == 'Credentials failed'){
            this.errorMessage = 'Error de autenticación, revisa tus credenciales'
          }else{
            this.errors = data.errors
          }
        },
        resetErrors(){
          this.errors={}
          this.errorMessage=''
        },
        restaurarContrasena(){
          this.resetErrors()
          this.recover.email = this.credenciales.email
            this.$axios.post('acceso-sct/restaurar-contrasena',this.credenciales).then( ({data}) => {
                this.recover.token=data;
                setTimeout( () => {
                  this.$refs.code.focus();
                },500)
                //this.nextTick().then( () => {
                  //this.$refs.code.$el.focus(); // para componentes
                //});
                
            }).catch( ({response}) => this.printErrors(response.data))
        },
        restaurar () {
          this.resetErrors()
          this.$axios.put('acceso-sct/restaurar-contrasena',this.recover).then( ({data}) => {
            this.user = data;
            setTimeout( () => {
              this.$refs.newpassword.focus();
            },500)
          }).catch( ({response}) => this.printErrors(response.data))
        },
        definirNuevaContrasena () {
          this.resetErrors()
          let data = this.nueva;
          data['pin'] = this.recover.pin
          data['token'] = this.recover.token
          data['email'] = this.recover.email
          this.$axios.patch('acceso-sct/restaurar-contrasena/'+this.user,data).then( ({data}) => {
            this.user = null;
            this.nueva = {};
            this.credenciales.password = ''
            this.recover = {
              token:null,
              email:null,
              pin:null
            }
            setTimeout( () => {
              this.$refs.password.focus();
            },500)
            /*this.nextTick(() => {
              this.$refs.password.focus();
              //this.$refs.password.$el.focus(); // para componentes
            });*/
          }).catch( ({response}) => this.printErrors(response.data))
        },
    }
  }
</script>

<style>
 
</style>
