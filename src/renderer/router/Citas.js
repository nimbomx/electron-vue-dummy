export default [


    {
        path: '/citas/calendarios',
        name: 'citas--calendarios',
        component: require('@/modulos/Citas/Calendarios').default
    },
    {
        path: '/citas/nuevo/calendario',
        name: 'citas--nuevo-calendario',
        component: require('@/modulos/Citas/NuevoCalendario').default
    },
    {
        path: '/citas/calendario/:id',
        name: 'citas--calendario',
        
        component: require('@/modulos/Citas/Calendario').default
    },

    {
        path: '/citas',
        name: 'citas',
        component: require('@/modulos/Citas/CalendarioCitas').default
    },
    {
        path: '/citas/tramites',
        name: 'citas--tramites',
        component: require('@/modulos/Citas/Tramites').default
    },
    {
        path: '/citas/nuevo/tramite',
        name: 'citas--nuevo-tramite',
        component: require('@/modulos/Citas/NuevoTramite').default
    },
    {
        path: '/citas/tramite/:id',
        name: 'citas--tramite',
        props:true,
        component: require('@/modulos/Citas/Tramite').default
    },
]