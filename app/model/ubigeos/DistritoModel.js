Ext.define('app.model.ubigeos.DistritoModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: "idDistrito", type: 'int' },
        { name: "idProvincia", type: 'int' },
        { name: 'distrito', type: 'string' }
    ]
});