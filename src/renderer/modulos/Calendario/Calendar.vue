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
            defaultEventSources:[
                {
                    id:"0",
                    events:[
                        {
                        title  : 'event1',
                        start  : '2020-07-01'
                        },
                        {
                        title  : 'event2',
                        start  : '2020-07-05',
                        end    : '2020-07-07'
                        },
                        {
                        title  : 'event3',
                        start  : '2020-07-09T12:30:00',
                        allDay : false // will make the time show
                        }
                    ]
                }
                
            ],
            events:[

            ],
            /*defaultEventSources: [
                {
                    id:0,
                    url:config.apiPath + '/calendario/1/eventos',
                    method:'POST',
                    color:'green',
                    failure: function() {
                        alert('there was an error while fetching events!');
                    },
                },
            ],*/
        }
    },
    mounted(){
        this.setAppTitle('Concurso de Concesiones');
        this.calendarApi =  this.$refs.fullCalendar.getApi()
       this.getEvents()
        this.obtenerFecha();
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
            this.onResize()
        })
    },
    beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
    },
    methods:{
        ...mapActions([,'setTitle']),
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
          this.refe()
          this.obtenerFecha()
        },

        prev(){
          this.calendarApi.prev()
          this.obtenerFecha()
        },
        getEvents(){
             this.$axios.post(`/graphql/calendario`,{
            query: `
                {
                    eventos(calendario_id: 1) {
                        start
                        end
                        title 
                        allDay
                        backgroundColor
                        borderColor
                        textColor
                        rendering
                    }
                }
            `
        }).then( ({data}) => {
            this.events= (data.data.eventos)
            this.calendarApi.addEventSource({
                id:1,
                events:this.events
            })
        })
        },
        refe(){
            let eventSources =(this.calendarApi.getEventSources())
            eventSources.forEach(event => {
                console.log(event)
                event.remove()
            });
            this.getEvents()
        }
    }
}

</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>