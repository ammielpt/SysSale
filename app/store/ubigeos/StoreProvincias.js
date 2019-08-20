Ext.define('app.store.ubigeos.StoreProvincias', {
    extend: 'Ext.data.Store',
    model: 'app.model.ubigeos.ProvinciaModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/cliente/listarProvincia',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});