Ext.define('app.store.clientes.StoreClientes', {
    extend: 'Ext.data.Store',
    model: 'app.model.clientes.ClienteModel',
    pageSize: 14,
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/cliente/listarClientes',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});