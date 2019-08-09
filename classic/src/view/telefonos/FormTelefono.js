Ext.define('app.view.telefonos.FormTelefono', {
    extend: 'Ext.form.Panel',
    xtype: 'formtelefono',
    bodyPadding: 10,
    initComponent: function () {
        var me = this,
                cboOperadores = Ext.create('app.store.operadores.StoreOperadores', {autoLoad: true});
        Ext.apply(this, {
            fieldDefaults: {
                labelWidth: 110,
                msgTarget: 'under',
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    labelAlign: 'top',
                    name: 'idTelefono',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Telefono',
                    labelAlign: 'top',
                    name: 'numeroTelefono'
                },
                {
                    xtype: 'combobox',
                    labelAlign: 'top',
                    fieldLabel: 'Operador',
                    store: cboOperadores,
                    displayField: 'nombreOperador',
                    valueField: 'idOperador',
                    name: 'idOperador',
                    editable: false,
                    listeners: {
                        scope: me,
                        afterrender: function (cbo) {
                            cboOperadores.on('load', function () {
                                cboOperadores.each(function (rcd) {
                                    if (cbo.getValue() == rcd.get('idOperador')) {
                                        cbo.setRawValue(rcd.get('nombreOperador'));
                                    }
                                });
                            });
                        },
                        select: function (cbo, rcd) {
                            me.nombreOperador = rcd.get('nombreOperador');
                        }
                    }
                }
            ]
        });
        this.callParent();
        if (me.record)
            me.loadRecord(me.record);
    },
    doSubmit: function (values, win, store) {
        var rcd, me = this;
        values.idCliente = me.idCliente;
        if (me.nombreOperador)
            values.nombreOperador = me.nombreOperador;
        rcd = Ext.create('app.model.telefonos.TelefonoModel', values);
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/telefono/crearTelefono',
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
        values.idCliente = me.idCliente;
        if (me.nombreOperador)
            values.nombreOperador = me.nombreOperador;
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/telefono/actualizarTelefono',
            params: values,
            method: 'POST',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    Ext.Msg.alert('Mensaje', obj.mensaje);
                    win.close();
                    me.record.set(values);
                    me.record.commit();
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});