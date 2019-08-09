Ext.define('app.view.clientes.PanelClientesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelclientesctrl',
    
    showClienteDetalle: function (grid, record) {
        var panel=this.lookupReference('paneldetalle');
        panel.update(record.data);
    },
    agregarCliente: function () {
        var window = Ext.create('Ext.Window', {
            modal: true,
            title: "Agregar nuevo cliente",
            height: 300,
            width: 400,
            items: [
                {xtype: 'formcliente'}
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: function () {
                        var form = this.up('window').down('formcliente');
                        if (form.isValid())
                            form.doSubmit();
                    }
                },
                {
                    text: 'Load',
                    handler: function () {
                        var form = this.up('window').down('formcliente');
                        form.doLoad();
                    }
                },
                {
                    text: 'Cerrar',
                    handler: function () {
                        window.close();
                    }
                }
            ]
        });
        window.show();
    }
});