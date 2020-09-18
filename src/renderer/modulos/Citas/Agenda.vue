<template>
  <div class="p-4">
    <h3> {{agenda.calendario}}</h3>
    <h4> {{agenda.dia | moment('dddd, DD [de] MMMM [de] YYYY')}}</h4>
    <table class="table table-sm">
        <tbody>
                <tr v-for="evento in agenda.eventos" :key="evento.id" class="border m-1 p-1">
            <td>
                {{evento.title}} <br>
                {{evento.start | moment('h:mm a')}} - 
                {{evento.end| moment('h:mm a')}}
            </td>
            <td>
                <div v-if="evento.cita && evento.cita.tramite">
                    {{ evento.cita.tramite.nombre }}<br>
                    {{ evento.cita.numero_variante }}
                </div>
            </td>
            <td>
                <div v-if="evento.cita">
                    {{ evento.cita.nombre }}<br>
                    {{ evento.cita.telefono }}<br>
                    {{ evento.cita.email }}
                    <!--{{ evento.cita.mensaje }}-->
                </div>
            </td>



    </tr>
        </tbody>
    </table>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {

    computed:{
        ...mapState({
            agenda: state => state.Citas.agenda,
        }),
    }
}
</script>

<style>

</style>