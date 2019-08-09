/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
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
    eliminarCliente: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('Eliminar cliente', 'Esta completamente seguro de querer' +
                'eliminar a <b>' + rec.get('nombre') + ' ' + rec.get('apellido') + '</b>?',
                function (respuesta) {
                    if (respuesta == 'yes') {
                        Ext.Ajax.request({
                            url: 'http://localhost/SysSale/consulta/eliminarAlumno/' + rec.get('matricula'),
                            method: 'GET',
                            success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                Ext.Msg.alert('Mensaje', obj.mensaje);
                                grid.store.remove(rec);
                            },
                            failure: function (response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            }
                        });
                    }
                });
    }
});
