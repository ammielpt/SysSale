Ext.define('app.store.Personnel', {
    extend: 'Ext.data.Store',
    model: 'app.model.Personnel',
    proxy: {
        type: 'ajax',
        url: 'http://localhost/SysSale/consulta/listarAlumnos',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'numFilas'
        }
    }
});
