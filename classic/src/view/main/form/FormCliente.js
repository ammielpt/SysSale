Ext.define('app.view.main.form.FormCliente', {
    extend: 'Ext.form.Panel',
    xtype: 'formclienteperson',
    bodyPadding: 10,
    autoScroll: true,
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 110,
                msgTarget: 'under',
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        flex: 1,
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Ruc',
                            name: 'ruc',
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha Nacimiento',
                            name: 'fechaNacimiento',
                            maxValue: new Date()
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
                }
            ]
        });
        this.callParent();
        if (me.record)
            me.loadRecord(me.record);
    },
    doSubmit: function (values, win, store) {
        var me = this, rcd;
        rcd = Ext.create('app.model.clientes.ClienteModel', values);
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/cliente/crearCliente',
            params: values,
            method: 'POST',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.alert('Mensaje', obj.mensaje);
                win.close();
                store.add(rcd);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    doUpdate: function (values, win, store) {
        var me = this;
        Ext.Ajax.request({
            url: 'http://localhost/SysSale/consulta/actualizarAlumno',
            params: values,
            method: 'POST',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.alert('Mensaje', obj.mensaje);
                win.close();
                me.record.set(values);
                me.record.commit();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});