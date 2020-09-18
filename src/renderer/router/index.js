import Vue from 'vue'
import Router from 'vue-router'

import Catalogos from "./Catalogos"
import Citas from "./Citas"

Vue.use(Router)

export default new Router({
  routes: [
    ...Catalogos,
    ...Citas,
    {
      path: '/',
      name: 'main-acceso',
      component: require('@/modulos/Main').default
    },
    {
      path: '/imprimir/:component(.*)',
      name: 'imprimir',
      props:true,
      component: require('@/components/Print').default
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: require('@/modulos/Calendario/Calendar').default
    },

    {
      path: '/modulos',
      name: 'modulos',
      component: require('@/modulos/Modulos/Modulos').default
    },
    {
      path: '/modulo/:id',
      name: 'modulo',
      props:true,
      component: require('@/modulos/Modulos/Modulo').default
    },
    {
      path: '/nuevo/modulo',
      name: 'nuevo-modulo',
      component: require('@/modulos/Modulos/NuevoModulo').default
    },



    {
      path: '/cc/calendario',
      name: 'cc--calendario',
      component: require('@/modulos/ConcursoConcesiones/Calendar').default
    },
    {
      path: '/cc/config',
      name: 'cc--config',
      component: require('@/modulos/ConcursoConcesiones/Config/Concursos').default
    },
    {
      path: '/cc/nuevo/concurso',
      name: 'cc--nuevo-concurso',
      component: require('@/modulos/ConcursoConcesiones/Config/NuevoConcurso').default
    },
    {
      path: '/cc/concurso/:id',
      name: 'cc--concurso',
      props:true,
      component: require('@/modulos/ConcursoConcesiones/Config/Concurso').default
    },
    {
      path: '/cc/:id/documentos',
      name: 'cc--documentos',
      props:true,
      component: require('@/modulos/ConcursoConcesiones/Config/Documentos/Documentos').default
    },
    {
      path: '/cc/documento/:id',
      name: 'cc--documento',
      props:true,
      component: require('@/modulos/ConcursoConcesiones/Config/Documentos/Documento').default
    },

    {
      path: '/cc/inscripciones',
      name: 'cc--inscripciones',
      component: require('@/modulos/ConcursoConcesiones/Inscripciones/ListadoInscritos').default
    },
    {
      path: '/cc/nueva/inscripcion',
      name: 'cc--nueva-inscripcion',
      component: require('@/modulos/ConcursoConcesiones/Inscripciones/BuscadorOperadores').default
    },
    {
      path: '/cc/nueva/inscripcion/forzada',
      name: 'cc--nueva-inscripcion-forzada',
      component: require('@/modulos/ConcursoConcesiones/Inscripciones/InscripcionForzada').default
    },
    {
      path: '/cc/inscripcion/:id',
      name: 'cc--inscripcion',
      props:true,
      component: require('@/modulos/ConcursoConcesiones/Inscripciones/Inscripcion').default
    },

    {
      path: '/usuarios',
      name: 'usuarios',
      component: require('@/modulos/Usuarios/Usuarios').default
    },
    {
      path: '/usuario/:id',
      name: 'usuario',
      props:true,
      component: require('@/modulos/Usuarios/Usuario').default
    },
    {
      path: '/nuevo/usuario',
      name: 'nuevo-usuario',
      component: require('@/modulos/Usuarios/NuevoUsuario').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
