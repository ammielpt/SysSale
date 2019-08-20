Ext.define('app.model.ubigeos.ProvinciaModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: "idProvincia", type: 'int' },
        { name: 'idDepartamento', type: 'int' },
        { name: "provincia", type: 'string' }
    ]
});