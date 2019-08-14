Ext.define('app.view.productos.ProductoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productocontroller',
    eliminarProducto: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('Eliminar producto', 'Esta completamente seguro de querer' +
            ' eliminar a <b>' + rec.get('nombre') + '</b>?',
            function(respuesta) {
                if (respuesta == 'yes') {
                    Ext.Ajax.request({
                        url: 'http://localhost/SysSale/producto/eliminarProducto/' + rec.get('idProducto'),
                        method: 'GET',
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            if (obj.success) {
                                Ext.Msg.alert('Mensaje', obj.mensaje);
                                grid.store.remove(rec);
                            }
                        },
                        failure: function(response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            });
    }
});