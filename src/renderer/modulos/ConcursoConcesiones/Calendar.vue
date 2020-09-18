<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            
            Concurso de Concesiones - Calendario 
            
            <div class="d-flex">
                <div class="mr-auto pt-1">
                    {{ title }}
                </div>
                <b-button-group size="sm">
                    <b-button variant="outline-light" @click="prev">Anterior</b-button>
                    <b-button variant="outline-light" @click="today">Hoy</b-button>
                    <b-button variant="outline-light" @click="next">Siguiente</b-button>
                </b-button-group>
            </div>

        </div>

        <div class="flex-fill overflow-auto ">
            <full-calendar ref="fullCalendar" defaultView="dayGridMonth" :plugins="calendarPlugins" 
                locale="es"
                height="parent"
                :header="false"
                :eventSources="defaultEventSources" 
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    computed:{
        ...mapState({
            concurso: state => state.CC.concurso,
        }),
    },
    data(){
        return {
            title:'',
            calendarApi: null,
            calendarPlugins: [ dayGridPlugin ],
            /*calendarOptions: {
                plugins: [ dayGridPlugin ],
                initialView: 'dayGridMonth',
                //defaultView:"dayGridMonth",
                headerToolbar:false,
                //header:false,
                locale: 'es',
            }*/
            defaultEventSources: [
                {
                    id:0,
                    url:config.apiPath + '/calendario/1/eventos/bkg',
                    method:'POST',
                    color:'green',
                    failure: function() {
                        alert('there was an error while fetching events!');
                    },
                }
            ],
        }
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones');
        this.calendarApi =  this.$refs.fullCalendar.getApi()
        this.obtenerFecha();
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            this.onResize()
        })
        if(!this.concurso){
            this.actualizarConcurso();
        }
        if(this.concurso && this.concurso.calendario){
            this.defaultEventSources.push({
                    id:1,
                    url:config.apiPath + '/calendario/' + this.concurso.calendario.id+ '/eventos',
                    method:'POST',
                    color:'blue',
                    failure: () => {
                        alert('Ha ocurrido un error obteniendo los eventos del ' +this.concurso.nombre+ '!');
                    },
                })
        }
    },
    beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
    },
    methods:{
        ...mapActions(['setTitle','actualizarConcurso']),
        setAppTitle(title){
            this.setTitle(title)
        },
        onResize() {
            /*
            this.windowWidth = window.innerWidth

          if(window.innerWidth < 550 ){
            this.calendarApi.changeView('timeGridSmall')
          }else if(window.innerWidth < 850 ){
            this.calendarApi.changeView('timeGridMd')
          }else{
            this.calendarApi.changeView('timeGridWeek')
          }
            */
        },
        obtenerFecha(){
            this.title = this.calendarApi.formatDate(this.calendarApi.getDate(), {
                month: 'long',
                year: 'numeric'
            });
        },
        today(){
          this.calendarApi.today()
          this.obtenerFecha()
        },
        next(){
          this.calendarApi.next()
          this.obtenerFecha()
        },

        prev(){
          this.calendarApi.prev()
          this.obtenerFecha()
        },
    }
}

</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>