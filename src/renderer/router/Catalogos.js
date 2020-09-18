export default [

    {
        path: '/catalogos/municipios',
        name: 'catalogos--municipios',
        component: require('@/modulos/Catalogos/Municipios/Municipios').default
    },
    {
        path: '/catalogos/municipios/municipio/:id',
        name: 'catalogos--municipio',
        props:true,
        component: require('@/modulos/Catalogos/Municipios/Municipio').default
    },

    {
        path: '/catalogos/modalidades',
        name: 'catalogos--modalidades',
        component: require('@/modulos/Catalogos/Modalidades/Modalidades').default
    },
    {
        path: '/catalogos/modalidades/modalidad/:id',
        name: 'catalogos--modalidad',
        props:true,
        component: require('@/modulos/Catalogos/Modalidades/Modalidad').default
    },

    {
        path: '/catalogos/zonas',
        name: 'catalogos--zonas',
        component: require('@/modulos/Catalogos/Zonas/Zonas').default
    },
    {
        path: '/catalogos/zonas/zona/:id',
        name: 'catalogos--zona',
        props:true,
        component: require('@/modulos/Catalogos/Zonas/Zona').default
    },

    {
        path: '/catalogos/direcciones',
        name: 'catalogos--direcciones',
        component: require('@/modulos/Catalogos/Direcciones/Direcciones').default
    },
    {
        path: '/catalogos/direcciones/direccion/:id',
        name: 'catalogos--direccion',
        props:true,
        component: require('@/modulos/Catalogos/Direcciones/Direccion').default
    },

    {
        path: '/catalogos/tramites',
        name: 'catalogos--tramites',
        component: require('@/modulos/Catalogos/Tramites/Tramites').default
    },
    {
        path: '/catalogos/tramite/:id',
        name: 'catalogos--tramite',
        props:true,
        component: require('@/modulos/Catalogos/Tramites/Tramite').default
    },
]