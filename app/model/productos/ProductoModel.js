Ext.define('app.model.productos.ProductoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "nombre", type: 'string'},
        {name: "precio", type: 'float'},
        {name: "idCategoria", type: 'int', defaultValue: 0},
        {name: "peso", type: 'float'},
        {name: "fechaAlta", type: 'date', dateFormat: 'Y-m-d'},
        {name: "stock", type: 'int'},
        {name: "idNominacion", type: 'int', defaultValue: 0}
    ]
});