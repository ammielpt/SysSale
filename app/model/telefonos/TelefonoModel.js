Ext.define('app.model.telefonos.TelefonoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "idTelefono", type: 'int', defaultValue: 0},
        {name: 'idCliente', type: 'int'},
        {name: "numeroTelefono", type: 'string'},
        {name: "idOperador", type: 'int'},
        {name: "nombreOperador", type: 'string'}
    ]
});