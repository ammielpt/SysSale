Ext.define('app.view.clientes.form.FormCliente', {
    extend: 'Ext.form.Panel',
    xtype: 'formcliente',
    bodyPadding: 10,
    initComponent: function() {
        var me = this;
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 110,
                msgTarget: 'under',
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
                    xtype: 'fieldset',
                    title: 'Telefonos',
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