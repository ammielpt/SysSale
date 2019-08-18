Ext.define('app.model.productos.DocumentModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: "idDocument", type: 'int' },
        { name: "idProducto", type: 'int' },
        { name: "nombre", type: 'string' },
        {
            name: "size",
            type: 'int',
            convert: function(value) {
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (value == 0)
                    return '0 Byte';
                var i = parseInt(Math.floor(Math.log(value) / Math.log(1024)));
                return Math.round(value / Math.pow(1024, i), 2) + ' ' + sizes[i];
            }
        },
        { name: "url", type: 'string' },
        { name: "descripcion", type: 'string' }
    ]
});