/**
 * This view is an example list of people.
 */
Ext.define('app.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    title: 'Personnel',
    layout: 'fit',
    require: ['app.view.main.form.FormCliente'],
    controller: 'main',
    initComponent: function () {
        var mystore = Ext.create('app.store.Personnel', {
            autoLoad: true
        });
        var me = this;
        me.store = mystore;
        me.columns = [
            {text: 'Nombre', dataIndex: 'nombre'},
            {text: 'Matricula', dataIndex: 'matricula', flex: 1},
            {text: 'Apellido', dataIndex: 'apellido', flex: 1},
            {
                xtype: 'actioncolumn',
                width: 60,
                items: [{
                        icon: 'resources/icon/edit_icon.png',
                        tooltip: 'Editar',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var win = Ext.create('Ext.Window', {
                                modal: true,
                                title: "Agregar Nuevo",
                                height: 300,
                                width: 400,
                                items: [Ext.create('app.view.main.form.FormCliente', {record: rec})],
                                buttons: [
                                    {
                                        text: 'Guardar',
                                        handler: function () {
                                            var form = this.up('window').down('formclienteperson');
                                            if (form.isValid())
                                                form.doUpdate(form.getValues(), win, mystore);
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
                        handler: 'eliminarCliente'
                    }]
            }
        ];
        me.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: mystore,
                dock: 'bottom',
                displayInfo: true
            }
        ];
        this.tbar = [
            {
                text: 'Agregar',
                handler: function () {
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Agregar Nuevo",
                        height: 300,
                        width: 400,
                        items: [Ext.create('app.view.main.form.FormCliente')],
                        buttons: [
                            {
                                text: 'Guardar',
                                handler: function () {
                                    var form = this.up('window').down('formclienteperson');
                                    if (form.isValid())
                                        form.doSubmit(form.getValues(), win, mystore);
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
            }
        ];
        me.callParent(arguments);
    },
    listeners: {
        select: 'onItemSelected'
    }
});
