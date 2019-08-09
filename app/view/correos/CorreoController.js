Ext.define('app.view.correos.CorreoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.correocontroller',
    eliminarCorreo: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('Eliminar correo', 'Esta completamente seguro de querer' +
                ' eliminar a <b>' + rec.get('correo') + '</b>?',
                function (respuesta) {
                    if (respuesta == 'yes') {
                        Ext.Ajax.request({
                            url: Sales.Config.HOME_URL + '/correo/eliminarCorreo',
                            method: 'GET',
                            params: {idCorreo: rec.get('idCorreo')},
                            success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                if (obj.success) {
                                    Ext.Msg.alert('Mensaje', obj.mensaje);
                                    grid.store.remove(rec);
                                }
                            },
                            failure: function (response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            }
                        });
                    }
                });
    }
});