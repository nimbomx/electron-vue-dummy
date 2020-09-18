<template>
    <div class=" d-flex flex-column flex-fill " >
        <div class="p-2 bg-secondary text-white border-bottom">
            <div class="d-flex py-1">
                <div class="mr-auto">
                    Citas - Calendario 
                </div>
                <div class="d-flex">
                    
                    <b-button size="sm" variant="outline-light" class="mr-2" @click="obtenerEventos"><b-icon-arrow-repeat /></b-button>
                    <b-form-select size="sm" variant="outline-light" v-model="calendario" :options="calendariosOpts"></b-form-select>
                    <b-button size="sm" v-if="calendario" variant="outline-light" class="mr-2" @click="imprimir">Imprimir</b-button>
                </div>
            </div>
            <div class="d-flex mt-1">
                <div class="mr-auto">
                    {{ title }}
                </div>

                <b-button-group size="sm" class="mr-2" v-if="calendarApi">
                    <b-button variant="outline-light" v-if="calendarApi.view.type == 'dayGridMonth'" @click="calendarApi.changeView('timeGridWeek')">Semana</b-button>
                    <b-button variant="outline-light" v-if="calendarApi.view.type == 'timeGridWeek'" @click="calendarApi.changeView('dayGridMonth')">Mes</b-button>
                </b-button-group>

                <b-button-group size="sm">
                    <b-button variant="outline-light" @click="prev"><b-icon-arrow-left-short /></b-button>
                    <b-button variant="outline-light" @click="today">Hoy</b-button>
                    <b-button variant="outline-light" @click="next"><b-icon-arrow-right-short /></b-button>
                </b-button-group>
            </div>
        </div>
        <div class="flex-fill overflow-auto ">
            <full-calendar ref="fullCalendar" defaultView="timeGridWeek" :plugins="calendarPlugins" 
                :locale="locale"
                height="parent"
                minTime="8:00:00"
                maxTime="16:00:00"
                :allDaySlot="false"
                :validRange="validRange"
                slotDuration="00:10:00"
                :fixedWeekCount="false"

                :slotLabelFormat="slotLabelFormat"
                :showNonCurrentDates="true"
                :eventLimit="true"
                :nowIndicator="true"
                :weekends="false"
                :businessHours="businessHours"
                :header="false"
                :eventSources="eventosMap" 
                @dateClick="handleDateClick"
                @eventClick="handleEventClick"
            />
        </div>


    <slot-creator :date="date" :sources="calendarios" :source="calendario" @onCreated="eventCreated" />


    <b-modal id="modal-event" :title="evento ? sourceName(evento.calendario_id) : ''" hide-footer >
        <div v-if="evento">
            <p>{{ evento.start | moment("dddd, D [de] MMMM [de] YYYY")}}</p>
            <p>{{ evento.start | moment("h:mma")}} - {{ evento.end | moment("h:mma")}}</p>
            <hr>
            <div v-if="evento.cita" class="p-3 border border-solid border-gray-400">
                <p v-if="evento.cita.tramite">
                    <b>{{evento.cita.tramite.numero_rutys}}. {{evento.cita.tramite.nombre}}</b>
                    <b class="text-muted" v-if="evento.cita.variante"><br>{{evento.cita.variante.numero}}. {{evento.cita.variante.nombre}}</b>
                </p>
                <p>Nombre: <b>{{evento.cita.nombre}}</b></p>
                <p>Teléfono: <b>{{evento.cita.telefono}}</b></p>
                <p>Correo electrónico: <b>{{evento.cita.email}}</b></p>
                <p>Nota:<br> <b>{{evento.cita.mensaje}}</b></p>
            </div>
            <div class="mt-2" v-if="evento.disponible">
                <b-button  v-if="!evento.bloqueado" @click="block(evento.id)">Bloquear</b-button>
                <b-button variant="danger" v-if="!evento.bloqueado" @click="deleteEvent(evento.id)">Eliminar</b-button>
                <b-button  v-if="evento.bloqueado" @click="unblock(evento.id)">Desbloquear</b-button>
            </div>
        </div>
    </b-modal>


    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';

import SlotCreator from '@/modulos/Citas/SlotCreator'

const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

export default {
    layout:{name:'test'},
    components: {
        SlotCreator,
        FullCalendar // make the <FullCalendar> tag available
    },
    computed:{
        ...mapState({
            concurso: state => state.CC.concurso,
            calendarioS: state => state.Citas.calendario,
            calendarios: state => state.Citas.calendarios,
            agenda: state => state.Citas.agenda,
        }),
        eventosMap(){
            return [
                ..._.map(this.eventosBkg, c => {
                    return {
                        id: c.id+"",
                        //events:c.eventos
                        events:_.map(c.eventos, e => {
                            return {
                                allDay: e.allDay,
                                title: e.title,
                                start: e.start,
                                end: e.end,
                                backgroundColor: e.backgroundColor,
                                borderColor: e.borderColor,
                                suspension: e.suspension,
                                rendering: "background"
                            }
                        })
                    }
                }),
                ..._.map(this.eventos, c => {
                    return {
                        id: c.id+"",
                        events:_.map(c.eventos, e => {
                            return {
                                id: e.id,
                                allDay: e.allDay,
                                title: e.title,
                                start: e.start,
                                end: e.end,
                                disponible: e.disponible,
                                bloqueado: e.bloqueado,
                                classNames: ['evento',e.bloqueado ? 'eventoBloqueado' : '', e.disponible ? '' : 'eventoNoDisponible'],
                                cita: e.cita
                            }
                        })
                    }
                })
            ]
            
        },
        calendariosOpts(){
            return [{
                value:null,text:'Todos los calendarios'
            },
            ..._.map(this.calendarios,c => {
                return {
                    value: c.id,
                    text: c.titulo
                }
            })]
        }
    },
    watch:{
      calendario(val){
        if(val){
            this.calendariosActivos=[val]
            this.setCalendario(val)
        }
        else{
            this.calendariosActivos=_.map(this.calendarios, 'id')
            this.setCalendario(null)
        }
        this.obtenerEventos()
      }
    },
    data(){
        return {
            title:'',
            eventosBkg:[],
            eventos:[],
            evento:null,
            calendario:null,
            calendariosActivos:[],

            calendarApi: null,
            locale:esLocale,
            calendarPlugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
            businessHours:{
                daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Friday
                startTime: '8:30', // a start time (8:30am in this example)
                endTime: '14:30', // an end time (2:30pm in this example)
            },
            slotLabelFormat:{
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: false,
                meridiem: 'short',
                hour12: true
            },
            validRange:{
                start: '2020-03-20'
            },
            date: null,
        }
    },
    created(){
        this.$bus=['title','Citas']
    },
    mounted(){
        this.calendario = this.calendarioS
        this.setActivos()
        //this.setAppTitle('Citas');
        this.obtenerCalendarios();
        this.obtenerEventosBkg();

        this.calendarApi =  this.$refs.fullCalendar.getApi()
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
        ...mapActions(['setTitle','actualizarConcurso','setCalendario','setAgenda','setCalendarios']),
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

        obtenerCalendarios(){
            this.$axios.get('citas/calendarios').then( ({data}) => {
                this.setCalendarios(data)
                this.setActivos()
            })
        },
        setActivos(){
            this.calendariosActivos=_.map(this.calendarios, 'id')
            this.obtenerEventos()
        },
        obtenerEventosBkg(){
            this.$axios.post('citas/eventos',{ calendarios:[1]}).then( ({data}) => {this.eventosBkg = data})
        },
        obtenerEventos(){
            this.$axios.post('citas/eventos',{ calendarios:this.calendariosActivos}).then( ({data}) => {
                this.eventos = data
            } )
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
        sourceName(val){
            return _.find(this.calendarios,['id',val]).titulo
        },
        handleDateClick(arg) {
            let date = this.$moment(arg.date)
            if (date < this.$moment().startOf('day')) return false
            if (this.calendarApi.view.type == 'timeGridWeek' && date < this.$moment()) return false
            this.date = {
                'date': date.format('Y-MM-DD')
            }
            if(this.calendarApi.view.type == 'timeGridWeek')this.date.start = date.format('HH:mm') //"dayGridMonth"
            this.$bvModal.show('modal-date')
        },
        handleEventClick(info) {
            if(!info.event.id) return false
            this.$axios.get('citas/eventos/'+info.event.id)
            .then( ({data}) => {
                this.evento = data
                this.$bvModal.show('modal-event')
            })
        },
        hideModal(){
            this.$bvModal.hide('modal-event')
            this.$bvModal.hide('modal-date')
        },
        eventCreated(){
            //this.calendarApi.refetchEvents()
            this.obtenerEventos()
            this.hideModal()
        },
        deleteEvent(id){
            this.$axios.delete('citas/eventos/'+id)
            .then( () => {
                this.obtenerEventos()
                this.hideModal()
            })
        },
        block(id){
            this.$axios.put('citas/eventos/'+id+'/block')
            .then( () => {
                this.obtenerEventos()
                this.hideModal()
            })
        },
        unblock(id){
            this.$axios.put('citas/eventos/'+id+'/unblock')
            .then( () => {
                this.obtenerEventos()
                this.hideModal()
            })
        },
        imprimir(){
            this.$axios.post('citas/eventos',{ 
                calendarios:[this.calendario],
                start:this.$moment().format('YYYY-MM-DD') + ' 00:00:01',
                end:this.$moment().format('YYYY-MM-DD') + ' 23:59:59'
                }).then( ({data}) => {
                this.setAgenda({
                    calendario: _.find(this.calendarios,['id',this.calendario]).titulo,
                    eventos: data[0].eventos,
                    dia:this.$moment().format('YYYY-MM-DD')
                })

                console.log(this.agenda)
                let component = 'Citas/Agenda'
                const modalPath = process.env.NODE_ENV === 'development'
                    ? 'http://localhost:9080/#/imprimir/'+component
                    : `file://${__dirname}/index.html#imprimir/${component}`
                let win = new BrowserWindow({ width: 800, height: 600, webPreferences: {webSecurity: false} })
                win.on('close', function () { win = null })
                win.loadURL(modalPath)

            })

        }
    }
}

</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.evento{
    color: white !important;
}
.eventoBloqueado{
    color: black !important;
    background: rgb(185, 185, 185);
    border-color: darken(rgb(185, 185, 185),10);
}
.eventoNoDisponible{
    color: black !important;
    background: rgb(66, 245, 191);
    border-color: darken(rgb(66, 245, 191),10);
}
</style>