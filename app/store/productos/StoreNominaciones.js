Ext.define('app.store.productos.StoreNominaciones', {
    extend: 'Ext.data.Store',
    model: 'app.model.productos.NominacionModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/producto/listarNominaciones',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});