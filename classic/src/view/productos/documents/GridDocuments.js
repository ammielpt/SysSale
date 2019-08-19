Ext.define('app.view.productos.documents.GridDocuments', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'griddocproducto',
    autoScroll: true,
    maxHeight: 300,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No hay documentos para mostrar.'
    },
    initComponent: function() {
        var me = this,
            documentStore = Ext.create('app.store.productos.StoreDocuments');
        if (me.rcdProducto)
            documentStore.load({ params: { idProducto: me.rcdProducto.get('idProducto') } });
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
                    iconCls: 'fa fa-file',
                    items: [Ext.create('app.view.productos.documents.FormDocument', { store: documentStore, idProducto: me.rcdProducto.get('idProducto') })]
                });
                win.show();
            }
        }];
        this.callParent(arguments);
    }
});