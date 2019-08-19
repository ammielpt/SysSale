Ext.define('app.view.clientes.documents.GridDocuments', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'griddoccliente',
    controller: 'docclientecontroller',
    autoScroll: true,
    maxHeight: 300,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No hay documentos para mostrar.'
    },
    initComponent: function() {
        var me = this,
            documentStore = Ext.create('app.store.clientes.StoreDocuments');
        if (me.rcdCliente)
            documentStore.load({ params: { idCliente: me.rcdCliente.get('idCliente') } });
        Ext.apply(this, {
            store: documentStore,
            columns: [
                { text: 'Archivo', dataIndex: 'nombre', width: 400, flex: 1 },
                { text: 'Tamaño', align: 'center', dataIndex: 'size', width: 50, flex: 1 },
                { text: 'Descripcion', dataIndex: 'descripcion', width: 200, flex: 1 },
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{
                        icon: 'resources/icon/download.png',
                        tooltip: 'Descargar',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var win = window.open('', '_blank');
                            win.location = Sales.Config.HOME_URL + '/' + rec.get('url');
                            win.focus();
                        }
                    }]
                }
            ]
        });
        this.tbar = [{
            text: 'Agregar',
            iconCls: 'fa fa-file',
            handler: function() {
                var win = Ext.create('Ext.Window', {
                    y: 50,
                    modal: true,
                    title: 'Seleccionar Archivo',
                    items: [Ext.create('app.view.clientes.documents.FormDocument', { store: documentStore, idCliente: me.rcdCliente.get('idCliente') })]
                });
                win.show();
            }
        }];
        this.callParent(arguments);
    }
});