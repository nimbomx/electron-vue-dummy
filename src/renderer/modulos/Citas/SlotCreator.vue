<template>
  <b-modal id="modal-date" :title="date ? ($moment(date.date).format('dddd, D [de] MMMM [de] YYYY')) : ''" hide-footer>
      <form v-if="date" @submit.stop.prevent="createEvent()">
         <b-form-select size="sm" variant="outline-light" v-model="calendario" :options="calendariosOpts" @change="actualizarDuracion"></b-form-select>
        <hr>
        <input class="p-2 bg-white border border-gray-700 border-solid" v-model="date.start" type="time">
        <input class="p-2 bg-white border border-gray-700 border-solid" v-model="date.end" type="time">
        <input class="p-2 bg-white border border-gray-700 border-solid" v-model="duracion" type="number" placeholder="duración">
        <hr>
        <div class="text-right">
            <b-btn variant="primary" type="submit" :disabled="!cancreate" >Crear ({{noslots}})</b-btn>
        </div>

      </form>
    </b-modal>
</template>

<script>
export default {
    props:{
        sources:{
            type:Array,
            required: true
        },
        source:{
            type:[Number,String],
            required: false
        },
        date:{
            type:Object,
            required: false
        }
    },
    watch:{
        source(){
            this.calendario = this.source
            this.duracion = _.find(this.sources,['id',this.source]).duracion
        }
    },
    computed:{
        calendariosOpts(){
            return [{
                value:null,text:'Todos los calendarios'
            },
            ..._.map(this.sources,c => {
                return {
                    value: c.id,
                    text: c.titulo
                }
            })]
        },
        cancreate(){
            return !!this.date.start && !!this.duracion && !!this.calendario && this.noslots > 0
        },
        noslots(){
            if(this.date.start && this.date.end && this.duracion){
                let start = this.$moment(this.date.start,"HH:mm")
                let end = this.$moment(this.date.end,"HH:mm")
                return Math.floor(end.diff(start, 'minutes')/this.duracion)
            }
            
            return 1
        }
    },
    data(){
        return{
            duracion:20,
            calendario:null,
            busy:false,
            //selectedSource:null,
        }
    },
    methods:{
        actualizarDuracion(){
            this.duracion = _.find(this.sources,['id',this.calendario]).duracion
        },
        createEvent(){
            if(this.busy)return false
            this.busy=true
            let slots = []
            let start = this.$moment(`${this.date.date}  ${this.date.start}`,"YYYY-MM-DD HH:mm")
            for(let i = 0; i < this.noslots; i++ ){
                slots.push({
                    calendario_id:this.calendario,
                    start:start.format('YYYY-MM-DD HH:mm'),
                    end:start.add(this.duracion,'minutes').format('YYYY-MM-DD HH:mm'),
                    duracion:this.duracion,
                    title:'Disponible',
                    created_at:this.$moment().format('YYYY-MM-DD HH:mm'),
                    updated_at:this.$moment().format('YYYY-MM-DD HH:mm'),
                });
            }
            this.$axios.post('citas/eventos/insert',{slots})
            .then( ({data}) => {
                this.$emit('onCreated');
            }).catch().then( () => {
                this.busy = false
            })
        }
    }
}
</script>

<style>

</style>