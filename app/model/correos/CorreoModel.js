Ext.define('app.model.correos.CorreoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "idCorreo", type: 'int', defaultValue: 0},
        {name: "principal", type: 'int', defaultValue: 0},
        {name: "correo", type: 'string'}
    ]
});