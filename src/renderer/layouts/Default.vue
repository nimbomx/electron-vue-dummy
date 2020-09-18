<template>
  <div id="app" class=" d-flex align-items-stretch ">
    <div v-if="authenticated" class="d-flex align-items-stretch flex-fill bg-light">
      <app-menu ></app-menu>
      <router-view></router-view>  
    </div>
    <div v-else class="d-flex align-items-stretch flex-fill bg-light">
      <login-form/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '@/components/Auth/FormularioAcceso'
import AppMenu from '@/components/Menu/Menu'


  export default {
    name: 'sctslp',
    components:{
      LoginForm,
      AppMenu
    },
    computed:{
      ...mapState({
        authenticated: state => state.App.authenticated,
        token: state => state.App.token
      }),
    },
    data(){
      return {
        
      }
    },
    mounted(){
      if(this.authenticated){
        this.setToken(this.token);
        //this.heartbeat();
        //this.checkUpdates();
      }
      this.setAppTitle('');
      /*

      this.$axios.interceptors.response.use(
      response => {
        return Promise.resolve(response);
      },
      error => {
        let e= error.response
        this.addAlert({
          title: e.status + ' ' + e.statusText || '',
          body:e.data.message,
          //extra:e.data.exception,
        }) 
        return Promise.reject(error);
      }
    );*/


    },
    methods:{
      ...mapActions(['setToken','setTitle']),
      setAppTitle(title){
        this.setTitle(title)
      },
      setLayout(layout){
        console.log(layout)
      }
    }
  }
</script>

<style lang="scss">
html,body{
  height: 100%;
}
#app{
  height: 100%;
}
.fill { 
    min-height: 100%;
}
</style>
