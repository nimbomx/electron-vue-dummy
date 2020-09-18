<template>
    <b-button size="sm" variant="info" :disabled="working" @click="clicked"><span v-if="scanning">Digitalizando</span> <slot v-else>Scann Doc</slot></b-button>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { remote } from 'electron'
const execFile = require('child_process').execFile;
const shellj = require('shelljs');

export default {
    props:{
        doc:[Number,String],
        inscripcionId:[Number,String],
        concursoId:[Number,String],
        desktop:Boolean,
        out:String,
        docId:[Number,String],

       /* 
        doc:[String,Number],
        id:[String,Number],
        do-cId:[String,Number],
        */
    },
   data(){
       return {
           working:false,
           scanning:false,

           output:null,
            prefix:null,
            newdocId:null
       }
   },
   mounted(){
        if(this.desktop){
            this.prefix = remote.app.getPath('desktop')
        }else{
            this.prefix = '/'
        }
        let chain = `${this.out ? this.out + "/" : ""}${this.inscripcionId ? this.inscripcionId + "/" : ""}${this.doc ? this.doc + "/" : ""}`
        this.output = path.join(this.prefix,chain)
         this.$emit('say',this.output)
        //let dir = path.join(remote.app.getPath('desktop'),'/c20/docs/'+this.$options.filters.numFormat(this.folio,'0000')+'/'+this.docKey);
    
    },
   methods:{
       clicked(){
           if(this.working) return false
           this.working = true
            if(this.docId){
                this.newdocId=this.docId
                this.digitalizar()
            }else{
                this.docPresentado()
            }
       },
       docPresentado(){
            let doc = {
                'cc_concurso_id' : this.concursoId,
                'cc_inscripcion_id' : this.inscripcionId,
                'cc_concurso_doc_id' : this.doc
            }
            this.$axios.post('cc/documentos',doc).then( ({data}) => {
                this.newdocId=data.id
                this.$emit('presented',data)
                this.digitalizar()
            })
        },
        digitalizar(){
            this.scanning = true
            this.createDirectory(this.output)
            let file = this.$moment().format('YYYYMMDD_HHmmss')+'.pdf'
            let filepath = (path.join(this.output,file))
            console.log(filepath);
            this.callScanner(filepath)
        },
        callScanner(filepath,){
            let scanner = path.join(__static, 'scanner/TwainConsole.exe')
            //console.log(scanner);
            this.$emit('say','Digitalizando...')
            execFile(scanner, ['filename',filepath,'Duplex', 'true','Resolution','300'], (error, stdout) => {
                if (error) {
                    this.$emit('say',''+error)
                    throw error;
                }else{
                    this.$emit('success',{
                        filepath : ''+filepath,
                        id : this.inscripcionId,
                        doc : this.doc,
                        docId : this.newdocId
                    })
                }
                this.$emit('say',stdout)
                //this.scanning=false;
            });
        },
        createDirectory(dir){
            if (!fs.existsSync(dir)){
                shellj.mkdir('-p', dir);
            }
        },
   }
}
</script>

<style>

</style>