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
                {text: 'Descripción', dataIndex: 'nombre', width: 300, flex: 1},
                {text: 'Precio', dataIndex: 'precio', width: 150},
                {text: 'Categoria', dataIndex: 'idCategoria', width: 150},
                {text: 'Peso', dataIndex: 'peso', width: 120, hidden: true},
                {text: 'Fecha alta', dataIndex: 'fechaAlta', width: 100},
                {text: 'Stock', dataIndex: 'stock', width: 100},
                {text: 'Nominación', dataIndex: 'idNominacion', width: 100},
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
                                    title: "Actualizar producto",
                                    height: 580,
                                    width: 700,
                                    y: 0,
                                    items: [Ext.create('app.view.productos.form.FormProducto', {record: rec})],
                                    buttons: [
                                        {
                                            text: 'Actualizar',
                                            handler: function () {
                                                var form = this.up('window').down('formproducto');
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
                            handler: 'eliminarProducto'
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
                        title: "Agregar Producto",
                        height: 450,
                        width: 650,
                        y: 0,
                        items: [Ext.create('app.view.productos.form.FormProducto')],
                        buttons: [
                            {
                                text: 'Guardar',
                                handler: function () {
                                    var form = this.up('window').down('formproducto');
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
            }, 
            '->', {
                text: 'Exportar Excel',
                iconCls: 'fa fa-download',
                handler: function () {
                    Ext.Msg.confirm('Mensaje', 'Desea exportar la informacion de productos en formato excel?', function (respuesta) {
                        if (respuesta == 'yes') {
                            window.open(Sales.Config.HOME_URL + '/producto/reporteProductoExcel', "_self");
                        }
                    });
                }
            },
            '-',{
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
                        title: "Adjuntar documento: " + record[0].get('nombre'),
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