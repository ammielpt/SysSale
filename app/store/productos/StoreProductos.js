Ext.define('app.store.productos.StoreProductos', {
    extend: 'Ext.data.Store',
    model: 'app.model.productos.ProductoModel',
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