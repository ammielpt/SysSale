Ext.define('app.store.productos.StoreDocuments', {
    extend: 'Ext.data.Store',
    model: 'app.model.productos.DocumentModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/producto/listarDocumentosProducto',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});