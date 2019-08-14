Ext.define('app.model.productos.CategoriaModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "idCategoria", type: 'int'},
        {name: "nombreCategoria", type: 'string'}
    ]
});