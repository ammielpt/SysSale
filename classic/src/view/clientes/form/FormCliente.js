Ext.define('app.view.clientes.form.FormCliente', {
    extend: 'Ext.form.Panel',
    xtype: 'formcliente',
    bodyPadding: 10,
    initComponent: function() {
        var me = this,
            departamentoStore = Ext.create('app.store.ubigeos.StoreDepartamentos', { autoLoad: true }),
            provinciaStore = Ext.create('app.store.ubigeos.StoreProvincias'),
            distritoStore = Ext.create('app.store.ubigeos.StoreDistritos');
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 110,
                anchor: '100%',
                allowBlank: false
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    labelAlign: 'top',
                    name: 'idCliente',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Ruc',
                            name: 'ruc',
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha Nacimiento',
                            name: 'fechaNacimiento',
                            maxValue: new Date(),
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d H:i:s'
                        }
                    ]
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Razon Social',
                    labelAlign: 'top',
                    name: 'razonSocial'
                },
                {
                    xtype: 'textfield',
                    labelAlign: 'top',
                    fieldLabel: 'Direccion',
                    name: 'direccion'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        width: 215
                    },
                    items: [{
                            xtype: 'combobox',
                            fieldLabel: 'Departamento',
                            name: 'idDepartamento',
                            store: departamentoStore,
                            displayField: 'departamento',
                            valueField: 'idDepartamento',
                            editable: false,
                            allowBlank: true,
                            queryMode: 'local',
                            listeners: {
                                scope: me,
                                select: function(cbo) {
                                    var provincias = me.down('#cboprovincia'),
                                        distritos = me.down('#cbodistrito');
                                    provincias.reset();
                                    distritos.reset();
                                    provincias.store.removeAll();
                                    distritos.store.removeAll();
                                    Ext.Ajax.request({
                                        url: Sales.Config.HOME_URL + '/cliente/listarProvincia',
                                        method: 'GET',
                                        params: { idDepartamento: cbo.getValue() },
                                        success: function(response, opts) {
                                            var obj = Ext.decode(response.responseText);
                                            provincias.store.loadData(obj.data);
                                            var rcd = provincias.store.getById(parseInt(provincias.getValue()));
                                            provincias.setValue(rcd.get('idProvincia'));
                                        },
                                        failure: function(response, opts) {
                                            console.log('server-side failure with status code ' + response.status);
                                        }
                                    });
                                },
                                afterrender: function(cmp) {
                                    var provincias = this.down("#cboprovincia");
                                    Ext.Ajax.request({
                                        url: Sales.Config.HOME_URL + '/cliente/listarProvincia',
                                        method: 'GET',
                                        params: { idDepartamento: cmp.getValue() },
                                        success: function(response, opts) {
                                            var obj = Ext.decode(response.responseText);
                                            provincias.store.loadData(obj.data);
                                            provincias.store.each(function(record) {
                                                if (record.get('idProvincia') == provincias.getValue())
                                                    provincias.setValue(record.get('idProvincia'));
                                            });
                                        },
                                        failure: function(response, opts) {
                                            console.log('server-side failure with status code ' + response.status);
                                        }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Provincia',
                            name: 'idProvincia',
                            store: provinciaStore,
                            itemId: 'cboprovincia',
                            displayField: 'provincia',
                            valueField: 'idProvincia',
                            margin: '0 0 0 15',
                            editable: false,
                            allowBlank: true,
                            queryMode: 'local',
                            listeners: {
                                scope: me,
                                select: function(cbo) {
                                    var distritos = me.down('#cbodistrito');
                                    distritos.reset();
                                    distritos.store.removeAll();
                                    Ext.Ajax.request({
                                        url: Sales.Config.HOME_URL + '/cliente/listarDistrito',
                                        method: 'GET',
                                        params: { idProvincia: cbo.getValue() },
                                        success: function(response, opts) {
                                            var obj = Ext.decode(response.responseText);
                                            distritos.store.loadData(obj.data);
                                            var rcd = distritos.store.getById(parseInt(distritos.getValue()));
                                            distritos.setValue(rcd.get('idDistrito'));
                                        },
                                        failure: function(response, opts) {
                                            console.log('server-side failure with status code ' + response.status);
                                        }
                                    });
                                },
                                afterrender: function(cmp) {
                                    var distritos = this.down("#cbodistrito");
                                    Ext.Ajax.request({
                                        url: Sales.Config.HOME_URL + '/cliente/listarDistrito',
                                        method: 'GET',
                                        params: { idProvincia: cmp.getValue() },
                                        success: function(response, opts) {
                                            var obj = Ext.decode(response.responseText);
                                            distritos.store.loadData(obj.data);
                                            distritos.store.each(function(record) {
                                                if (record.get('idDistrito') == distritos.getValue())
                                                    distritos.setValue(record.get('idDistrito'));
                                            });
                                        },
                                        failure: function(response, opts) {
                                            console.log('server-side failure with status code ' + response.status);
                                        }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Distrito',
                            name: 'idDistrito',
                            store: distritoStore,
                            itemId: 'cbodistrito',
                            displayField: 'distrito',
                            valueField: 'idDistrito',
                            margin: '0 0 0 15',
                            editable: false,
                            allowBlank: true,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Telefonos',
                    height: 200,
                    instructions: 'Contactos de clientes',
                    items: [{
                        xtype: 'gridtelefonos',
                        rcdCliente: me.record
                    }]
                }
            ]
        });
        this.callParent();
        if (me.record)
            me.loadRecord(me.record);
    },
    doSubmit: function(values, win, store) {
        var rcd, me = this;
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/cliente/crearCliente',
            params: values,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.alert('Mensaje', obj.mensaje);
                rcd = Ext.create('app.model.clientes.ClienteModel', obj.data);
                store.add(rcd);
                me.loadRecord(rcd);
                me.down('gridtelefonos').rcdCliente = rcd;
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    doUpdate: function(values, win, store) {
        var me = this;
        values.fechaNacimiento = new Date(values.fechaNacimiento);
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/cliente/actualizarCliente',
            params: values,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    Ext.Msg.alert('Mensaje', obj.mensaje);
                    win.close();
                    me.record.set(values);
                    me.record.commit();
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});