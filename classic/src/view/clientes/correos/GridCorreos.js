Ext.define('app.view.clientes.correos.GridCorreos', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'gridcorreos',
    controller: 'correocontroller',
    autoScroll: true,
    maxHeight: 300,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No hay correos para mostrar.'
    },
    initComponent: function () {
        var me = this, correoStore = Ext.create('app.store.correos.StoreCorreos');
        if (me.rcdCliente)
            correoStore.load({params: {idCliente: me.rcdCliente.get('idCliente')}});
        Ext.apply(this, {
            store: correoStore,
            columns: [
                {text: 'Correo', dataIndex: 'correo', width: 300, flex: 1},
                {text: 'Principal?', align: 'center', dataIndex: 'principal', width: 150, renderer: function (value) {
                        if (value)
                            return '<span style="background-color: green; width: 40; color: white; display: block">Si</span>';
                        else {
                            return '<span style="background-color: red; width: 40; color: white; display: block">No</span>';
                        }
                    }},
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
                                            title: "Actualizar correo",
                                            height: 300,
                                            width: 400,
                                            y: 0,
                                            items: [Ext.create('app.view.clientes.correos.FormCorreo', {
                                                    record: rec, correoStore: correoStore,
                                                    idCliente: me.rcdCliente.get('idCliente')
                                                })],
                                            buttons: [
                                                {
                                                    text: 'Actualizar',
                                                    handler: function () {
                                                        var form = this.up('window').down('formcorreo');
                                                        if (form.isValid())
                                                            form.doUpdate(form.getValues(), win, correoStore);
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
                            handler: 'eliminarCorreo'
                        }]
                }
            ]
        });
        this.tbar = [
            {
                text: 'Agregar',
                iconCls: 'fa fa-user-plus',
                handler: function () {
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Agregar correo",
                        height: 300,
                        width: 400,
                        y: 50,
                        items: [Ext.create('app.view.clientes.correos.FormCorreo', {idCliente: me.rcdCliente.get('idCliente')})],
                        buttons: [
                            {
                                text: 'Guardar',
                                handler: function () {
                                    var form = this.up('window').down('formcorreo');
                                    if (form.isValid())
                                        form.doSubmit(form.getValues(), win, correoStore);
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