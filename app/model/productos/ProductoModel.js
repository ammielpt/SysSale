Ext.define('app.model.productos.ProductoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "idCliente", type: 'int', defaultValue: 0},
        {name: "razonSocial", type: 'string'},
        {name: "ruc", type: 'string'},
        {name: "direccion", type: 'string'},
        {name: "fechaNacimiento", type: 'date', dateFormat: 'Y-m-d'}
    ]
});