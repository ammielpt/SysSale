Ext.define('app.store.ubigeos.StoreDistritos', {
    extend: 'Ext.data.Store',
    model: 'app.model.ubigeos.DistritoModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/cliente/listarDistrito',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});