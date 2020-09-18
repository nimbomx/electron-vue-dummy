<template>
  <div>
      <b-button :disabled="scanning" @click="scann">Scann</b-button>
  </div>
</template>

<script>

import fs from 'fs'
import path from 'path'
import { remote } from 'electron'
const execFile = require('child_process').execFile;
const shellj = require('shelljs');

export default {
    props:{
        out:String,
        doc:[String,Number],
        id:[String,Number],
        docId:[String,Number],
        desktop:Boolean
    },
    data(){
        return {
            output:null,
            scanning:false,
            prefix:null
        }
    },
    mounted(){
        if(this.desktop){
            this.prefix = remote.app.getPath('desktop')
        }else{
            this.prefix = '/'
        }
        let chain = `${this.out ? this.out + "/" : ""}${this.id ? this.id + "/" : ""}${this.doc ? this.doc + "/" : ""}`
        this.output = path.join(this.prefix,chain)
         this.$emit('say',this.output)
        //let dir = path.join(remote.app.getPath('desktop'),'/c20/docs/'+this.$options.filters.numFormat(this.folio,'0000')+'/'+this.docKey);
    },
    methods:{
        scann(){
            this.scanning=true
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
                        id : this.id,
                        doc : this.doc,
                        docId : this.docId
                    })
                }
                this.$emit('say',stdout)
                this.scanning=false;
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