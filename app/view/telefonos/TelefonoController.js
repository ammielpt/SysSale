Ext.define('app.view.telefonos.TelefonoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.telefonocontroller',
    onItemSelected: function (sender, record) {
        var panel = Ext.create('app.view.clientes.PanelClientes');
        var win = Ext.create('app.view.common.WindowStatusBar', {
            width: 800,
            height: 700,
            title: 'Seleccionar clientes',
            items: panel,
            buttons: [
                {
                    text: 'Seleccionar',
                    scope: this,
                    handler: function () {
                        panel.seleccionar();
                    }
                }, {
                    text: 'Cancelar',
                    handler: function () {
                        win.hide();
                    }
                }
            ]
        });
        win.show();
        panel.on({
            selectcliente: function (panelclientes, rec) {
                win.hide();
                Ext.Msg.confirm('Cliente' + rec.data.nombre, 'El cliente seleccionado fue');
            }
        });
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    eliminarTelefono: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('Eliminar telefono', 'Esta completamente seguro de querer' +
                ' eliminar a <b>' + rec.get('numeroTelefono') + '</b>?',
                function (respuesta) {
                    if (respuesta == 'yes') {
                        Ext.Ajax.request({
                            url: Sales.Config.HOME_URL + '/telefono/eliminarTelefono',
                            method: 'GET',
                            params: {idTelefono: rec.get('idTelefono')},
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