Ext.define('app.store.telefonos.StoreTelefonos', {
    extend: 'Ext.data.Store',
    model: 'app.model.telefonos.TelefonoModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/telefono/listarTelefonos',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});