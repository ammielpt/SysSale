Ext.define('app.view.clientes.correos.FormCorreo', {
    extend: 'Ext.form.Panel',
    xtype: 'formcorreo',
    bodyPadding: 10,
    initComponent: function () {
        var me = this;
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
                    name: 'idCorreo',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    labelAlign: 'top',
                    name: 'correo',
                    vtype: 'email'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Principal?',
                    labelAlign: 'left',
                    labelWidth: 80,
                    name: 'principal'
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
        if (values.principal == 'on')
            values.principal = 1;
        rcd = Ext.create('app.model.correos.CorreoModel', values);
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/correo/crearCorreo',
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
        if (values.principal == 'on')
            values.principal = 1;
        else {
            values.principal = 0;
        }
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/correo/actualizarCorreo',
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