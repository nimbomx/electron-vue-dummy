<template>
  <div class=" d-flex flex-column flex-fill overflow-auto" >
      <main class="p-2">
        <div class="left-side">
            <span class="title">
            Main
            </span>
        </div>

        <div>
            <button class="btn btn-sm btn-secondary" @click="obtenerUsuario">Probar Token</button>
            <pre>{{ usuario }}</pre>
 
        </div>
    </main>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

  export default {
    name: 'formulario-acceso',
    data(){
        return{
            usuario:{}
        }
    },
    mounted(){
        this.setAppTitle('');
    },
    computed:{
        ...mapState({
            user: state => state.App.user,
        }),
    },
    methods: {
        ...mapActions([,'setTitle']),
        setAppTitle(title){
            this.setTitle(title)
        },
        obtenerUsuario(){
            this.usuario = {}
            this.$axios.get('acceso-sct/usuario').then( ({data}) => {
                this.usuario = data
            })
        },
        
    }
  }
</script>
