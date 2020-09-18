<template>
<div>

    <b-button style="position:fixed; top:20px; right:20px;" variant="primary" v-if="!printing" @click="print">Imprimir</b-button>
    <component :is="file"></component>
</div>
    
</template>

<script>

const win = require('electron').remote.getCurrentWindow()

export default {
    props:{
        component:[String]
    },
    created(){
        this.$bus=['layout','empty']
        this.$bus=['title','Impresión']
    },
    mounted(){
       //this.print()
    },
    data(){
        return{
            printing:false,
            file: require('@/modulos/'+this.component).default
        }
    },
    methods:{
        print(){
            if(this.printing) return false
            this.printing = true
            console.log('print')
            setTimeout(() => {  
                win.webContents.print({silent:false, printBackground:true});
                console.log('printed')
                //this.$router.push('/calendar')
                setTimeout(() => {  
                    this.printing = false
                    //this.closeWin();
                }, 0);
            }, 0);
        },
        closeWin(){
            win.close();
        }
    }
}
</script>

<style>

</style>