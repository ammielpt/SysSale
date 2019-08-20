Ext.define('app.store.ubigeos.StoreDepartamentos', {
    extend: 'Ext.data.Store',
    model: 'app.model.ubigeos.DepartamentoModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/cliente/listarDepartamentos',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});