Ext.define('app.view.productos.documents.FormDocument', {
    extend: 'Ext.form.Panel',
    width: 400,
    bodyPadding: 10,
    initComponent: function() {
        var me = this;
        me.items = [{
                xtype: 'filefield',
                name: 'file',
                fieldLabel: 'Archivo',
                labelWidth: 50,
                allowBlank: false,
                labelAlign: 'top',
                anchor: '100%',
                buttonText: 'Seleccionar...'
            },
            {
                xtype: 'textareafield',
                grow: true,
                labelAlign: 'top',
                name: 'descripcion',
                fieldLabel: 'Descripcion',
                anchor: '100%'
            }
        ];
        me.buttons = [{
            text: 'Subir',
            scope: me,
            handler: function() {
                var form = me.getForm();
                if (form.isValid()) {
                    form.submit({
                        url: Sales.Config.HOME_URL + '/producto/uploadFileProducto',
                        headers: { 'Content-type': 'multipart/form-data; charset=UTF-8' },
                        waitMsg: 'Tu archivo se esta subiendo...',
                        params: { idProducto: me.idProducto },
                        success: function(form, action) {
                            var data = action.result,
                                fileRecord = Ext.create('app.model.productos.DocumentModel');
                            if (data.success) {
                                Ext.Msg.alert('Mensaje', data.mensaje);
                                fileRecord.set(data.data);
                                me.store.add(fileRecord);
                                fileRecord.commit();
                                me.up('window').close();
                            }
                        },
                        failure: function(form, action) {
                            var data = action.result;
                            Ext.Msg.alert('Mensaje', data.mensaje);
                            form.reset();
                        }
                    });
                }
            }
        }];
        me.callParent(arguments);
    }
});