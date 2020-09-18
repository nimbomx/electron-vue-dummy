<template>
    <div class=" d-flex flex-column flex-fill " >
         <b-navbar variant="secondary" type="dark" class="px-4 py-0" style="min-height:40px; height:40px">
            <b-navbar-brand  class="align-self-center">Inscripción {{ id | folio }}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" variant="secondary" @click="obtenerInscripcion">Actualizar</b-button>
                <b-button size="sm" variant="secondary" @click="$router.push('/cc/inscripciones')">Volver</b-button>

            </b-navbar-nav>
        </b-navbar>

        <div class="flex-fill overflow-auto ">
            <b-button size="sm" variant="light" @click="clearCCScannedFile">ClearScannTail</b-button>
            <hr>
            <div v-if="inscripcion" class="p-4">

                <div class="row">
                    <div class="col">
                        <div>Inscripción procedente: 
                            <b-icon v-if="inscripcion.fecha_inscripcion" :variant="inscripcion.inscripcion_procedente ? 'success' : 'danger'" :icon="inscripcion.inscripcion_procedente ? 'check-circle-fill' : 'x-circle-fill'"></b-icon>
                            <b-icon v-else :variant="inscripcion.inscripcion_procedente ? 'success' : 'warning'" :icon="inscripcion.inscripcion_procedente ? 'check' : 'exclamation-circle-fill'"></b-icon>
                        </div>
                        <div>
                            <small>Municipio: </small>
                            <b-icon :variant="inscripcion.municipio_correcto ? 'success' : 'danger'" :icon="inscripcion.municipio_correcto ? 'check' : 'x'"></b-icon>
                        </div>
                        <div>
                            <small>Zona: </small>
                            <b-icon :variant="inscripcion.zona_correcta ? 'success' : 'danger'" :icon="inscripcion.zona_correcta ? 'check' : 'x'"></b-icon>
                        </div>
                        <div>
                            <small>Modalidad: </small>
                            <b-icon :variant="inscripcion.modalidad_correcta ? 'success' : 'danger'" :icon="inscripcion.modalidad_correcta ? 'check' : 'x'"></b-icon></div>
                        <div>
                            <small>Documentación completa: </small>
                            <b-icon :variant="inscripcion.documentacion_completa ? 'success' : 'danger'" :icon="inscripcion.documentacion_completa ? 'check' : 'x'"></b-icon>
                        </div>
                    </div>
                    <div class="col text-right" v-if="!inscripcion.fecha_inscripcion">
                        <b-button size="sm" :disabled="!changed" @click="cerrarInscripcion" variant="primary">Cerrar Inscripción</b-button>
                    </div>
                </div>

                <hr>
                
                <div>Folio de Inscripción: <b>{{ inscripcion.id | folio }}</b></div>
                <div>Gafete: 
                    <b v-if="inscripcion.gafete">{{ inscripcion.gafete | folio }}</b>
                    <b v-if="inscripcion.gafete_invalido"><i class="text-muted">{{ inscripcion.gafete_invalido }}</i></b>
                </div>

                <div v-if="inscripcion.fecha_inscripcion">
                    <div>Nombre: <b>{{ inscripcion.nombre }} {{ inscripcion.primer_apellido }} {{ inscripcion.segundo_apellido }}</b></div>
                    <div>Fecha de Inscripción: <b>{{ inscripcion.fecha_inscripcion | moment("DD [de] MMMM [de] Y" )  }}</b></div>
                    <pre>{{ inscripcion }}</pre>
                </div>
                <div v-else>

                <div v-if="docOperador(4).archivo">{{ docOperador(4).archivo }}</div>
                <div v-else>
                    <ScannDoc  :doc="4" :concursoId="concurso.id" :inscripcionId="inscripcion.id"
                    :desktop="true" out="cc" :docId="docOperador(4).doc_id"
                    @presented="addDocReg"
                    @say="mostrarSalidaScanner" 
                    @success="fileScanned"
                >Digitalizar Licencia Vigente</ScannDoc>
                </div>
                


                    <b-form @submit.stop.prevent="actualizarInscripcion">
                        <b-form-group label-size="sm" label-for="input-1" label="Nombre(s):">
                            <b-form-input size="sm"
                            id="input-1"
                            v-model="inscripcion.nombre"
                            type="text"
                            required
                            placeholder="Nombre"
                            ></b-form-input>
                        </b-form-group>
                        <div class="row">

                            <b-form-group class="col" id="input-group-2" label-for="input-2" label-size="sm"
                                label="Primer apellido:"
                            >
                                <b-form-input id="input-2" type="text" size="sm"
                                    v-model="inscripcion.primer_apellido"
                                    placeholder="Primer apellido"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group class="col" id="input-group-2" label-for="input-2" label-size="sm"
                                label="Segundo apellido:"
                            >
                                <b-form-input id="input-2" type="text" size="sm"
                                    v-model="inscripcion.segundo_apellido"
                                    placeholder="Segundo apellido"
                                ></b-form-input>
                            </b-form-group>
    
                        </div>
                        <hr>
                        <b-form-group label-for="input-5" label-size="sm"
                                label="Correo electrónico:"
                            >
                                <b-form-input id="input-5" type="email" size="sm"
                                    v-model="inscripcion.email"
                                    placeholder="Correo electrónico"
                                ></b-form-input>
                            </b-form-group>
                        <div class="row">
                            <b-form-group class="col" label-for="select-1" label-size="sm"
                                label="Sexo:"
                            >
                                <b-form-select id="select-1" size="sm"
                                    :options="[{ value: null, text: 'Elige una opción' },'Hombre','Mujer','No declarado']"
                                    v-model="inscripcion.sexo"
                                ></b-form-select>
                            </b-form-group>
                            <b-form-group class="col" label-for="select-2" label-size="sm"
                                label="Estado civil:"
                            >
                                <b-form-select id="select-2" size="sm"
                                    :options="[{ value: null, text: 'Elige una opción' },'Soltero','Casado','Otro']"
                                    v-model="inscripcion.estado_civil"
                                ></b-form-select>
                            </b-form-group>

                            <b-form-group v-if="inscripcion.estado_civil == 'Otro'" class="col" label-for="input-6" label-size="sm"
                                label="Otro estado civil:"
                            >
                                <b-form-input id="input-6" type="text" size="sm"
                                    v-model="inscripcion.estado_civil_otro"
                                    placeholder="Especifique"
                                ></b-form-input>
                            </b-form-group>
                        </div>

                        <b-button size="sm" :disabled="changed" type="submit" variant="primary">Actualizar</b-button>
                    </b-form>
                    <hr>
                    <div v-if="concurso">
                        <b-table-simple striped small responsive caption-top :sticky-header="true" :no-border-collapse="true">
                            <caption>Documentos</caption>
                            <b-thead head-variant="light">
                                <b-tr>
                                    <b-th>Nombre</b-th>
                                    <b-th colspan="2" class="text-right">
                                        Documentos presentados: <b v-if="inscripcion.documentos">{{ inscripcion.documentos.length }}</b> de {{ docsInscripcion.length }}
                                    </b-th>
                                    <b-th></b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody>
                                <b-tr v-for="doc  in docsInscripcion" :key="doc.id">
                                    <b-td>{{doc.nombre}}</b-td>
                                    <b-td>
                                        <div v-if="doc.doc_id ">
                                            OK
                                            <div v-if="doc.digitalizar && !doc.archivo">
                                                <Scanner 
                                                    v-if="!findScannedFile(doc.id)"
                                                    out="cc" 
                                                    :doc="doc.id"
                                                    :id="id"
                                                    :docId="doc.doc_id"
                                                    :desktop="true"
                                                    @say="mostrarSalidaScanner" 
                                                    @success="fileScanned"
                                                />
                                                <div v-else  >Digitalizado...</div>
                                            </div>
                                            <div v-else> Cargado {{ docOperador(doc.id).archivo }}</div>

                                        </div>
                                        <div v-else>
                                            <OneClickBtn @clicked="docPresentado(doc.id)">Presentado</OneClickBtn>
                                        </div>
                                        
                                    </b-td>
                                    <b-td>{{doc.digitalizar}}</b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                    </div>
                    
                </div>
            </div>
        </div>

    </div>


</template>

<script>
import fs from 'fs'
import { mapActions, mapState } from 'vuex'
import Scanner from '@/components/Scanner/Scanner'
import ScannDoc from '@/components/Scanner/ScannDoc'
import OneClickBtn from '@/components/Scanner/OneClickBtn'

export default {
    components:{
        Scanner,
        ScannDoc,
        OneClickBtn
    },
    props:{
        id:[Number,String]
    },
    data(){
        return {
            inscripcion:null,
            clone:null
        }
    },
    mounted(){
        this.obtenerInscripcion();
        this.uploadFiles()
    },
    computed:{

        ...mapState({
            concurso: state => state.CC.concurso,
            scanned_files: state => state.CC.scanned_files,
        }),
        changed(){
            return _.isEqual(this.clone, this.inscripcion)
        },
        docsInscripcion(){
            //var merge = _.merge(arr1, arr2);
            let cdocs = _.filter(this.concurso.documentos, ['etapa', 'inscripcion'])
            //return _.merge(cdocs,this.inscripcion.documentos)
            return _.map(cdocs, (item) => {
                let doc = _.find(this.inscripcion.documentos,['cc_concurso_doc_id', item.id])
                return {
                    'id':item.id,
                    'nombre':item.nombre,
                    'digitalizar':item.digitalizar,
                    'doc_id': doc ? doc.id : null,
                    'archivo': doc ? doc.archivo : null,
                }
            });
        }
    },
    methods:{ 
        ...mapActions(['addCCScannedFile','setTitle','clearCCScannedFile','delCCScannedFile']),
        mostrarSalidaScanner(msj){
            console.log('Scanner say: ',msj)
        },
        fileScanned({filepath,id,doc,docId}){
            let file = {
                'file':filepath,
                'id':String(id),
                'doc':String(doc),
                'doc_id':String(docId),
                'timestamp':Date.now()
            }
            this.addCCScannedFile(file);
            this.upload(file)
        },
  
        deleteLocalFile(){
            //
        },
        uploadFiles(){
            console.log('in tail: ',this.scanned_files.length)
            if(this.scanned_files.length)
                this.upload(this.scanned_files[0])
        },
        upload(file){
            console.log('Uploader say: ','uploading '+ file.file)
            var file64 = (fs.readFileSync(file.file).toString('base64'))
            if(!file64) console.log('Uploader say: ','no file !')
            if(!file64) return false
            console.log('Uploader say: ','habemus file64')
            file.file64 = file64;
            this.$axios.post('cc/documentos/inscripcion/upload',file).then(({data}) => {
                //this.msj = 'uploaded'
                console.log('Uploader say: ','uploaded '+ data.id)
                this.updateDocReg(data)
                this.delCCScannedFile(file)
            }).catch( error => {
                //this.msj = 'error uploading'
                if(error.response){
                    console.warn(error.response)
                }
                console.warn(error.message)
            })
        },
        updateDocReg(data){
            console.log('Updater say: ','updating '+ data.id)
            let index = _.findIndex(this.inscripcion.documentos,['id',data.id]) 
            this.$set(this.inscripcion.documentos,index,data)
        },
        addDocReg(data){
            console.log('Updater say: ','adding '+ data.id)
            this.inscripcion.documentos.push(data)
        },

        findScannedFile(doc){
            return _.find(this.scanned_files,{'id': String(this.id), 'doc':String(doc)})
        },

        docOperador(id){
            return _.find(this.docsInscripcion, ['id', id])
        },
        obtenerInscripcion(){
            this.$axios.get('cc/inscripcion/' + this.id).then( ({data}) => {
                this.inscripcion = data
                this.clone = _.clone(data)
            })
        },
        actualizarInscripcion(){
            this.$axios.put('cc/inscripcion/' + this.id,this.inscripcion).then( ({data}) => {
                this.inscripcion = data
                this.clone = _.clone(data)
            })
        },
        cerrarInscripcion(){
            if(!confirm('Confirmar cierre de Inscripción')) return
            this.$axios.put('cc/inscripcion/' + this.id + '/cerrar').then( ({data}) => this.$router.push('/cc/inscripciones'))
        },

        docPresentado(id){
            let doc = {
                'cc_concurso_id' : this.concurso.id,
                'cc_inscripcion_id' : this.inscripcion.id,
                'cc_concurso_doc_id' : id
            }
            this.$axios.post('cc/documentos',doc).then( ({data}) => {
                this.addDocReg(data)
                //this.inscripcion = data
                //this.clone = _.clone(data)
            })

        },
        
        setAppTitle(title){
            this.setTitle(title)
        }
    }
}
</script>

<style>

</style>