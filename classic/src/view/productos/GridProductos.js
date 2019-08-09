Ext.define('app.view.productos.GridProductos', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'gridproductos',
    controller: 'productocontroller',
    initComponent: function () {
        var me = this,
                mystore = Ext.create('app.store.productos.StoreProductos', {
                    autoLoad: true
                });
        Ext.apply(this, {
            store: mystore,
            columns: [
                {text: 'Nombre', dataIndex: 'razonSocial', width: 300, flex: 1},
                {text: 'Categoría', dataIndex: 'razonSocial', width: 150},
                {text: 'Precio', dataIndex: 'ruc', width: 150},
                {text: 'Fecha de alta', dataIndex: 'direccion', width: 120},
                {text: 'Peso', dataIndex: 'peso', width: 100},
                {text: 'Nominación', dataIndex: 'nominacion', width: 150},
                {text: 'Stock', dataIndex: 'direccion', width: 100},
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [{
                            icon: 'resources/icon/edit_icon.png',
                            tooltip: 'Editar',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var win = Ext.create('Ext.Window', {
                                    modal: true,
                                    title: "Actualizar cliente",
                                    height: 580,
                                    width: 700,
                                    y: 0,
                                    items: [Ext.create('app.view.clientes.form.FormCliente', {record: rec})],
                                    buttons: [
                                        {
                                            text: 'Actualizar',
                                            handler: function () {
                                                var form = this.up('window').down('formcliente');
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
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: mystore,
                    dock: 'bottom',
                    displayInfo: true
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
                        title: "Agregar Nuevo",
                        height: 580,
                        width: 700,
                        y: 0,
                        items: [Ext.create('app.view.clientes.form.FormCliente')],
                        buttons: [
                            {
                                text: 'Guardar',
                                handler: function () {
                                    var form = this.up('window').down('formcliente');
                                    if (form.isValid()) {
                                        if (!form.getRecord())
                                            form.doSubmit(form.getValues(), win, mystore);
                                        else {
                                            form.doUpdate(form.getValues(), win, mystore);
                                        }
                                    }
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
            }, '-', {
                text: 'Correos',
                iconCls: 'fa fa-envelope',
                handler: function () {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Lista de Correos: " + record[0].get('razonSocial'),
                        height: 380,
                        width: 500,
                        y: 0,
                        items: [Ext.create('app.view.clientes.correos.GridCorreos', {rcdCliente: record[0]})],
                        buttons: [
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
            }, '-', {
                text: 'Enviar correo',
                iconCls: 'fa fa-paperclip',
                handler: function () {
                    var winpdf1 = new Ext.Window({
                        title: 'Escribe tu mensaje',
                        width: 550,
                        height: 250,
                        modal: true,
                        buttons: [
                            {
                                text: 'Cancelar',
                                handler: function () {
                                    winpdf1.close();
                                }
                            },
                            {
                                text: 'Enviar'
                            }
                        ],
                        items: [
                            {
                                xtype: 'htmleditor'
                            }
                        ]
                    });
                    winpdf1.show();
                }
            },
            '->', {
                text: 'Exportar Excel',
                iconCls: 'fa fa-download',
                handler: function () {
                    Ext.Msg.confirm('Mensaje', 'Desea exportar la informacion de clientes en formato excel?', function (respuesta) {
                        if (respuesta == 'yes') {
                            window.open(Sales.Config.HOME_URL + '/cliente/reporteClienteExcel', "_self");
                        }
                    });
                }
            },
            '-', {
                text: 'Exportar PDF',
                iconCls: 'fa fa-file-pdf-o',
                handler: function () {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var winpdf1 = new Ext.Window({
                        title: 'PDF Content: ' + record[0].get('razonSocial'),
                        width: 800,
                        height: 600,
                        plain: true,
                        modal: true,
                        items: {
                            xtype: 'component',
                            autoEl: {
                                tag: 'iframe',
                                style: 'height: 100%; width: 100%; border: none',
                                src: Sales.Config.HOME_URL + '/cliente/generarReportePDFCliente/' + record[0].get('idCliente')
                            }
                        }
                    });
                    winpdf1.show();
                }
            }, '-', {
                text: 'Adjuntar documentos',
                iconCls: 'fa fa-paperclip',
                handler: function () {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Adjuntar documento: " + record[0].get('razonSocial'),
                        height: 380,
                        width: 600,
                        y: 0,
                        items: [Ext.create('app.view.clientes.documents.GridDocuments', {rcdCliente: record[0]})],
                        buttons: [
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