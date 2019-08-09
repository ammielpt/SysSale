Ext.define('app.store.operadores.StoreOperadores', {
    extend: 'Ext.data.Store',
    model: 'app.model.operadores.OperadorModel',
    proxy: {
        type: 'ajax',
        url: Sales.Config.HOME_URL + '/telefono/listarOperadores',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});