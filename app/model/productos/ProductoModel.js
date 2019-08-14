Ext.define('app.model.productos.ProductoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "nombre", type: 'string'},
        {name: "precio", type: 'float'},
        {name: "idCategoria", type: 'int'},
        {name: "peso", type: 'float'},
        {name: "fechaAlta", type: 'date'},
        {name: "stock", type: 'int'},
        {name: "idNominacion", type: 'int'}
    ]
});