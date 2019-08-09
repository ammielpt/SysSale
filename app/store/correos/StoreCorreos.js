Ext.define('app.store.correos.StoreCorreos', {
    extend: 'Ext.data.Store',
    model: 'app.model.correos.CorreoModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/correo/listarCorreos',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});