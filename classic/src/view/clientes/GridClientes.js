Ext.define('app.view.clientes.GridClientes', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'gridclientes',
    controller: 'clientecontroller',
    initComponent: function() {
        var me = this,
            departamentoStore = Ext.create('app.store.ubigeos.StoreDepartamentos', { autoLoad: true }),
            provinciaStore = Ext.create('app.store.ubigeos.StoreProvincias', { autoLoad: true }),
            distritoStore = Ext.create('app.store.ubigeos.StoreDistritos', { autoLoad: true }),
            mystore = Ext.create('app.store.clientes.StoreClientes');
        Ext.apply(this, {
            store: mystore,
            columns: [
                { text: 'Razon Social', dataIndex: 'razonSocial', width: 300, minWidth: 300, flex: 1 },
                { text: 'Ruc', dataIndex: 'ruc', width: 200, minWidth: 200 },
                { text: 'Direccion', dataIndex: 'direccion', width: 400, minWidth: 400, flex: 1 },
                {
                    text: 'Departamento',
                    dataIndex: 'idDepartamento',
                    width: 150,
                    renderer: function(value) {
                        var val = "";
                        if (departamentoStore.isLoaded()) {
                            departamentoStore.each(function(record) {
                                if (record.get('idDepartamento') == value) {
                                    val = record.get('departamento');
                                    return;
                                }
                            });
                        }
                        return val;
                    }
                },
                {
                    text: 'Provincia',
                    dataIndex: 'idProvincia',
                    width: 150,
                    renderer: function(value) {
                        var val = "";
                        if (provinciaStore.isLoaded()) {
                            provinciaStore.each(function(record) {
                                if (record.get('idProvincia') == value) {
                                    val = record.get('provincia');
                                    return;
                                }
                            });
                        }
                        return val;
                    }
                },
                {
                    text: 'Distrito',
                    dataIndex: 'idDistrito',
                    width: 150,
                    renderer: function(value) {
                        var val = "";
                        if (distritoStore.isLoaded()) {
                            distritoStore.each(function(record) {
                                if (record.get('idDistrito') == value) {
                                    val = record.get('distrito');
                                    return;
                                }
                            });
                        }
                        return val;
                    }
                },
                {
                    text: 'Fecha Nacimiento',
                    dataIndex: 'fechaNacimiento',
                    width: 150,
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    xtype: 'actioncolumn',
                    width: 80,
                    items: [{
                        icon: 'resources/icon/edit_icon.png',
                        tooltip: 'Editar',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var win = Ext.create('Ext.Window', {
                                modal: true,
                                title: "Actualizar cliente",
                                iconCls: 'fa far fa-edit',
                                height: 580,
                                width: 700,
                                y: 0,
                                items: [Ext.create('app.view.clientes.form.FormCliente', { record: rec })],
                                buttons: [{
                                        text: 'Actualizar',
                                        iconCls: 'fa far fa-save',
                                        style: 'background-color:green',
                                        handler: function() {
                                            var form = this.up('window').down('formcliente');
                                            if (form.isValid())
                                                form.doUpdate(form.getValues(), win, mystore);
                                        }
                                    },
                                    {
                                        text: 'Cerrar',
                                        iconCls: 'fa fas fa-times-circle',
                                        style: 'background-color:red',
                                        handler: function() {
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
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: mystore,
                dock: 'bottom',
                displayInfo: true
            }]
        });
        this.tbar = [{
                text: 'Agregar',
                iconCls: 'fa fa-user-plus',
                handler: function() {
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Agregar Nuevo",
                        iconCls: 'fa fa-user-plus',
                        height: 580,
                        width: 700,
                        y: 0,
                        items: [Ext.create('app.view.clientes.form.FormCliente')],
                        buttons: [{
                                text: 'Guardar',
                                iconCls: 'fa far fa-save',
                                style: 'background-color:green',
                                handler: function() {
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
                                iconCls: 'fa fas fa-times-circle',
                                style: 'background-color:red',
                                handler: function() {
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
                handler: function() {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Lista de Correos: " + record[0].get('razonSocial'),
                        iconCls: 'fa fa-envelope',
                        height: 380,
                        width: 500,
                        y: 0,
                        items: [Ext.create('app.view.clientes.correos.GridCorreos', { rcdCliente: record[0] })],
                        buttons: [{
                            text: 'Cerrar',
                            iconCls: 'fa fas fa-times-circle',
                            style: 'background-color:red',
                            handler: function() {
                                win.close();
                            }
                        }]
                    });
                    win.show();
                }
            }, '-', {
                text: 'Enviar correo',
                iconCls: 'fa far fa-paper-plane',
                handler: function() {
                    var winpdf1 = new Ext.Window({
                        title: 'Escribe tu mensaje',
                        iconCls: 'fa far fa-paper-plane',
                        width: 550,
                        height: 250,
                        modal: true,
                        buttons: [{
                                text: 'Cancelar',
                                iconCls: 'fa fas fa-times-circle',
                                style: 'background-color:red',
                                handler: function() {
                                    winpdf1.close();
                                }
                            },
                            {
                                text: 'Enviar',
                                iconCls: 'fa far fa-paper-plane',
                                style: 'background-color:green'
                            }
                        ],
                        items: [{
                            xtype: 'htmleditor'
                        }]
                    });
                    winpdf1.show();
                }
            },
            '->', {
                text: 'Exportar Excel',
                iconCls: 'fa fa-download',
                handler: function() {
                    Ext.Msg.confirm('Mensaje', 'Desea exportar la informacion de clientes en formato excel?', function(respuesta) {
                        if (respuesta == 'yes') {
                            window.open(Sales.Config.HOME_URL + '/cliente/reporteClienteExcel', "_self");
                        }
                    });
                }
            },
            '-', {
                text: 'Exportar PDF',
                iconCls: 'fa fa-file-pdf-o',
                handler: function() {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var winpdf1 = new Ext.Window({
                        title: 'PDF Content: ' + record[0].get('razonSocial'),
                        width: 800,
                        iconCls: 'fa fa-file-pdf-o',
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
                handler: function() {
                    var record = me.getSelectionModel().getSelection();
                    if (!record[0]) {
                        Ext.Msg.alert("Mensaje", "Por favor seleccione un registro de cliente");
                        return;
                    }
                    var win = Ext.create('Ext.Window', {
                        modal: true,
                        title: "Adjuntar documento: " + record[0].get('razonSocial'),
                        iconCls: 'fa fa-paperclip',
                        height: 380,
                        width: 600,
                        y: 0,
                        items: [Ext.create('app.view.clientes.documents.GridDocuments', { rcdCliente: record[0] })],
                        buttons: [{
                            text: 'Cerrar',
                            iconCls: 'fa fas fa-times-circle',
                            style: 'background-color:red',
                            handler: function() {
                                win.close();
                            }
                        }]
                    });
                    win.show();
                }
            }
        ];
        this.callParent(arguments);
        distritoStore.on('load', function() {
            mystore.load();
        });
    }
});