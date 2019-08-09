Ext.define('app.store.clientes.StoreDocuments', {
    extend: 'Ext.data.Store',
    model: 'app.model.clientes.DocumentModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/cliente/listarDocumentosCliente',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});