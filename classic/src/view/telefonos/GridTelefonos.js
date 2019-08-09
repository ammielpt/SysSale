Ext.define('app.view.telefonos.GridTelefonos', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'gridtelefonos',
    controller: 'telefonocontroller',
    autoScroll: true,
    maxHeight: 200,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No hay telefonos para mostrar.'
    },
    initComponent: function () {
        var me = this, telefonoStore = Ext.create('app.store.telefonos.StoreTelefonos');
        if (me.rcdCliente)
            telefonoStore.load({params: {idCliente: me.rcdCliente.get('idCliente')}});
        Ext.apply(this, {
            store: telefonoStore,
            columns: [
                {text: 'Telefono', dataIndex: 'numeroTelefono', width: 300, flex: 1},
                {text: 'Operador', dataIndex: 'idOperador', width: 200, renderer: function (value) {
                        var val;
                        telefonoStore.each(function (record) {
                            if (record.get('idOperador') == value) {
                                val = record.get('nombreOperador');
                                return;
                            }
                        });
                        return val;
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [{
                            icon: 'resources/icon/edit_icon.png',
                            tooltip: 'Editar',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex),
                                        win = Ext.create('Ext.Window', {
                                            modal: true,
                                            title: "Actualizar telefono",
                                            height: 300,
                                            width: 400,
                                            y: 0,
                                            items: [Ext.create('app.view.telefonos.FormTelefono', {
                                                    record: rec, telefonoStore: telefonoStore,
                                                    idCliente: me.rcdCliente.get('idCliente')
                                                })],
                                            buttons: [
                                                {
                                                    text: 'Actualizar',
                                                    handler: function () {
                                                        var form = this.up('window').down('formtelefono');
                                                        if (form.isValid())
                                                            form.doUpdate(form.getValues(), win, telefonoStore);
                                                    }
                                                },
                                                {
                                                    text: 'Cerrar',
                                                    handler: function () {
                                                        win.close();
                                                    }
                                                }
                                            ]
                                        });
                                win.show();
                            }
                        }, {
                            icon: 'resources/icon/delete_icon.png',
                            tooltip: 'Eliminar',
                            handler: 'eliminarTelefono'
                        }]
                }
            ]
        });
        this.tbar = [
            {
                text: 'Agregar',
                iconCls: 'fa fa-user-plus',
                handler: function () {
                    if (!me.rcdCliente) {
                        Ext.Msg.alert('Mensaje', 'Por favor primero guarde la informacion principal');
                        return;
                    }
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Agregar telefono",
                        height: 300,
                        width: 400,
                        y: 50,
                        items: [Ext.create('app.view.telefonos.FormTelefono', {idCliente: me.rcdCliente.get('idCliente')})],
                        buttons: [
                            {
                                text: 'Guardar',
                                handler: function () {
                                    var form = this.up('window').down('formtelefono');
                                    if (form.isValid())
                                        form.doSubmit(form.getValues(), win, telefonoStore);
                                }
                            },
                            {
                                text: 'Cerrar',
                                handler: function () {
                                    win.close();
                                }
                            }
                        ]
                    });
                    win.show();
                }
            }];
        this.callParent(arguments);
    }
});