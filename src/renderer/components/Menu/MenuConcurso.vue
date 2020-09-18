<template>
  <div>
      <small class="text-muted mt-2 text-uppercase">Concurso de <br>Concesiones <span v-if="concurso">({{concurso.clave}})</span></small>
      <div class="d-flex flex-column pl-2" style="font-size:14px;">
        <router-link to="/cc/config">Concursos</router-link>
        <router-link v-if="concurso" to="/cc/calendario">Calendario</router-link>
        <router-link v-if="concurso"  to="/cc/inscripciones">Inscripciones</router-link>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    computed:{
        ...mapState({
            concurso: state => state.CC.concurso,
        })
    },
}
</script>

<style>

</style>