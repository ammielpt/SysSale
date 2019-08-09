Ext.define('app.model.operadores.OperadorModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "idOperador", type: 'int', defaultValue: 0},
        {name: "nombreOperador", type: 'string'}
    ]
});