Ext.define('app.view.clientes.form.ComboClientes', {
    extend: 'Ext.form.ComboBox',
    xtype: 'comboclientes',
//    queryModal: 'local', remte by default
    displayField: 'nombre',
    valueField: 'cliente_k',
    pageSize: 25,
    hideTrigger: true,
    initComponent: function () {
        Ext.apply(this, {
            store: Ext.create('app.store.clientes.StoreClientes', {
                tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for=".">',
                        '<li class="x-boundlist-item">{cliente_k}-{nombre}{apellido_paterno}</li>',
                        '</tpl></ul>'
                        ),
                displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                        '{nombre}{apellido_paterno}',
                        '</tpl>'
                        )
            })
        });
        this.callParent(arguments);
    }
});