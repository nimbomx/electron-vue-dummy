<template>
  <div class="d-flex flex-column overflow-auto bg-light border-right " style="widht:180px; min-width:180px;">
    <div class="mb-auto d-flex flex-column overflow-auto py-4 px-2">
      <router-link to="/">Main</router-link>
      <router-link v-if="true/*modulos.includes('calendarios')*/" to="/calendario">Calendario...</router-link>
      
      <small class="text-muted mt-2 text-uppercase">Administración</small>
      <div class="d-flex flex-column pl-2" style="font-size:14px;">
        <router-link v-if="modulos.includes('usuarios')" to="/usuarios">Usuarios</router-link>

        <menu-modulos v-if="modulos.includes('modulos')"/>
        
      </div>

      <menu-catalogos v-if="modulos.includes('catalogos')" />
      <menu-concurso v-if="modulos.includes('concurso-concesiones')" />
      <menu-citas v-if="modulos.includes('citas')" />
    </div>

    <div class="p-2 border-top">
        <b-button @click.stop.prevent="cerrarSesion" variant="light" size="sm" class="w-100 text-left">
          <b-avatar size="sm" class="mr-2"></b-avatar> <span>Cerrar sesión</span>
        </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import MenuConcurso from '@/components/Menu/MenuConcurso'
import MenuCitas from '@/components/Menu/MenuCitas'
import MenuModulos from '@/components/Menu/MenuModulos'
import MenuCatalogos from '@/components/Menu/MenuCatalogos'

  export default {
    name: 'mainmenu',
    components:{
      MenuModulos,
      MenuConcurso,
      MenuCitas,
      MenuCatalogos,

    },
    computed:{
        ...mapState({
            user: state => state.App.user
        }),
        modulos(){
          return _.map(this.user.modulos, 'clave')
        },
    },
    methods:{
      ...mapActions(['setToken','logout']),
        cerrarSesion(){
            this.logout();
        },
    }
}
</script>

<style>

</style>