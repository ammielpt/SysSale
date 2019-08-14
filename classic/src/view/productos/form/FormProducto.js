Ext.define('app.view.productos.form.FormProducto', {
    extend: 'Ext.form.Panel',
    xtype: 'formproducto',
    bodyPadding: 10,
    initComponent: function () {
        var me = this,
        categoriaStore= Ext.create('app.store.productos.StoreCategorias'),
        nominacionStore= Ext.create('app.store.productos.StoreNominaciones');
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
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    labelAlign: 'top',
                    name: 'idProducto',
                    hidden: true,
                    allowBlank: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Descripción',
                    labelAlign: 'top',
                    name: 'nombre'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Precio',
                            name: 'precio',
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Categoría',
                            name: 'idCategoria',
                            store: categoriaStore,
                            displayField: 'nombreCategoria',
                            valueField: 'idCategoria',
                            editable: false,
                            allowBlank: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Stock',
                            name: 'stock',
                            margin: '0 10 0 0'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Nominación',
                            name: 'idNominacion',
                            store: nominacionStore,
                            displayField: 'nombreNominacion',
                            valueField: 'idNominacion',
                            editable: false,
                            allowBlank: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Peso',
                            name: 'peso',
                            margin: '0 10 0 0',
                            allowBlank: true
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha Alta',
                            name: 'fechaAlta',
                            allowBlank: true,
                            value: new Date(),
                            format: 'd/m/Y',
                            submitFormat: 'Y-m-d H:i:s'
                        }
                    ]
                }
            ]
        });
        this.callParent();
        if (me.record)
            me.loadRecord(me.record);
    },
    doSubmit: function (values, win, store) {
        var rcd, me = this;
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/producto/crearProducto',
            params: values,
            method: 'POST',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                Ext.Msg.alert('Mensaje', obj.mensaje);
                rcd = Ext.create('app.model.productos.ProductoModel', obj.data);
                store.add(rcd);
                me.loadRecord(rcd);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    doUpdate: function (values, win, store) {
        var me = this;
        Ext.Ajax.request({
            url: Sales.Config.HOME_URL + '/producto/actualizarProducto',
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