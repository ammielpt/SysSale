Ext.define('app.store.productos.StoreCategorias', {
    extend: 'Ext.data.Store',
    model: 'app.model.productos.CategoriaModel',
    proxy: {
        type: 'ajax',
        method: 'GET',
        url: Sales.Config.HOME_URL + '/producto/listarCategorias',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});