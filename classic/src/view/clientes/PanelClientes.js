Ext.define('app.view.clientes.PanelClientes', {
    extend: 'Ext.Panel',
    xtype: 'panelclientes',
    layout: 'border',
    controller: 'panelclientesctrl',
    tbar: [
        {
            text: 'Agregar Cliente',
            iconCls: 'x-fa fa-plus',
            handler: 'agregarCliente'
        }, '->', {
            xtype: 'comboclientes',
            emptyText: 'Buscar cliente',
            widht: 300
        }
    ],
    items: [
        {
            region: 'center',
            layou: 'fit',
            html: 'Border centro',
            xtype: 'tabpanel',
            bodyStyle: 'background-color: blue',
            items: [
                {
                    title: 'Listado de clientes',
                    xtype: 'gridclientes',
                    reference: 'gridlistado',
                    listeners: {
                        itemclick: 'showClienteDetalle'
                    },
                    bodyStyle: 'backgroud-color: #FED'
                }
            ],
            bbar: [
                'Bottom Bar', '-', {
                    text: 'Agregar un nuevo contenido',
                    scale: 'large',
                    handler: function () {
                        var num = Ext.id();
                        var panel = Ext.create('Ext.Panel', {
                            title: 'Detalle cliente' + num,
                            html: 'info cliente' + num,
                            closable: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    title: 'Detalle del cliente' + num,
                                    xtype: 'panel',
                                    layout: 'card',
                                    flex: 3,
                                    items: [
                                        {
                                            html: 'Detalle1'
                                        }, {
                                            html: 'Detalle2'
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: 'panel1',
                                            scale: 'large',
                                            handler: function () {
                                                this.up('panel').layout.setActiveItem(0);
                                            }
                                        },
                                        {
                                            text: 'panel2',
                                            scale: 'large',
                                            handler: function () {
                                                this.up('panel').layout.setActiveItem(1);
                                            }
                                        }
                                    ]
                                }, {
                                    text: 'Al seleccionar panel 2',
                                    flex: 1
                                }
                            ]
                        });
                        this.up('tabpanel').add(panel);
                        this.up('tabpanel').setActiveItem(panel);
                    }
                }
            ]
        }, {
            region: 'south',
            height: 100,
            tpl: [
                '{nombre}'
            ],
            reference: 'paneldetalle',
            bodyStyle: 'background-color: #fff',
            bodyPadding: 10
        }
    ],
    seleccionar: function () {
        var rec = this.lookupReference('gridlistado').getSelectionModel().getSelection();
        this.fireEvent('selectcliente', this, rec[0]);
    }
});